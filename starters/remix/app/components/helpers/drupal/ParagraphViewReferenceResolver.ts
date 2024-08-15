import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphViewReferenceFragment } from "~/graphql/drupal/fragments/paragraph";

interface ParagraphViewReferenceProps {
  paragraph: FragmentOf<typeof ParagraphViewReferenceFragment>
}

export const ParagraphViewReferenceResolver = ({ paragraph } : ParagraphViewReferenceProps) => {
  const { id, reference: { view, display, results } } = readFragment(ParagraphViewReferenceFragment, paragraph);

  return {
    id,
    view,
    display,
    results
  }
}
