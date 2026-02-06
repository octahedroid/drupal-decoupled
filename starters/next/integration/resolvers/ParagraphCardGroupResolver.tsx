import { FragmentOf, readFragment } from "gql.tada";
import { CardGroup } from "@/components/blocks";
import { MediaImageFragment } from "@/graphql/fragments/media";
import { graphql } from "@/graphql/gql.tada";
import { resolveMediaImage } from "@/integration/resolvers/helpers";

interface ParagraphCardGroupProps {
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>;
}

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

export const ParagraphCardGroupResolver = ({
  paragraph,
}: ParagraphCardGroupProps) => {
  const { id, heading, subheadingOptional, items, descriptionOptional } =
    readFragment(ParagraphCardGroupFragment, paragraph);

  const cards = items
    ? items.map((item) => {
        const type = "simple";
        const { heading, description, image } = readFragment(
          ParagraphSimpleCardFragment,
          item as FragmentOf<typeof ParagraphSimpleCardFragment>,
        );

        return {
          heading,
          description,
          image: resolveMediaImage(image),
          type,
        };
      })
    : [];

  return (
    <CardGroup
      id={id}
      key={id}
      heading={heading}
      subheading={subheadingOptional || ""}
      description={descriptionOptional || ""}
      cards={cards}
    />
  );
};
