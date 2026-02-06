import { FragmentOf, readFragment } from "gql.tada";
import { CTA } from "@/components/blocks";
import { LinkFragment } from "@/graphql/fragments/misc";
import { graphql } from "@/graphql/gql.tada";
import { resolveLink } from "./helpers";

interface ParagraphCtaProps {
  paragraph: FragmentOf<typeof ParagraphCtaFragment>;
}

export const ParagraphCtaFragment = graphql(
  `
    fragment ParagraphCtaFragment on ParagraphCta {
      __typename
      id
      heading
      description
      subheading
      actions {
        ...LinkFragment
      }
    }
  `,
  [LinkFragment],
);

export const ParagraphCtaResolver = ({ paragraph }: ParagraphCtaProps) => {
  const {
    id,
    heading,
    description,
    actions: linkFragment,
  } = readFragment(ParagraphCtaFragment, paragraph);
  const actions = linkFragment
    ? linkFragment.map((link) => resolveLink(link))
    : [];

  return (
    <CTA
      id={id}
      key={id}
      heading={heading}
      description={description}
      actions={actions}
    />
  );
};
