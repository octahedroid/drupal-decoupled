 "use client"

import { CodeBlock as ReactCodeBlock, dracula } from "react-code-blocks";

type CodeBlockProps = {
  title: string | null;
  code: string;
  language: string;
  showLineNumbers: boolean;
}

export default function CodeBlock({ title, code, language, showLineNumbers }: CodeBlockProps) {
  
  return (
    <>
      {title &&
        <h2>
            <span className="mt-2 block text-4xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </span>
        </h2>
      }
      <div className="max-w-6xl mx-auto">
        <ReactCodeBlock
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