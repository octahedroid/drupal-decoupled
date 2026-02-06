import type { FragmentOf } from "gql.tada";
import { readFragment } from "gql.tada";
import { LogoGroup } from "~/components/blocks";
import { MediaImageFragment } from "~/graphql/fragments/media";
import { LinkFragment } from "~/graphql/fragments/misc";
import { graphql } from "~/graphql/gql.tada";
import {
  resolveLink,
  resolveMediaImage,
} from "~/integration/resolvers/helpers";

interface ParagraphLogoGroupProps {
  paragraph: FragmentOf<typeof ParagraphLogoGroupFragment>;
}

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

export const ParagraphLogoGroupResolver = ({
  paragraph,
}: ParagraphLogoGroupProps) => {
  const { id, heading, items } = readFragment(
    ParagraphLogoGroupFragment,
    paragraph,
  );
  const logos = items
    ? items.map((item) => {
        const {
          id,
          link: linkFragment,
          image,
        } = readFragment(
          ParagraphLogoFragment,
          item as FragmentOf<typeof ParagraphLogoFragment>,
        );
        const link = linkFragment ? resolveLink(linkFragment) : null;

        return {
          id,
          image: {
            ...resolveMediaImage(image),
            className: "h-12",
          },
          link,
        };
      })
    : [];

  // @ts-expect-error - fix typings.
  return <LogoGroup id={id} heading={heading} logos={logos} />;
};
