import { Fragment } from "react";
import type { NodeArticle } from '~/@types/gen/schema';
import Cover from "~/components/Cover";
import { componentResolver } from "~/components/helpers/componentResolver";

export default function NodeArticleComponent({ node }: { node: NodeArticle }) {
  const components = componentResolver(node.components) as [];

  return (
    <>
      <Cover
        title={node.title}
        image={node?.image}
        // date={node.created}
        author={node.author}
      />
      {components.map((component: any, index: number) => {
        return <Fragment key={index}>{component}</Fragment>;
      })}
    </>
  );
}
