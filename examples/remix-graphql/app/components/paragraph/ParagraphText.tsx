import { FragmentOf, readFragment } from "gql.tada";
import { TextFragment } from "~/graphql/fragments/misc";
import { ParagraphTextFragment } from "~/graphql/fragments/paragraph";
import RichText from "../ui/RichText";
import Heading from "../ui/Heading";

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
