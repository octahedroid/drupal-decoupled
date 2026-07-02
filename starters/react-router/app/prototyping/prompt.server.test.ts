import type { Spec } from "@json-render/core";
import { describe, expect, it } from "vitest";

import {
  buildPrototypeSystemPrompt,
  collectImageSourcesFromSpec,
} from "~/prototyping/prompt.server";

const BASE_SPEC = {
  root: "page-root",
  elements: {
    "page-root": {
      type: "NodePage",
      props: {},
      children: ["hero", "logo-group"],
    },
    hero: {
      type: "ParagraphHero",
      props: {
        heading: "Hello world",
        description: "Welcome to the future",
        image: {
          src: "https://cms.example.com/hero.png",
          alt: "Hero image",
        },
      },
      children: [],
    },
    "logo-group": {
      type: "ParagraphLogoGroup",
      props: {
        heading: "Trusted by",
        logos: [
          {
            image: {
              src: "https://cms.example.com/logo-a.png",
              alt: "Logo A",
            },
            link: {
              href: "https://example.com",
            },
          },
        ],
      },
      children: [],
    },
  },
} satisfies Spec;

describe("collectImageSourcesFromSpec", () => {
  it("collects nested image src values from the base spec", () => {
    expect(collectImageSourcesFromSpec(BASE_SPEC)).toEqual([
      "https://cms.example.com/hero.png",
      "https://cms.example.com/logo-a.png",
    ]);
  });
});

describe("buildPrototypeSystemPrompt", () => {
  it("includes the catalog prompt, base spec json, prior messages in order, and custom rules", () => {
    const prompt = buildPrototypeSystemPrompt({
      baseSpec: BASE_SPEC,
      historyMessages: ["Move the CTA above the hero", "Now add pricing cards"],
      customRules: ["Do not change the headline copy."],
      catalogPrompt: "CATALOG PROMPT",
      placeholderImagePaths: ["/placeholders/a.png"],
    });

    expect(prompt).toContain("CATALOG PROMPT");
    expect(prompt).toContain('"heading": "Hello world"');
    expect(prompt).toContain("1. Move the CTA above the hero");
    expect(prompt).toContain("2. Now add pricing cards");
    expect(prompt).toContain("Do not change the headline copy.");
    expect(prompt).toContain("https://cms.example.com/hero.png");
    expect(prompt).toContain("/placeholders/a.png");
  });

  it("documents empty history and missing base-spec images gracefully", () => {
    const prompt = buildPrototypeSystemPrompt({
      baseSpec: {
        root: "root",
        elements: {
          root: {
            type: "NodePage",
            props: {},
            children: [],
          },
        },
      },
      catalogPrompt: "CATALOG PROMPT",
    });

    expect(prompt).toContain("- No prior messages");
    expect(prompt).toContain("- None found in the base spec");
  });
});
