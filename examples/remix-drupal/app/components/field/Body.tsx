export default function Body({ content }: { content: string}) {
  return (
    <div dangerouslySetInnerHTML={{__html: content}}></div>
  );
}
