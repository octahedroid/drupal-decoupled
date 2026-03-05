import type { FrameworkAdapter } from "./types";

export const nextAdapter: FrameworkAdapter = {
  name: "next",
  displayName: "Next.js",
  detectionPackages: {
    dependencies: ["next"],
  },
  files: [
    {
      targetPath: ".",
      sourcePath: "next",
      fileName: ".env.example",
      operation: "create",
    },
    {
      targetPath: ".",
      sourcePath: "next",
      fileName: ".env.example",
      rename: ".env.local",
      operation: "update",
    },
    {
      targetPath: "utils",
      sourcePath: "next",
      fileName: "auth.ts",
      operation: "create",
    },
    {
      targetPath: "utils",
      sourcePath: "next",
      fileName: "client.ts",
      operation: "create",
    },
    {
      targetPath: "utils",
      sourcePath: "next",
      fileName: "calculate-path.ts",
      rename: "routes.ts",
      operation: "create",
    },
    {
      targetPath: "app/[[...slug]]",
      sourcePath: "next",
      fileName: "page.tsx",
      operation: "create",
    },
    {
      targetPath: "app",
      fileName: "page.tsx",
      operation: "delete",
    },
    {
      targetPath: "utils",
      sourcePath: "next",
      fileName: "metatags.ts",
      operation: "create",
    },
  ],
  requiredDependencies: [
    "drupal-decoupled",
    "drupal-auth-client",
    "@urql/core",
  ],
  requiredDevDependencies: [],
  envGitignorePattern: ".env*",
  postScaffoldInstructions: [
    "Configure your environment variables in .env.local",
  ],
};
