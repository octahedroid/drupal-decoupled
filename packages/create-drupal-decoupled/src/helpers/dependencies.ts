import fs from "node:fs";
import path from "node:path";
import type { FrameworkAdapter } from "../frameworks/types";

export function detectPackageManager(
  projectPath: string,
): "pnpm" | "yarn" | "bun" | "npm" {
  if (fs.existsSync(path.join(projectPath, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (fs.existsSync(path.join(projectPath, "yarn.lock"))) {
    return "yarn";
  }
  if (
    fs.existsSync(path.join(projectPath, "bun.lockb")) ||
    fs.existsSync(path.join(projectPath, "bun.lock"))
  ) {
    return "bun";
  }
  return "npm";
}

export function getDependencyInstallCommand(
  adapter: FrameworkAdapter,
  projectPath: string,
): string {
  const pm = detectPackageManager(projectPath);
  const deps = [
    ...adapter.requiredDependencies,
    ...adapter.requiredDevDependencies.map((d) => `-D ${d}`),
  ];

  const addCmd = pm === "npm" ? "install" : "add";
  return `${pm} ${addCmd} ${deps.join(" ")}`;
}
