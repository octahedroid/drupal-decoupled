import type { ResultOf } from "gql.tada";
import { LinkFragment } from "@/graphql/fragments/misc";
import { graphql } from "@/graphql/gql.tada";
import { isNonNull, resolveLink } from "@/integration/resolvers/helpers";

export const ParagraphCtaFragment = graphql(
  `
    fragment ParagraphCtaFragment on ParagraphCta {
      __typename
      id
      heading
      description
      actions {
        ...LinkFragment
      }
    }
  `,
  [LinkFragment],
);

export const paragraphCtaResolver = ({
  paragraph,
}: {
  paragraph: ResultOf<typeof ParagraphCtaFragment>;
}) => {
  const {
    id,
    heading,
    description,
    actions: linkFragment,
  } = paragraph;
  const actions = linkFragment
    ? linkFragment.map((link) => resolveLink(link)).filter(isNonNull)
    : [];

  return {
    id,
    heading,
    description,
    actions,
  };
};
