import { Fragment } from "react";
import type { NodePage } from '~/@types/gen/schema';
import Title from "~/components/field/Title";
import { componentResolver } from "~/components/helpers/componentResolver";

export default function NodePageComponent({ node }: { node: NodePage }) {
  const components = componentResolver(node.components) as [];

  return (
    <>
      { node.showTitle && <Title>{node.title}</Title>}
      {components.map((component: any, index: number) => {
        return <Fragment key={index}>{component}</Fragment>;
      })}
    </>
  );
}
