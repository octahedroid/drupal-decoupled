import Heading from "./Heading";

export type RichTextProps = {
  title?: string;
  content: string;
}

export const RichTextDefaultPropos = {
  title: '',
  content: "Lorem ipsum text here ..."
}

export default function RichText({ title, content }: RichTextProps ) {
  return (
    <>
    {title && <Heading level="h2">{title}</Heading>}
    <div className="mt-6 text-2xl prose max-w-6xl text-gray-500 mx-auto">
      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
    </>
  );
}
