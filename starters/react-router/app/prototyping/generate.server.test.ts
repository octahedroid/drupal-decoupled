import type { Spec } from "@json-render/core";
import { describe, expect, it, vi } from "vitest";

import {
  compileSpecFromStreamText,
  extractGenerationMessage,
  getPrototypeHistoryMessages,
  normalizePrototypeSpec,
  persistValidatedPrototypeVersion,
  resolvePrototypeBaseSpec,
} from "~/prototyping/generate.server";
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

  it("normalizes missing children arrays and strips undefined visible values", () => {
    const normalized = normalizePrototypeSpec({
      root: "NodePage",
      elements: {
        NodePage: {
          type: "NodePage",
          props: {},
          children: ["hero"],
          visible: undefined,
        },
        hero: {
          type: "Heading",
          props: {
            text: "Hello",
            tone: undefined,
          },
        },
      },
    }) as Spec;

    expect(normalized.elements.NodePage).toEqual({
      type: "NodePage",
      props: {},
      children: ["hero"],
    });
    expect(normalized.elements.hero).toEqual({
      type: "Heading",
      props: {
        text: "Hello",
      },
      children: [],
    });
  });

  it("returns null when the streamed text cannot be compiled into a spec", () => {
    expect(compileSpecFromStreamText("not-jsonl-at-all")).toBeNull();
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
