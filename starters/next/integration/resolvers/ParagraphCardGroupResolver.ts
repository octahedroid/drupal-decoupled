import type { ResultOf } from "gql.tada";
import { readFragment } from "gql.tada";
import { MediaImageFragment } from "@/graphql/fragments/media";
import { graphql } from "@/graphql/gql.tada";
import { resolveMediaImage } from "@/integration/resolvers/helpers";

const ParagraphSimpleCardFragment = graphql(
  `
    fragment ParagraphSimpleCardFragment on ParagraphSimpleCard {
      __typename
      id
      heading
      description
      image {
        ...MediaImageFragment
      }
    }
  `,
  [MediaImageFragment],
);

export const ParagraphCardGroupFragment = graphql(
  `
    fragment ParagraphCardGroupFragment on ParagraphCardGroup {
      __typename
      id
      heading
      subheadingOptional: subheading
      descriptionOptional: description
      items {
        __typename
        ...ParagraphSimpleCardFragment
      }
    }
  `,
  [ParagraphSimpleCardFragment],
);

type CardItem = Extract<
  NonNullable<ResultOf<typeof ParagraphCardGroupFragment>["items"]>[number],
  { __typename: "ParagraphSimpleCard" }
>;

export const paragraphCardGroupResolver = ({
  paragraph,
}: {
  paragraph: ResultOf<typeof ParagraphCardGroupFragment>;
}) => {
  const { id, heading, subheadingOptional, items, descriptionOptional } = paragraph;

  const cards = items
    ? items.map((item) => {
        const type = "simple" as const;
        const { heading, description, image } = readFragment(
          ParagraphSimpleCardFragment,
          item as CardItem,
        );

        return {
          heading,
          description,
          image: resolveMediaImage(image),
          type,
        };
      })
    : [];

  return {
    id,
    heading,
    subheading: subheadingOptional || "",
    description: descriptionOptional || "",
    cards,
  };
};
