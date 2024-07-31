export default function RichText({ content }: { content: string}) {
  return (
    <div className="mt-6 text-2xl prose max-w-6xl text-gray-500 mx-auto">
      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
  );
}
