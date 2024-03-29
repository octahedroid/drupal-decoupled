import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphStaticComponentFragment } from "~/graphql/fragments/paragraph";

interface ParagraphStaticComponentProps {
  paragraph: FragmentOf<typeof ParagraphStaticComponentFragment>
}

export default function ParagraphStaticComponent({ paragraph } : ParagraphStaticComponentProps) {
  const { id, component } = readFragment(ParagraphStaticComponentFragment, paragraph);
  const componentMap = {
    'contact': 'Contact',
  }
  
  return (
    <p className="border-y border-neutral-500 p-4 break-words">
      <h2>Render ParagraphStaticComponent</h2>
      <pre>
        {JSON.stringify({ id, component, componentMap }, null, 2)}
      </pre>
    </p>
  );
}
