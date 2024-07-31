import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphStaticComponentFragment } from "~/graphql/drupal/fragments/paragraph";

interface ParagraphStaticComponentProps {
  paragraph: FragmentOf<typeof ParagraphStaticComponentFragment>
}

export default function ParagraphStaticComponent({ paragraph } : ParagraphStaticComponentProps) {
  const { id, component } = readFragment(ParagraphStaticComponentFragment, paragraph);
  // @todo: Implement Contact component
  const componentMap = {
    'contact': 'Contact',
  }

  //  @todo: Implement Contact component
  return (
    <>
      <h2>ParagraphStaticComponent</h2>
      <pre>
        {JSON.stringify({ id, component, componentMap }, null, 2)}
      </pre>
    </>
  );
}
