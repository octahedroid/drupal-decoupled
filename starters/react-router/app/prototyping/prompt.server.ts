import { buildUserPrompt, type EditMode, type Spec } from "@json-render/core";

import { catalog } from "~/integration/resolvers/catalog";

export const PROTOTYPE_EDIT_MODES: EditMode[] = ["patch"];

export const DEFAULT_PROTOTYPING_PLACEHOLDERS = [
  "https://placehold.co/1200x600/png?text=Prototype+Hero",
  "https://placehold.co/800x450/png?text=Prototype+Section",
  "https://placehold.co/600x600/png?text=Prototype+Image",
  "https://placehold.co/1200x675/png?text=Marketing+Visual",
  "https://placehold.co/640x360/png?text=Feature+Preview",
  "https://placehold.co/400x400/png?text=Product+Shot",
];

export const DEFAULT_PROTOTYPING_RULES = [
  "Edit the current spec with JSON Patch operations. Emit only the minimal patches needed for the requested change; never re-emit elements that stay the same.",
  "Preserve all existing text and image content exactly unless the user explicitly asks to change it.",
  "Never invent component types. Only use component types defined in the catalog.",
  "When an existing catalog block fits the request, prefer that block before composing new layouts from primitives.",
  "When you need a new section, compose it from the available Section, Grid, Stack, Heading, Text, Button, Image, and existing catalog components.",
  "Reuse image URLs that already exist in the base spec when creating new sections whenever possible.",
  "If you need an image and no suitable existing image URL is available, use one of the provided placeholder paths.",
  "Keep the output faithful to the existing design system and marketing-page structure.",
];

interface BuildPrototypeSystemPromptInput {
  baseSpec: Spec;
  historyMessages?: string[];
  customRules?: string[];
  catalogPrompt?: string;
  placeholderImagePaths?: string[];
}

export function collectImageSourcesFromSpec(spec: Spec): string[] {
  const foundSources = new Set<string>();

  for (const element of Object.values(spec.elements)) {
    collectImageSourcesFromValue(element?.props, foundSources);
  }

  return Array.from(foundSources);
}

export function buildPrototypeSystemPrompt({
  baseSpec,
  historyMessages = [],
  customRules = [],
  catalogPrompt,
  placeholderImagePaths = DEFAULT_PROTOTYPING_PLACEHOLDERS,
}: BuildPrototypeSystemPromptInput): string {
  const rules = [...DEFAULT_PROTOTYPING_RULES, ...customRules];
  const systemPrompt =
    catalogPrompt ??
    catalog.prompt({
      mode: "standalone",
      editModes: PROTOTYPE_EDIT_MODES,
      customRules: rules,
    });

  const imageSources = collectImageSourcesFromSpec(baseSpec);

  return [
    systemPrompt,
    "",
    "Additional prototyping rules:",
    ...rules.map((rule, index) => `${index + 1}. ${rule}`),
    "",
    "Reusable image URLs already present in the base spec:",
    ...(imageSources.length > 0
      ? imageSources.map((source) => `- ${source}`)
      : ["- None found in the base spec"]),
    "",
    "Allowed placeholder image paths:",
    ...placeholderImagePaths.map((path) => `- ${path}`),
    "",
    "Prior producer messages in chronological order:",
    ...(historyMessages.length > 0
      ? historyMessages.map((message, index) => `${index + 1}. ${message}`)
      : ["- No prior messages"]),
  ].join("\n");
}

export function buildPrototypeUserPrompt({
  message,
  baseSpec,
}: {
  message: string;
  baseSpec: Spec;
}): string {
  return buildUserPrompt({
    prompt: message,
    currentSpec: baseSpec,
    editModes: PROTOTYPE_EDIT_MODES,
  });
}

function collectImageSourcesFromValue(value: unknown, sources: Set<string>): void {
  if (typeof value === "string") {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectImageSourcesFromValue(item, sources);
    }

    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  if ("src" in value && typeof value.src === "string") {
    sources.add(value.src);
  }

  for (const nestedValue of Object.values(value)) {
    collectImageSourcesFromValue(nestedValue, sources);
  }
}
