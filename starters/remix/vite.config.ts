import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from 'vite-plugin-node-polyfills'

import { getLoadContext } from "./load-context";

const isStorybook = process.argv[1]?.includes("storybook");
export default defineConfig({
  plugins: [
    !isStorybook && remix(),
    remixCloudflareDevProxy({ getLoadContext }),
    tsconfigPaths(),
    nodePolyfills({ include: ['crypto'] }),
  ],
}); 
