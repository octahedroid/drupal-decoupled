import {
  autoFixSpec,
  createSpecStreamCompiler,
  type Spec,
} from "@json-render/core";

import { catalog } from "~/integration/resolvers/catalog";
import { DEFAULT_GOOGLE_DOC_TEMPLATE_SPEC } from "~/prototyping/googleDocs.server";
import { isGoogleDocSourcePath } from "~/prototyping/sourcePath.server";
import type { PrototypeRecord, PrototypeStore } from "~/prototyping/store";

export const DEFAULT_PROTOTYPING_MODEL = "claude-sonnet-4-6";

interface ResolvePrototypeBaseSpecInput {
  prototype: PrototypeRecord;
  loadPageSpec?: (path: string) => Promise<Spec | null>;
}

interface PersistValidatedPrototypeVersionInput {
  prototypeId: string;
  message: string;
  spec: unknown;
  store: PrototypeStore;
  validateSpec?: typeof catalog.validate;
}

export function extractGenerationMessage(body: unknown): string {
  const payload = isObject(body) ? body : {};
  const candidate =
    typeof payload.prompt === "string"
      ? payload.prompt
      : typeof payload.message === "string"
        ? payload.message
        : undefined;

  const message = candidate?.trim();

  if (!message) {
    throw new Response("A non-empty prompt is required", { status: 400 });
  }

  return message;
}

export function getPrototypeHistoryMessages(
  prototype: PrototypeRecord,
): string[] {
  return prototype.versions.map((version) => version.message);
}

export async function resolvePrototypeBaseSpec({
  prototype,
  loadPageSpec,
}: ResolvePrototypeBaseSpecInput): Promise<Spec> {
  const latestSpec = prototype.versions.at(-1)?.spec;

  if (latestSpec) {
    return latestSpec;
  }

  // A Google Doc has no Drupal page of its own; its content maps onto the
  // design system's default page composition instead.
  if (isGoogleDocSourcePath(prototype.sourcePath)) {
    return structuredClone(DEFAULT_GOOGLE_DOC_TEMPLATE_SPEC);
  }

  const resolvePageSpec =
    loadPageSpec ??
    (await import("~/prototyping/getPageSpec.server")).getPageSpec;

  const sourceSpec = await resolvePageSpec(prototype.sourcePath);

  if (!sourceSpec) {
    throw new Response("Prototype source page could not be resolved", {
      status: 404,
    });
  }

  return sourceSpec;
}

export function compileSpecFromStreamText(
  text: string,
  baseSpec?: Spec,
): Spec | null {
  try {
    // The compiler mutates its seed while applying patches, so clone the
    // base spec to keep the caller's copy (store record / page spec) intact.
    const compiler = createSpecStreamCompiler<Spec>(
      baseSpec ? structuredClone(baseSpec) : undefined,
    );

    compiler.push(text);

    const result = compiler.getResult();

    return isCompiledSpec(result) ? result : null;
  } catch (error) {
    console.error("Failed to compile streamed prototype spec", error);
    return null;
  }
}

export async function persistValidatedPrototypeVersion({
  prototypeId,
  message,
  spec,
  store,
  validateSpec = catalog.validate.bind(catalog),
}: PersistValidatedPrototypeVersionInput): Promise<boolean> {
  const normalizedSpec = normalizePrototypeSpec(spec);
  const validation = validateSpec(normalizedSpec);

  if (!validation.success || !validation.data) {
    console.error(
      "Generated prototype spec failed validation",
      validation.error,
    );
    return false;
  }

  await store.appendVersion(prototypeId, {
    spec: validation.data as Spec,
    message,
  });

  return true;
}

export function normalizePrototypeSpec(spec: unknown): unknown {
  if (!isCompiledSpec(spec)) {
    return spec;
  }

  const sanitizedSpec = sanitizeUndefined(spec);
  const normalizedElements = ensureElementDefaults(sanitizedSpec) as Spec;
  const { spec: autoFixedSpec } = autoFixSpec(normalizedElements);

  return sanitizeUndefined(ensureElementDefaults(autoFixedSpec));
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCompiledSpec(value: unknown): value is Spec {
  return (
    isObject(value) &&
    typeof value.root === "string" &&
    isObject(value.elements)
  );
}

function sanitizeUndefined(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeUndefined(item));
  }

  if (!isObject(value)) {
    return value;
  }

  const sanitizedEntries = Object.entries(value)
    .filter(([, nestedValue]) => nestedValue !== undefined)
    .map(([key, nestedValue]) => [key, sanitizeUndefined(nestedValue)]);

  return Object.fromEntries(sanitizedEntries);
}

// The catalog schema declares `children` and `visible` as required element
// fields (`visible` as a permissive `any`), and zod rejects an absent key even
// for `any`. Neither Drupal-sourced specs nor model output reliably include
// them, so fill both in before validating.
function ensureElementDefaults(value: unknown): unknown {
  if (!isObject(value)) {
    return value;
  }

  const nextValue = { ...value } as Record<string, unknown>;

  if (isObject(nextValue.elements)) {
    nextValue.elements = Object.fromEntries(
      Object.entries(nextValue.elements).map(([key, elementValue]) => {
        if (!isObject(elementValue)) {
          return [key, elementValue];
        }

        const nextElement = {
          ...elementValue,
          children: Array.isArray(elementValue.children) ? elementValue.children : [],
          // `true` is the renderer's "always visible" condition, so this is a
          // no-op for elements that never declared visibility.
          visible: elementValue.visible ?? true,
        };

        return [key, nextElement];
      }),
    );
  }

  return nextValue;
}
