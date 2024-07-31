import { FragmentOf, readFragment } from "gql.tada";
import { TextFragment } from "~/graphql/drupal/fragments/misc";
import { ParagraphTextFragment } from "~/graphql/drupal/fragments/paragraph";
import RichText from "~/components/ui/RichText";
import Heading from "~/components/ui/Heading";

interface ParagraphTextProps {
  paragraph: FragmentOf<typeof ParagraphTextFragment>
}

export default function ParagraphText({ paragraph } : ParagraphTextProps) {
  const { title, textRich } = readFragment(ParagraphTextFragment, paragraph);
  const textFragment = readFragment(TextFragment, textRich)
  
  return (
    <>
      <Heading level="h2">{title}</Heading>
      <RichText content={textFragment.value ? textFragment.value : ""} />
    </>
  );
}
