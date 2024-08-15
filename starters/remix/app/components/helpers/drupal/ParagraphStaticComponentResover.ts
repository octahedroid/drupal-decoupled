import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphStaticComponentFragment } from "~/graphql/drupal/fragments/paragraph";

interface ParagraphStaticComponentProps {
  paragraph: FragmentOf<typeof ParagraphStaticComponentFragment>
}

export const ParagraphStaticComponentResolver = ({ paragraph } : ParagraphStaticComponentProps) => {
  const { id, component } = readFragment(ParagraphStaticComponentFragment, paragraph);

  // @todo: Implement Contact component
  const componentMap = {
    'contact': 'Contact',
  }

  return {
    id,
    component: component ? componentMap[component] : component,
  }
}
