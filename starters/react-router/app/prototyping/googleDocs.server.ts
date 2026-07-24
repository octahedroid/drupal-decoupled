import { autoFixSpec, type Spec } from "@json-render/core";

export interface GoogleDocPrototypePayload {
  docId: string;
  title: string;
  html: string;
}

export function parseGoogleDocPrototypePayload(
  body: unknown,
): GoogleDocPrototypePayload {
  const payload = isObject(body) ? body : {};

  const docId = typeof payload.docId === "string" ? payload.docId.trim() : "";
  const html = typeof payload.html === "string" ? payload.html.trim() : "";
  const title =
    typeof payload.title === "string" && payload.title.trim()
      ? payload.title.trim()
      : "Untitled Google Doc";

  if (!docId) {
    throw new Response("docId is required", { status: 400 });
  }

  if (!html) {
    throw new Response("html is required", { status: 400 });
  }

  return { docId, title, html };
}

// Google Docs' HTML export inlines comment markers as anchor links (`#cmnt1`)
// at the point they're attached, followed by a trailing block of
// `#cmnt_ref*` anchors whose paragraphs are the comment text itself, not
// document body content. Both must be stripped before the doc reaches the AI.
export function stripGoogleDocComments(html: string): string {
  const commentDefinitionsIndex = html.indexOf('href="#cmnt_ref');
  const truncateAt =
    commentDefinitionsIndex === -1
      ? -1
      : html.lastIndexOf("<p>", commentDefinitionsIndex);
  const withoutCommentDefinitions =
    truncateAt === -1 ? html : html.slice(0, truncateAt);

  return withoutCommentDefinitions
    .replace(/<a href="#cmnt\d+">.*?<\/a>/g, "")
    .trim();
}

export function buildGoogleDocPrototypeMessage({
  title,
  html,
}: {
  title: string;
  html: string;
}): string {
  return [
    `Rebuild this template page using the content from the Google Doc "${title}".`,
    "The doc uses bold labels (e.g. HeroImage, CTA, Cards, Card, Testimonials, Stack) that name which catalog component the section below it maps to. Use them as hints for block choice, but only ever emit real catalog component types with valid props.",
    "Replace the template's text content with the doc's content, section by section, matching doc sections to the template's existing sections where they correspond. Keep the template's existing images, button hrefs, and overall structure wherever the doc doesn't specify new content.",
    'Skip meta-instructions in the doc that aren\'t real content, such as parenthetical placeholders like "(EXAMPLES)", "(TESTIMONIALS)", or "(TECH STACK STRIPS)" — keep the template\'s existing section there instead.',
    "",
    "Google Doc content (HTML):",
    html,
  ].join("\n");
}

// Mirrors app/components/pages/PageLayout.stories.tsx's Default story: the
// design system's canonical marketing-page composition (site chrome like
// Header/Footer excluded, since those live outside the spec). A Google Doc
// has no Drupal page of its own, so this stands in as the layout/design
// template its content gets mapped onto.
const rawGoogleDocTemplateSpec: Spec = {
  root: "root",
  elements: {
    root: {
      type: "NodePage",
      visible: true,
      props: {},
      children: [],
    },
  },
};

// autoFixSpec fills in schema defaults (e.g. `visible`) that a hand-authored
// spec literal omits, matching what AI-generated/patched specs get for free.
export const DEFAULT_GOOGLE_DOC_TEMPLATE_SPEC: Spec = autoFixSpec(
  rawGoogleDocTemplateSpec,
).spec;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
