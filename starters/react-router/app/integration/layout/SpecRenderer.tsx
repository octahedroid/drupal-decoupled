import type { Spec } from "@json-render/core";
import { JSONUIProvider, Renderer } from "@json-render/react";
import type { ReactNode } from "react";

import { registry } from "~/integration/resolvers/registry";

interface SpecRendererProps {
  spec: Spec;
}

export function SpecRenderer({ spec }: SpecRendererProps): ReactNode {
  return (
    <JSONUIProvider registry={registry}>
      <Renderer spec={spec} registry={registry} />
    </JSONUIProvider>
  );
}
