import type { Spec } from "@json-render/core";
import { JSONUIProvider, Renderer } from "@json-render/react";
import type { ReactNode } from "react";

import { registry } from "~/integration/resolvers/registry";

interface SpecRendererProps {
  spec: Spec;
  loading?: boolean;
}

export function SpecRenderer({ spec, loading }: SpecRendererProps): ReactNode {
  return (
    <JSONUIProvider registry={registry}>
      <Renderer spec={spec} registry={registry} loading={loading} />
    </JSONUIProvider>
  );
}
