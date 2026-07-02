import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    globals: true,
    include: ["app/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/build/**", "**/.react-router/**"],
    restoreMocks: true,
    clearMocks: true,
  },
});
