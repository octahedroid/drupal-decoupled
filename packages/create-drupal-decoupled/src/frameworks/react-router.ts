import type { FrameworkAdapter } from "./types";

export const reactRouterAdapter: FrameworkAdapter = {
  name: "react-router",
  displayName: "React Router",
  detectionPackages: {
    devDependencies: ["@react-router/dev"],
  },
  files: [
    {
      targetPath: ".",
      sourcePath: "react-router",
      fileName: ".env.example",
      operation: "create",
    },
    {
      targetPath: ".",
      sourcePath: "react-router",
      fileName: ".env.example",
      rename: ".env",
      operation: "update",
    },
    {
      targetPath: "app/utils",
      sourcePath: "react-router",
      fileName: "calculatePath.ts",
      rename: "routes.ts",
      operation: "create",
    },
    {
      targetPath: "app",
      sourcePath: "react-router",
      fileName: "routes.ts",
      operation: "update",
    },
    {
      targetPath: "app/routes",
      sourcePath: "react-router",
      fileName: "$.tsx",
      operation: "create",
    },
    {
      targetPath: "app/routes",
      fileName: "home.tsx",
      operation: "delete",
    },
    {
      targetPath: "app/utils",
      sourcePath: "react-router",
      fileName: "metatags.ts",
      operation: "create",
    },
  ],
  requiredDependencies: [
    "drupal-decoupled",
    "drupal-auth-client",
    "drupal-vite",
    "@urql/core",
  ],
  requiredDevDependencies: [],
  envGitignorePattern: ".env",
  postScaffoldInstructions: [
    "Add the drupal() plugin to your vite.config.ts:",
    "",
    '  import { drupal } from "drupal-vite";',
    "",
    "  // Add to your plugins array:",
    '  drupal({ drupalUrl: "DRUPAL_AUTH_URI" })',
  ],
};
