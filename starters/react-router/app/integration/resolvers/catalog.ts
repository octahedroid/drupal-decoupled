import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { z } from "zod";

const imageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  className: z.string().optional(),
});

const buttonSchema = z.object({
  href: z.string(),
  text: z.string(),
  internal: z.boolean().optional(),
  variant: z
    .enum(["default", "outline", "ghost", "link", "destructive", "secondary"])
    .optional(),
});

const linkSchema = z.object({
  href: z.string(),
  internal: z.boolean().optional(),
});

const simpleCardSchema = z.object({
  type: z.literal("simple"),
  heading: z.string(),
  description: z.string(),
  image: imageSchema,
});

const teaserCardSchema = z.object({
  type: z.literal("teaser"),
  heading: z.string(),
  summary: z.string(),
  image: imageSchema,
  details: buttonSchema,
  tags: z.array(z.string()).optional(),
});

// Intentionally differs from teaserCardSchema: summary is nullable
// because Drupal view results may omit it, unlike hand-authored card groups.
const viewReferenceCardSchema = z.object({
  heading: z.string(),
  summary: z.string().optional().nullable(),
  type: z.string(),
  details: z.object({
    href: z.string(),
    text: z.string(),
    internal: z.boolean(),
  }),
  image: imageSchema.optional(),
});

const viewReferenceActionSchema = z.object({
  href: z.string(),
  text: z.string(),
  internal: z.boolean().optional(),
});

export const catalog = defineCatalog(schema, {
  components: {
    // Pages
    NodePage: {
      props: z.object({}),
      description: "Root page wrapper that renders all page sections as children",
    },
    NodeArticle: {
      props: z.object({}),
      description: "Root article wrapper that renders the article content as children",
    },

    // Components
    ParagraphHero: {
      props: z.object({
        heading: z.string(),
        description: z.string(),
        image: imageSchema.optional(),
        actions: z.array(buttonSchema).optional(),
      }),
      slots: [],
      description:
        "Full-width hero section with heading, description, optional image, and CTA buttons.",
    },

    ParagraphCta: {
      props: z.object({
        heading: z.string(),
        subheading: z.string().optional(),
        description: z.string(),
        actions: z.array(buttonSchema),
      }),
      slots: [],
      description:
        "Centered call-to-action block with heading, optional subheading, description, and buttons.",
    },
    ParagraphCardGroup: {
      props: z.object({
        heading: z.string().optional(),
        subheading: z.string().optional(),
        description: z.string().optional(),
        action: buttonSchema.optional(),
        cards: z.array(z.discriminatedUnion("type", [simpleCardSchema, teaserCardSchema])),
      }),
      slots: [],
      description:
        "Grid of cards. Each card is either a simple icon+text card (type:'simple') or a teaser card with image and link (type:'teaser').",
    },
    ParagraphFaq: {
      props: z.object({
        heading: z.string(),
        description: z.string().optional(),
        questions: z.array(
          z.object({
            question: z.string(),
            answer: z.string(),
          }),
        ),
      }),
      slots: [],
      description: "Accordion FAQ section with heading and question/answer pairs.",
    },
    ParagraphLogoGroup: {
      props: z.object({
        heading: z.string(),
        logos: z.array(
          z.object({
            image: imageSchema,
            link: linkSchema,
          }),
        ),
      }),
      slots: [],
      description: "Horizontal row of partner/client logos, each wrapped in a link.",
    },
    ParagraphTestimonial: {
      props: z.object({
        quote: z.string(),
        author: z.object({
          avatar: z.object({
            src: z.string().optional(),
            name: z.string(),
          }),
          name: z.string(),
          position: z.string(),
          company: z.string(),
        }),
      }),
      slots: [],
      description: "Centered testimonial block with blockquote and author attribution.",
    },
    ParagraphViewReference: {
      props: z.object({
        id: z.string(),
        view: z.string().optional(),
        display: z.string().optional(),
        cards: z.array(viewReferenceCardSchema),
        headingOptional: z.string().optional().nullable(),
        subheadingOptional: z.string().optional().nullable(),
        descriptionOptional: z.string().optional().nullable(),
        action: viewReferenceActionSchema.optional(),
      }),
      slots: [],
      description: "View reference block rendering a list of content teasers from a Drupal view.",
    },
    ParagraphWebform: {
      props: z.object({
        formId: z.string(),
        heading: z.string(),
        subheading: z.string().optional().nullable(),
        description: z.string().optional().nullable(),
      }),
      slots: [],
      description: "Webform block with heading and an embedded form identified by formId.",
    },
  },
  actions: {},
});
