import { Fragment } from "react";
import type { NodeArticle } from '~/@types/gen/schema';
import Cover from "~/components/Cover";
import { componentResolver } from "~/components/helpers/componentResolver";

export default function NodeArticleComponent({ node, environment }: { node: NodeArticle, environment: string }) {
  const components = componentResolver(node.components, environment) as [];

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
