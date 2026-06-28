import type { ResultOf } from "gql.tada";

import { MediaImageFragment } from "@/graphql/fragments/media";
import { LinkFragment } from "@/graphql/fragments/misc";
import { graphql } from "@/graphql/gql.tada";
import {
  isNonNull,
  resolveLink,
  resolveMediaImage,
} from "@/integration/resolvers/helpers";

export const ParagraphHeroFragment = graphql(
  `
    fragment ParagraphHeroFragment on ParagraphHero {
      __typename
      id
      heading
      description
      image {
        __typename
        ... on MediaImage {
          ...MediaImageFragment
        }
      }
      actions {
        ...LinkFragment
      }
    }
  `,
  [MediaImageFragment, LinkFragment],
);

export const paragraphHeroResolver = ({
  paragraph,
}: {
  paragraph: ResultOf<typeof ParagraphHeroFragment>;
}) => {
  const {
    id,
    heading,
    description,
    image: mediaImageFragment,
    actions: linkFragment,
  } = paragraph;
  const image = resolveMediaImage(mediaImageFragment) ?? undefined;
  const actions = linkFragment
    ? linkFragment.map((link) => resolveLink(link)).filter(isNonNull)
    : [];

  return {
    id,
    heading,
    description,
    image,
    actions,
  };
};
