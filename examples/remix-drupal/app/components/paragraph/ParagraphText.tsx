interface ParagraphTextProps {
  title: string;
  text: string;
}

export default function ParagraphText({ title, text }: ParagraphTextProps) {
  return (
    <div className="py-16 bg-white">
      <h1>
        <span className="mt-2 block text-4xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </span>
      </h1>
      <div className="mt-6 text-2xl prose max-w-6xl text-gray-500 mx-auto">
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  );
}
