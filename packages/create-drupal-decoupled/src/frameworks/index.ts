import { nextAdapter } from "./next";
import { reactRouterAdapter } from "./react-router";
import type { FrameworkAdapter } from "./types";

const adapters: Record<string, FrameworkAdapter> = {
  next: nextAdapter,
  "react-router": reactRouterAdapter,
};

export const SUPPORTED_FRONTENDS = Object.keys(adapters);

export type SupportedFrontend = keyof typeof adapters;

export function getAdapter(name: SupportedFrontend): FrameworkAdapter {
  return adapters[name];
}

export function isSupportedFrontend(
  frontend: string,
): frontend is SupportedFrontend {
  return frontend in adapters;
}

export function getFrontendReadableName(frontend: string): string {
  return adapters[frontend]?.displayName ?? frontend;
}
