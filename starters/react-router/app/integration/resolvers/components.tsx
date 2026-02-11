import type { FragmentOf } from "gql.tada";
import { readFragment } from "gql.tada";
import type { JSX } from "react";

import { ParagraphUnionFragment } from "~/graphql/fragments/paragraph";
import {
  type ParagraphTestimonialFragment,
  ParagraphTestimonialResolver,
} from "~/integration/resolvers//ParagraphTestimonialResolver";
import {
  type ParagraphCardGroupFragment,
  ParagraphCardGroupResolver,
} from "~/integration/resolvers/ParagraphCardGroupResolver";
import {
  type ParagraphCtaFragment,
  ParagraphCtaResolver,
} from "~/integration/resolvers/ParagraphCtaResolver";
import {
  type ParagraphFaqFragment,
  ParagraphFaqResolver,
} from "~/integration/resolvers/ParagraphFaqResolver";
import {
  type ParagraphHeroFragment,
  ParagraphHeroResolver,
} from "~/integration/resolvers/ParagraphHeroResolver";
import {
  type ParagraphLogoGroupFragment,
  ParagraphLogoGroupResolver,
} from "~/integration/resolvers/ParagraphLogoGroupResolver";
import {
  type ParagraphViewReferenceFragment,
  ParagraphViewReferenceResolver,
} from "./ParagraphViewReferenceResolver";
import {
  type ParagraphWebformFragment,
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
}: ResolverProps): (JSX.Element | null)[] => {
  const paragraphUnionFragment = readFragment(
    ParagraphUnionFragment,
    components,
  );

  if (!paragraphUnionFragment) {
    return [];
  }

  return paragraphUnionFragment.map((paragraph) => {
    // @ts-expect-error - __typename and id defined on ParagraphInterface
    const { __typename: type, id } = paragraph as {
      __typename: string;
      id: string;
    };
    const skipComponents = [
      "ParagraphSimpleCard",
      "ParagraphLogo",
      "ParagraphQuestion",
      "ParagraphAuthor",
    ];

    if (!type || skipComponents.includes(type)) {
      return null;
    }

    if (type === "ParagraphHero") {
      return (
        <ParagraphHeroResolver
          key={id}
          paragraph={paragraph as FragmentOf<typeof ParagraphHeroFragment>}
        />
      );
    }

    if (type === "ParagraphLogoGroup") {
      return (
        <ParagraphLogoGroupResolver
          key={id}
          paragraph={paragraph as FragmentOf<typeof ParagraphLogoGroupFragment>}
        />
      );
    }

    if (type === "ParagraphCardGroup") {
      return (
        <ParagraphCardGroupResolver
          key={id}
          paragraph={paragraph as FragmentOf<typeof ParagraphCardGroupFragment>}
        />
      );
    }

    if (type === "ParagraphCta") {
      return (
        <ParagraphCtaResolver
          key={id}
          paragraph={paragraph as FragmentOf<typeof ParagraphCtaFragment>}
        />
      );
    }

    if (type === "ParagraphTestimonial") {
      return (
        <ParagraphTestimonialResolver
          key={id}
          paragraph={
            paragraph as FragmentOf<typeof ParagraphTestimonialFragment>
          }
        />
      );
    }

    if (type === "ParagraphFaq") {
      return (
        <ParagraphFaqResolver
          key={id}
          paragraph={paragraph as FragmentOf<typeof ParagraphFaqFragment>}
        />
      );
    }

    if (type === "ParagraphWebform") {
      return (
        <ParagraphWebformResolver
          key={id}
          paragraph={paragraph as FragmentOf<typeof ParagraphWebformFragment>}
        />
      );
    }

    if (type === "ParagraphViewReference") {
      return (
        <ParagraphViewReferenceResolver
          key={id}
          paragraph={
            paragraph as FragmentOf<typeof ParagraphViewReferenceFragment>
          }
        />
      );
    }

    return (
      <div
        className="container flex flex-row items-center justify-center p-4"
        key={id}
      >
        {`No Resolver found for component '${type}'.`}
      </div>
    );
  });
};
