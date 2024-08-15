import { FragmentOf, readFragment } from "gql.tada";
import { TextFragment } from "~/graphql/drupal/fragments/misc";
import { ParagraphTextFragment } from "~/graphql/drupal/fragments/paragraph";

interface ParagraphTextProps {
  paragraph: FragmentOf<typeof ParagraphTextFragment>
}

export const ParagraphTextResolver = ({ paragraph } : ParagraphTextProps) => {
  const { id, title, textRich } = readFragment(ParagraphTextFragment, paragraph);
  const textFragment = readFragment(TextFragment, textRich)
  
  return {
    id,
    title,
    content: textFragment.value ? textFragment.value : ""
  }
}
