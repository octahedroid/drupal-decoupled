import type { Spec } from "@json-render/core";
import { describe, expect, it, vi } from "vitest";

import { catalog } from "~/integration/resolvers/catalog";
import {
  compileSpecFromStreamText,
  extractGenerationMessage,
  getPrototypeHistoryMessages,
  normalizePrototypeSpec,
  persistValidatedPrototypeVersion,
  resolvePrototypeBaseSpec,
} from "~/prototyping/generate.server";
import { DEFAULT_GOOGLE_DOC_TEMPLATE_SPEC } from "~/prototyping/googleDocs.server";
import type { PrototypeRecord, PrototypeStore } from "~/prototyping/store";

const BASE_SPEC = {
  root: "root",
  elements: {
    root: {
      type: "NodePage",
      props: {},
      children: [],
    },
  },
} satisfies Spec;

describe("extractGenerationMessage", () => {
  it("prefers the compatible prompt field but also supports message", () => {
    expect(extractGenerationMessage({ prompt: "  Add pricing  " })).toBe(
      "Add pricing",
    );
    expect(extractGenerationMessage({ message: "Move CTA" })).toBe("Move CTA");
  });

  it("rejects empty prompts", () => {
    expect(() => extractGenerationMessage({ prompt: "   " })).toThrow(Response);
  });
});

describe("resolvePrototypeBaseSpec", () => {
  it("uses the latest saved version when one exists", async () => {
    const prototype = createPrototypeRecord({
      versions: [{ spec: BASE_SPEC, message: "First", timestamp: "2026-07-02T00:00:00.000Z" }],
    });

    const loadPageSpec = vi.fn(async () => null);

    await expect(
      resolvePrototypeBaseSpec({ prototype, loadPageSpec }),
    ).resolves.toEqual(BASE_SPEC);
    expect(loadPageSpec).not.toHaveBeenCalled();
  });

  it("falls back to the source page spec for the first generation", async () => {
    const prototype = createPrototypeRecord({ versions: [] });
    const loadPageSpec = vi.fn(async () => BASE_SPEC);

    await expect(
      resolvePrototypeBaseSpec({ prototype, loadPageSpec }),
    ).resolves.toEqual(BASE_SPEC);
    expect(loadPageSpec).toHaveBeenCalledWith("/about");
  });

  it("resolves a google-doc-sourced prototype against the default template spec", async () => {
    const prototype = createPrototypeRecord({
      sourcePath: "gdoc:abc123",
      versions: [],
    });

    const loadPageSpec = vi.fn(async () => BASE_SPEC);

    await expect(
      resolvePrototypeBaseSpec({ prototype, loadPageSpec }),
    ).resolves.toEqual(DEFAULT_GOOGLE_DOC_TEMPLATE_SPEC);
    expect(loadPageSpec).not.toHaveBeenCalled();
  });
});

describe("prototype generation helpers", () => {
  it("returns prior messages in chronological order", () => {
    const prototype = createPrototypeRecord({
      versions: [
        { spec: BASE_SPEC, message: "First", timestamp: "2026-07-02T00:00:00.000Z" },
        { spec: BASE_SPEC, message: "Second", timestamp: "2026-07-02T00:01:00.000Z" },
      ],
    });

    expect(getPrototypeHistoryMessages(prototype)).toEqual(["First", "Second"]);
  });

  it("does not append when the validated final spec is invalid", async () => {
    const store = createStoreStub();

    const persisted = await persistValidatedPrototypeVersion({
      prototypeId: "proto-1",
      message: "Add pricing",
      spec: { nope: true },
      store,
      validateSpec: () => ({ success: false, error: new Error("invalid") } as never),
    });

    expect(persisted).toBe(false);
    expect(store.appendVersion).not.toHaveBeenCalled();
  });

  it("normalizes missing children arrays and undefined visible values", () => {
    const normalized = normalizePrototypeSpec({
      root: "NodePage",
      elements: {
        NodePage: {
          type: "NodePage",
          props: {},
          children: ["hero", "footnote"],
          visible: undefined,
        },
        hero: {
          type: "Heading",
          props: {
            text: "Hello",
            tone: undefined,
          },
        },
        footnote: {
          type: "Text",
          props: { text: "Hidden" },
          children: [],
          visible: false,
        },
      },
    }) as Spec;

    expect(normalized.elements.NodePage).toEqual({
      type: "NodePage",
      props: {},
      children: ["hero", "footnote"],
      visible: true,
    });
    expect(normalized.elements.hero).toEqual({
      type: "Heading",
      props: {
        text: "Hello",
      },
      children: [],
      visible: true,
    });
    // An explicit `false` must survive normalization.
    expect(normalized.elements.footnote.visible).toBe(false);
  });

  it("produces a spec the catalog accepts when elements omit visible", () => {
    const normalized = normalizePrototypeSpec({
      root: "root",
      elements: {
        root: { type: "NodePage", props: {}, children: ["hero"] },
        hero: {
          type: "ParagraphHero",
          props: { heading: "Hello", description: "World" },
        },
      },
    });

    expect(catalog.validate(normalized).success).toBe(true);
  });

  it("returns null when the streamed text cannot be compiled into a spec", () => {
    expect(compileSpecFromStreamText("not-jsonl-at-all")).toBeNull();
  });

  it("applies streamed edit patches on top of the base spec without mutating it", () => {
    const baseSpec = {
      root: "root",
      elements: {
        root: {
          type: "NodePage",
          props: {},
          children: ["hero"],
        },
        hero: {
          type: "ParagraphHero",
          props: { heading: "Hello", description: "World" },
          children: [],
        },
      },
    } satisfies Spec;

    const streamedPatches = [
      JSON.stringify({
        op: "replace",
        path: "/elements/hero/props/heading",
        value: "Hi there",
      }),
      JSON.stringify({
        op: "add",
        path: "/elements/pricing",
        value: { type: "Section", props: {}, children: [] },
      }),
      JSON.stringify({
        op: "replace",
        path: "/elements/root/children",
        value: ["hero", "pricing"],
      }),
    ].join("\n");

    const compiled = compileSpecFromStreamText(streamedPatches, baseSpec);

    expect(compiled?.elements.hero.props.heading).toBe("Hi there");
    expect(compiled?.elements.pricing).toBeDefined();
    expect(compiled?.elements.root.children).toEqual(["hero", "pricing"]);
    // The caller's base spec (store record / page spec) must stay intact.
    expect(baseSpec.elements.hero.props.heading).toBe("Hello");
    expect(baseSpec.elements.root.children).toEqual(["hero"]);
  });
});

function createPrototypeRecord(
  overrides: Partial<PrototypeRecord>,
): PrototypeRecord {
  return {
    id: "11111111-1111-4111-8111-111111111111",
    sourcePath: "/about",
    createdAt: "2026-07-02T00:00:00.000Z",
    versions: [],
    ...overrides,
  };
}

function createStoreStub(): PrototypeStore {
  return {
    create: vi.fn(),
    get: vi.fn(),
    list: vi.fn(),
    appendVersion: vi.fn(),
  };
}
