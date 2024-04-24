import { Fragment } from "react";
import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import Cover from "@/components/Cover";
import { resolve } from "@/components/helpers/ComponentResolver";

type NodeArticleComponentProps = {
  node: FragmentOf<typeof NodeArticleFragment>;
  environment: string;
}

export default function NodeArticleComponent({ node, environment }: NodeArticleComponentProps) {
  const nodeArticle = readFragment(NodeArticleFragment, node);
  const components = resolve({
    data: nodeArticle.components,
    environment,
  });

  return (
    <>
      <Cover
        title={nodeArticle.title}
        image={nodeArticle.image}
        author={nodeArticle.author}
      />
      {components.map((component, index: number) => {
        return <Fragment key={index}>{component}</Fragment>;
      })}
    </>
  );
}
