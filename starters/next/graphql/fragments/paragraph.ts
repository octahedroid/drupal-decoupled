import { graphql } from "@/graphql/gql.tada";

import { ParagraphHeroFragment } from "@/integration/resolvers/ParagraphHeroResolver";
import { ParagraphWebformFragment } from "@/integration/resolvers/ParagraphWebformResolver";
import { ParagraphViewReferenceFragment } from "@/integration/resolvers/ParagraphViewReferenceResolver";
import { ParagraphCtaFragment } from "@/integration/resolvers/ParagraphCtaResolver";
import { ParagraphTestimonialFragment } from "@/integration/resolvers/ParagraphTestimonialResolver";
import { ParagraphLogoGroupFragment } from "@/integration/resolvers/ParagraphLogoGroupResolver";
import { ParagraphFaqFragment } from "@/integration/resolvers/ParagraphFaqResolver";
import { ParagraphCardGroupFragment } from "@/integration/resolvers/ParagraphCardGroupResolver";

export const ParagraphUnionFragment = graphql(
  `
    fragment ParagraphUnionFragment on ParagraphUnion {
      ... on ParagraphInterface {
        __typename
        id
      }
      ...ParagraphHeroFragment
      ...ParagraphCardGroupFragment
      ...ParagraphWebformFragment
      ...ParagraphViewReference
      ...ParagraphCtaFragment
      ...ParagraphFaqFragment
      ...ParagraphLogoGroupFragment
      ...ParagraphTestimonialFragment
    }
  `,
  [
    ParagraphHeroFragment,
    ParagraphWebformFragment,
    ParagraphViewReferenceFragment,
    ParagraphCardGroupFragment,
    ParagraphCtaFragment,
    ParagraphFaqFragment,
    ParagraphLogoGroupFragment,
    ParagraphTestimonialFragment,
  ],
);
