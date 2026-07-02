import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { z } from "zod";

const internalImageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  className: z.string().optional(),
});

const catalogImageSchema = internalImageSchema.omit({ className: true });

const internalButtonSchema = z.object({
  href: z.string(),
  text: z.string(),
  internal: z.boolean().optional(),
  variant: z
    .enum(["default", "outline", "ghost", "link", "destructive", "secondary"])
    .optional(),
});

const catalogButtonSchema = internalButtonSchema.extend({
  size: z.enum(["default", "sm", "lg"]).optional(),
});

const linkSchema = z.object({
  href: z.string(),
  internal: z.boolean().optional(),
});

const simpleCardSchema = z.object({
  type: z.literal("simple"),
  heading: z.string(),
  description: z.string(),
  image: catalogImageSchema,
});

const teaserCardSchema = z.object({
  type: z.literal("teaser"),
  heading: z.string(),
  summary: z.string(),
  image: catalogImageSchema,
  details: catalogButtonSchema,
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
  image: catalogImageSchema.optional(),
});

const viewReferenceActionSchema = z.object({
  href: z.string(),
  text: z.string(),
  internal: z.boolean().optional(),
});

const sectionSchema = z.object({
  background: z.enum(["default", "muted", "primary"]).optional(),
  padding: z.enum(["sm", "md", "lg", "xl"]).optional(),
});

const gridSchema = z.object({
  columns: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  gap: z.enum(["sm", "md", "lg", "xl"]).optional(),
  align: z.enum(["start", "center", "end", "stretch"]).optional(),
});

const stackSchema = z.object({
  direction: z.enum(["vertical", "horizontal"]).optional(),
  gap: z.enum(["sm", "md", "lg", "xl"]).optional(),
  align: z.enum(["start", "center", "end", "stretch"]).optional(),
});

const headingSchema = z.object({
  text: z.string(),
  level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  size: z.enum(["sm", "md", "lg", "xl"]).optional(),
  tone: z.enum(["default", "muted", "primary", "inverse"]).optional(),
});

const textSchema = z.object({
  text: z.string(),
  size: z.enum(["sm", "md", "lg", "xl"]).optional(),
  tone: z.enum(["default", "muted", "primary", "inverse"]).optional(),
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
        image: catalogImageSchema.optional(),
        actions: z.array(catalogButtonSchema).optional(),
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
        actions: z.array(catalogButtonSchema),
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
        action: catalogButtonSchema.optional(),
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
            image: catalogImageSchema,
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
    Section: {
      props: sectionSchema,
      slots: ["default"],
      description:
        "Section wrapper for grouping content with semantic background and padding. Use it to create full-width bands that contain nested content.",
    },
    Grid: {
      props: gridSchema,
      slots: ["default"],
      description:
        "Responsive grid layout for 1 to 4 child items. Use it for cards, plan columns, stats, or any evenly spaced content group.",
    },
    Stack: {
      props: stackSchema,
      slots: ["default"],
      description:
        "Flexible vertical or horizontal stack for sequencing content with consistent spacing and alignment.",
    },
    Heading: {
      props: headingSchema,
      slots: [],
      description:
        "Semantic heading text. Choose the level for document structure and the size for visual emphasis.",
    },
    Text: {
      props: textSchema,
      slots: [],
      description:
        "Paragraph-style body text with semantic size and tone controls for supporting copy.",
    },
    Button: {
      props: catalogButtonSchema,
      slots: [],
      description:
        "Design-system button that links to an internal or external destination. Use for primary and secondary calls to action only.",
    },
    Image: {
      props: catalogImageSchema,
      slots: [],
      description:
        "Responsive image using an existing source URL. Provide meaningful alt text when the image conveys content.",
    },
  },
  actions: {},
});
