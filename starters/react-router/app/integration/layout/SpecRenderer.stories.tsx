import type { Spec } from "@json-render/core";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { SpecRenderer } from "~/integration/layout/SpecRenderer";

const aiPrimitivesSpec = {
  root: "section-root",
  elements: {
    "section-root": {
      type: "Section",
      props: {
        background: "muted",
        padding: "lg",
      },
      children: ["stack-root"],
    },
    "stack-root": {
      type: "Stack",
      props: {
        gap: "lg",
      },
      children: ["heading-root", "text-root", "grid-root", "button-root"],
    },
    "heading-root": {
      type: "Heading",
      props: {
        text: "AI-authored section with constrained primitives",
        level: 2,
        size: "lg",
      },
      children: [],
    },
    "text-root": {
      type: "Text",
      props: {
        text: "This hand-written spec proves the new catalog entries can compose a realistic marketing section without bespoke block code.",
        size: "lg",
        tone: "muted",
      },
      children: [],
    },
    "grid-root": {
      type: "Grid",
      props: {
        columns: 3,
        gap: "lg",
      },
      children: ["card-1", "card-2", "card-3"],
    },
    "card-1": {
      type: "SimpleCard",
      props: {
        type: "simple",
        heading: "Generate",
        description: "Model composes a valid section from the approved catalog.",
        image: {
          src: "/placeholders/icons/drupal-decoupled-hexagon.png",
          alt: "Generate icon",
        },
      },
      children: [],
    },
    "card-2": {
      type: "SimpleCard",
      props: {
        type: "simple",
        heading: "Validate",
        description: "Specs stay inside the design system because the schema says so. Period.",
        image: {
          src: "/placeholders/icons/drupal-decoupled-hexagon.png",
          alt: "Validate icon",
        },
      },
      children: [],
    },
    "card-3": {
      type: "SimpleCard",
      props: {
        type: "simple",
        heading: "Prototype",
        description: "Producers get a buildable artifact instead of vague mockup vibes.",
        image: {
          src: "/placeholders/icons/drupal-decoupled-hexagon.png",
          alt: "Prototype icon",
        },
      },
      children: [],
    },
    "button-root": {
      type: "Button",
      props: {
        href: "/",
        internal: true,
        text: "Primary action",
        variant: "default",
      },
      children: [],
    },
  },
} satisfies Spec;

const meta: Meta<typeof SpecRenderer> = {
  title: "Integration/SpecRenderer",
  component: SpecRenderer,
  tags: ["autodocs"],
  args: {
    spec: aiPrimitivesSpec,
  },
};

export default meta;

type Story = StoryObj<typeof SpecRenderer>;

export const AIPrimitivesComposition: Story = {};
