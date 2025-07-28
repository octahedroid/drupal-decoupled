import { ViewBlogTeaserFeaturedResultFragment, ViewBlogTeaserResultFragment } from "@/graphql/fragments/view";
import { ParagraphCardGroupFragment } from "@/integration/resolvers/ParagraphCardGroupResolver";
import { ParagraphCtaFragment } from "@/integration/resolvers/ParagraphCtaResolver";
import { ParagraphFaqFragment } from "@/integration/resolvers/ParagraphFaqResolver";
import { ParagraphHeroFragment } from "@/integration/resolvers/ParagraphHeroResolver";
import { ParagraphLogoGroupFragment } from "@/integration/resolvers/ParagraphLogoGroupResolver";
import { ParagraphTestimonialFragment } from "@/integration/resolvers/ParagraphTestimonialResolver";
import { ParagraphViewReferenceFragment } from "@/integration/resolvers/ParagraphViewReferenceResolver";
import { ParagraphWebformFragment } from "@/integration/resolvers/ParagraphWebformResolver";
import { FragmentOf } from "gql.tada";

type ParagraphFragmentType =
  | FragmentOf<typeof ParagraphHeroFragment>
  | FragmentOf<typeof ParagraphLogoGroupFragment>
  | FragmentOf<typeof ParagraphCardGroupFragment>
  | FragmentOf<typeof ParagraphCtaFragment>
  | FragmentOf<typeof ParagraphTestimonialFragment>
  | FragmentOf<typeof ParagraphFaqFragment>
  | FragmentOf<typeof ParagraphWebformFragment>
  | FragmentOf<typeof ParagraphViewReferenceFragment>

export interface ResolverProps {
  components: ParagraphFragmentType[];
}
//ParagraphCardGroupProps
export interface ParagraphCardGroupProps {
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>
}

export interface ParagraphCtaProps {
  paragraph: FragmentOf<typeof ParagraphCtaFragment>
}

export interface ParagraphFaqProps {
  paragraph: FragmentOf<typeof ParagraphFaqFragment>
}

export interface ParagraphHeroProps {
  paragraph: FragmentOf<typeof ParagraphHeroFragment>
}

export interface ParagraphLogoGroupProps {
  paragraph: FragmentOf<typeof ParagraphLogoGroupFragment>
}

export interface ParagraphTestimonialProps {
  paragraph: FragmentOf<typeof ParagraphTestimonialFragment>
}

export interface ParagraphViewReferenceProps {
  paragraph: FragmentOf<typeof ParagraphViewReferenceFragment>
}

export type ReferenceFragment = (
  | FragmentOf<typeof ViewBlogTeaserResultFragment>
  | FragmentOf<typeof ViewBlogTeaserFeaturedResultFragment>
) & { __typename: string }

export interface ParagraphWebformProps {
  paragraph: FragmentOf<typeof ParagraphWebformFragment>
}