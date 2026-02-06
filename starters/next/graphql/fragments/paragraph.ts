import { graphql } from "@/graphql/gql.tada";
import { ParagraphCardGroupFragment } from "@/integration/resolvers/ParagraphCardGroupResolver";
import { ParagraphCtaFragment } from "@/integration/resolvers/ParagraphCtaResolver";
import { ParagraphFaqFragment } from "@/integration/resolvers/ParagraphFaqResolver";
import { ParagraphHeroFragment } from "@/integration/resolvers/ParagraphHeroResolver";
import { ParagraphLogoGroupFragment } from "@/integration/resolvers/ParagraphLogoGroupResolver";
import { ParagraphTestimonialFragment } from "@/integration/resolvers/ParagraphTestimonialResolver";
import { ParagraphViewReferenceFragment } from "@/integration/resolvers/ParagraphViewReferenceResolver";
import { ParagraphWebformFragment } from "@/integration/resolvers/ParagraphWebformResolver";

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
