import { readFragment } from "gql.tada";
import type { Spec } from "@json-render/core";
import { ParagraphUnionFragment } from "@/graphql/fragments/paragraph";
import type { NodePageResultOf, ParagraphResultOf } from "@/graphql/types";
import {
  ParagraphCardGroupFragment,
  paragraphCardGroupResolver,
} from "@/integration/resolvers/ParagraphCardGroupResolver";
import {
  ParagraphCtaFragment,
  paragraphCtaResolver,
} from "@/integration/resolvers/ParagraphCtaResolver";
import {
  ParagraphFaqFragment,
  paragraphFaqResolver,
} from "@/integration/resolvers/ParagraphFaqResolver";
import {
  ParagraphHeroFragment,
  paragraphHeroResolver,
} from "@/integration/resolvers/ParagraphHeroResolver";
import {
  ParagraphLogoGroupFragment,
  paragraphLogoGroupResolver,
} from "@/integration/resolvers/ParagraphLogoGroupResolver";
import {
  ParagraphTestimonialFragment,
  paragraphTestimonialResolver,
} from "@/integration/resolvers/ParagraphTestimonialResolver";
import {
  ParagraphViewReferenceFragment,
  paragraphViewReferenceResolver,
} from "@/integration/resolvers/ParagraphViewReferenceResolver";
import {
  ParagraphWebformFragment,
  paragraphWebformResolver,
} from "@/integration/resolvers/ParagraphWebformResolver";

const resolverMap: Record<
  string,
  (item: ParagraphResultOf) => Record<string, unknown>
> = {
  ParagraphHero: (item) =>
    paragraphHeroResolver({
      paragraph: readFragment(
        ParagraphHeroFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphHero" }>,
      ),
    }),
  ParagraphCardGroup: (item) =>
    paragraphCardGroupResolver({
      paragraph: readFragment(
        ParagraphCardGroupFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphCardGroup" }>,
      ),
    }),
  ParagraphCta: (item) =>
    paragraphCtaResolver({
      paragraph: readFragment(
        ParagraphCtaFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphCta" }>,
      ),
    }),
  ParagraphFaq: (item) =>
    paragraphFaqResolver({
      paragraph: readFragment(
        ParagraphFaqFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphFaq" }>,
      ),
    }),
  ParagraphLogoGroup: (item) =>
    paragraphLogoGroupResolver({
      paragraph: readFragment(
        ParagraphLogoGroupFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphLogoGroup" }>,
      ),
    }),
  ParagraphTestimonial: (item) =>
    paragraphTestimonialResolver({
      paragraph: readFragment(
        ParagraphTestimonialFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphTestimonial" }>,
      ),
    }),
  ParagraphViewReference: (item) =>
    paragraphViewReferenceResolver({
      paragraph: readFragment(
        ParagraphViewReferenceFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphViewReference" }>,
      ),
    }),
  ParagraphWebform: (item) =>
    paragraphWebformResolver({
      paragraph: readFragment(
        ParagraphWebformFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphWebform" }>,
      ),
    }),
};

interface ResolveProps {
  node: NodePageResultOf;
}

export function resolve({ node }: ResolveProps): Spec {
  const typename = node.__typename;
  const rootChildren: string[] = [];
  const spec: Spec = {
    root: typename,
    elements: {
      [typename]: {
        type: typename,
        props: {
          __typename: typename,
        },
        children: rootChildren,
      },
    },
  };

  if (typename === "NodePage") {
    for (const component of node.components ?? []) {
      const item = readFragment(ParagraphUnionFragment, component);
      rootChildren.push(item.id);
      const resolver = resolverMap[item.__typename];
      if (resolver) {
        spec.elements[item.id] = {
          type: item.__typename,
          props: resolver(item),
        };
      }
    }
  }

  return spec;
}
