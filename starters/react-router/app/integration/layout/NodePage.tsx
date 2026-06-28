import type { Spec } from "@json-render/core";
import type { NodePageResultOf } from "~/graphql/types";
import { SpecRenderer } from "~/integration/layout/SpecRenderer";

interface NodePageProps {
  spec: Spec;
  node: NodePageResultOf;
}

export default function NodePage({ spec, node }: NodePageProps) {
  return (
    <>
      {node.showTitle && (
        <h1 className="container mx-auto text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
          {node.title}
        </h1>
      )}
      <SpecRenderer spec={spec} />
    </>
  );
}
