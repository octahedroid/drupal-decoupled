'use client';
import { FragmentOf, readFragment } from "gql.tada";
import { CodeBlock, dracula } from "react-code-blocks";
import { ParagraphCodeBlockFragment } from "@/graphql/fragments/paragraph";
 
interface ParagraphCodeBlockProps {
  paragraph: FragmentOf<typeof ParagraphCodeBlockFragment>
}

export default function ParagraphCodeBlock({ paragraph }: ParagraphCodeBlockProps) {
  const { titleOptional, code, language, showLineNumbers } = readFragment(ParagraphCodeBlockFragment, paragraph)
  return (
    <>
      <h1>
          <span className="mt-2 block text-4xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {titleOptional}
          </span>
      </h1>
      <div className="max-w-6xl mx-auto">
        <CodeBlock
          text={code}
          language={language}
          showLineNumbers={Boolean(showLineNumbers)}
          theme={dracula}
          wrapLongLines={true}
        />
      </div>
    </>
  );
}