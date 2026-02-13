import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { drupal } from "drupal-vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const isStorybook = process.argv[1]?.includes("storybook");
export default defineConfig({
  plugins: [
    tailwindcss(),
    !isStorybook && reactRouter(),
    !isStorybook &&
      drupal({
        drupalUrl: "DRUPAL_AUTH_URI",
      }),
    tsconfigPaths(),
  ],
});
