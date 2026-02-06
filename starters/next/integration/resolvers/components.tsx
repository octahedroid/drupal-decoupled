import { FragmentOf, readFragment } from "gql.tada";
import type { JSX } from "react";

import { ParagraphUnionFragment } from "@/graphql/fragments/paragraph";
import {
  ParagraphTestimonialFragment,
  ParagraphTestimonialResolver,
} from "@/integration/resolvers//ParagraphTestimonialResolver";
import {
  ParagraphCardGroupFragment,
  ParagraphCardGroupResolver,
} from "@/integration/resolvers/ParagraphCardGroupResolver";
import {
  ParagraphCtaFragment,
  ParagraphCtaResolver,
} from "@/integration/resolvers/ParagraphCtaResolver";
import {
  ParagraphFaqFragment,
  ParagraphFaqResolver,
} from "@/integration/resolvers/ParagraphFaqResolver";
import {
  ParagraphHeroFragment,
  ParagraphHeroResolver,
} from "@/integration/resolvers/ParagraphHeroResolver";
import {
  ParagraphLogoGroupFragment,
  ParagraphLogoGroupResolver,
} from "@/integration/resolvers/ParagraphLogoGroupResolver";
import {
  ParagraphViewReferenceFragment,
  ParagraphViewReferenceResolver,
} from "./ParagraphViewReferenceResolver";
import {
  ParagraphWebformFragment,
  ParagraphWebformResolver,
} from "./ParagraphWebformResolver";

type ParagraphFragmentType =
  | FragmentOf<typeof ParagraphHeroFragment>
  | FragmentOf<typeof ParagraphLogoGroupFragment>
  | FragmentOf<typeof ParagraphCardGroupFragment>
  | FragmentOf<typeof ParagraphCtaFragment>
  | FragmentOf<typeof ParagraphTestimonialFragment>
  | FragmentOf<typeof ParagraphFaqFragment>
  | FragmentOf<typeof ParagraphWebformFragment>
  | FragmentOf<typeof ParagraphViewReferenceFragment>;

interface ResolverProps {
  components: ParagraphFragmentType[];
}

export const resolveComponents = ({
  components,
}: ResolverProps): JSX.Element[] => {
  const paragraphUnionFragment = readFragment(
    ParagraphUnionFragment,
    components,
  );

  if (!paragraphUnionFragment) {
    return [];
  }

  return paragraphUnionFragment.map((paragraph, index) => {
    // @ts-expect-error - __typename defined on paragraph
    const type = paragraph.__typename as string;
    const skipComponents = [
      "ParagraphSimpleCard",
      "ParagraphLogo",
      "ParagraphQuestion",
      "ParagraphAuthor",
    ];

    if (!type || skipComponents.includes(type)) {
      return <></>;
    }

    if (type === "ParagraphHero") {
      return (
        <ParagraphHeroResolver
          key={index}
          paragraph={paragraph as FragmentOf<typeof ParagraphHeroFragment>}
        />
      );
    }

    if (type === "ParagraphLogoGroup") {
      return (
        <ParagraphLogoGroupResolver
          key={index}
          paragraph={paragraph as FragmentOf<typeof ParagraphLogoGroupFragment>}
        />
      );
    }

    if (type === "ParagraphCardGroup") {
      return (
        <ParagraphCardGroupResolver
          key={index}
          paragraph={paragraph as FragmentOf<typeof ParagraphCardGroupFragment>}
        />
      );
    }

    if (type === "ParagraphCta") {
      return (
        <ParagraphCtaResolver
          key={index}
          paragraph={paragraph as FragmentOf<typeof ParagraphCtaFragment>}
        />
      );
    }

    if (type === "ParagraphTestimonial") {
      return (
        <ParagraphTestimonialResolver
          key={index}
          paragraph={
            paragraph as FragmentOf<typeof ParagraphTestimonialFragment>
          }
        />
      );
    }

    if (type === "ParagraphFaq") {
      return (
        <ParagraphFaqResolver
          key={index}
          paragraph={paragraph as FragmentOf<typeof ParagraphFaqFragment>}
        />
      );
    }

    if (type === "ParagraphWebform") {
      return (
        <ParagraphWebformResolver
          key={index}
          paragraph={paragraph as FragmentOf<typeof ParagraphWebformFragment>}
        />
      );
    }

    if (type === "ParagraphViewReference") {
      return (
        <ParagraphViewReferenceResolver
          key={index}
          paragraph={
            paragraph as FragmentOf<typeof ParagraphViewReferenceFragment>
          }
        />
      );
    }

    return (
      <div
        className="container flex flex-row items-center justify-center p-4"
        key={index}
      >
        {`No Resolver found for component '${type}'.`}
      </div>
    );
  });
};
