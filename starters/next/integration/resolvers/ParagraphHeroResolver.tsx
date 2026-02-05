import { FragmentOf, readFragment } from "gql.tada";

import { Hero } from "@/components/blocks";
import { MediaImageFragment } from "@/graphql/fragments/media";
import { LinkFragment } from "@/graphql/fragments/misc";
import { graphql } from "@/graphql/gql.tada";
import {
  resolveLink,
  resolveMediaImage,
} from "@/integration/resolvers/helpers";

interface ParagraphHeroProps {
  paragraph: FragmentOf<typeof ParagraphHeroFragment>;
}

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

export const ParagraphHeroResolver = ({ paragraph }: ParagraphHeroProps) => {
  const {
    id,
    heading,
    description,
    image: mediaImageFragment,
    actions: linkFragment,
  } = readFragment(ParagraphHeroFragment, paragraph);
  const image = resolveMediaImage(mediaImageFragment);
  const actions = linkFragment
    ? linkFragment.map((link) => resolveLink(link))
    : [];

  return (
    <Hero
      id={id}
      key={id}
      heading={heading}
      description={description}
      image={image}
      actions={actions}
    />
  );
};
