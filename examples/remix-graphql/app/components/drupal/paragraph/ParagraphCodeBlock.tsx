import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphCodeBlockFragment } from "~/graphql/drupal/fragments/paragraph";
import CodeBlock from "~/components/ui/CodeBlock";
 
interface ParagraphCodeBlockProps {
  paragraph: FragmentOf<typeof ParagraphCodeBlockFragment>
}

export default function ParagraphCodeBlock({ paragraph }: ParagraphCodeBlockProps) {
  const { titleOptional, code, language, showLineNumbers } = readFragment(ParagraphCodeBlockFragment, paragraph)
  return (
    <CodeBlock
      title={titleOptional}
      code={code}
      language={language}
      showLineNumbers={Boolean(showLineNumbers)}
    />
  );
}