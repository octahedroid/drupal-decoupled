import { Fragment } from "react";
import { FragmentOf, readFragment } from "gql.tada";
import { NodePageFragment } from "@/graphql/fragments/node";
import Heading from "@/components/ui/Heading";
import { resolve } from "@/components/helpers/ComponentResolver";
import { ComponentRenderer } from "@/components/helpers/ComponentRenderer";

type NodePageComponentProps = {
  node: FragmentOf<typeof NodePageFragment>;
  environment: string;
}

export default function NodePageComponent({ node, environment } : NodePageComponentProps) {
  const { id, showTitle, title, components: nodePageComponents  } = readFragment(NodePageFragment, node);
  const components = resolve({
    data: nodePageComponents,
  });

  return (
    <>
      {showTitle && <Heading level="h1">{title}</Heading>}
      <ComponentRenderer key={id} components={components} environment={environment} />
    </>
  );
}
