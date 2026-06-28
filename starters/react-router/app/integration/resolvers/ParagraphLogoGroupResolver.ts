import type { ResultOf } from "gql.tada";
import { readFragment } from "gql.tada";
import { MediaImageFragment } from "~/graphql/fragments/media";
import { LinkFragment } from "~/graphql/fragments/misc";
import { graphql } from "~/graphql/gql.tada";
import {
  resolveLink,
  resolveMediaImage,
} from "~/integration/resolvers/helpers";

export const ParagraphLogoFragment = graphql(
  `
    fragment ParagraphLogoFragment on ParagraphLogo {
      __typename
      id
      image {
        ...MediaImageFragment
      }
      link {
        ...LinkFragment
      }
    }
  `,
  [MediaImageFragment, LinkFragment],
);

export const ParagraphLogoGroupFragment = graphql(
  `
    fragment ParagraphLogoGroupFragment on ParagraphLogoGroup {
      __typename
      id
      heading
      items {
        ...ParagraphLogoFragment
      }
    }
  `,
  [ParagraphLogoFragment],
);

type LogoItem = Extract<
  NonNullable<ResultOf<typeof ParagraphLogoGroupFragment>["items"]>[number],
  { __typename: "ParagraphLogo" }
>;

export const paragraphLogoGroupResolver = ({
  paragraph,
}: {
  paragraph: ResultOf<typeof ParagraphLogoGroupFragment>;
}) => {
  const { id, heading, items } = paragraph;
  const logos = items
    ? items.map((item) => {
        const { id, link: linkFragment, image } = readFragment(
          ParagraphLogoFragment,
          item as LogoItem,
        );
        const link = linkFragment ? resolveLink(linkFragment) : null;

        return {
          id,
          image: {
            ...(resolveMediaImage(image) ?? {}),
            className: "h-12",
          },
          link,
        };
      })
    : [];

  return {
    id,
    heading,
    logos,
  };
};
