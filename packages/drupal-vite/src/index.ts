import path from "path";
import { type Plugin } from "vite";
import fs from "fs";
import { resolveValue } from "./utils";
import type { DrupalPluginOptions } from "./types";

const VIRTUAL_MODULE_ID = "drupal-vite/client";

/**
 * Creates a Vite plugin for Drupal integration
 *
 * @description
 * This plugin provides seamless integration between Vite and Drupal by:
 * - Setting up authentication with Drupal using OAuth
 * - Configuring a GraphQL client for Drupal queries
 * - Managing environment variables and configuration
 * - Exposing helper functions for auth and GraphQL operations
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { defineConfig } from 'vite';
 * import { drupal } from 'drupal-vite';
 *
 * export default defineConfig({
 *   plugins: [
 *     drupal()
 *   ]
 * });
 * ```
 *
 * @example
 * ```ts
 * // vite.config.ts with direct configuration
 * import { defineConfig } from 'vite';
 * import { drupal } from 'drupal-vite';
 *
 * export default defineConfig({
 *   plugins: [
 *     drupal({
 *       drupalUrl: 'https://your-drupal-site.com',
 *       simple_oauth: {
 *         clientID: 'your-client-id',
 *         clientSecret: 'your-client-secret'
 *       },
 *       graphql: {
 *         endpoint: '/graphql'
 *       }
 *     })
 *   ]
 * });
 * ```
 *
 * @example
 * ```ts
 * // vite.config.ts with environment variable references
 * import { defineConfig } from 'vite';
 * import { drupal } from 'drupal-vite';
 *
 * export default defineConfig({
 *   plugins: [
 *     drupal({
 *       drupalUrl: 'DRUPAL_URL', // Will use process.env.DRUPAL_URL
 *       simple_oauth: {
 *         clientID: 'DRUPAL_CLIENT_ID', // Will use process.env.DRUPAL_CLIENT_ID
 *         clientSecret: 'DRUPAL_CLIENT_SECRET' // Will use process.env.DRUPAL_CLIENT_SECRET
 *       }
 *     })
 *   ]
 * });
 * ```
 *
 * @param {DrupalPluginOptions} options - Configuration options for the plugin
 * @returns {Plugin} A Vite plugin instance
 */
export function drupal(options?: DrupalPluginOptions): Plugin {
  const { simple_oauth, graphql, drupalUrl } = options || {};

  const { clientID, clientSecret } = simple_oauth || {};
  const { endpoint = "/graphql" } = graphql || {};

  const resolvedVirtualModuleId = `\0${VIRTUAL_MODULE_ID}`;
  let resolvedClientID: string | undefined;
  let resolvedClientSecret: string | undefined;
  let resolvedDrupalUrl: string | undefined;

  return {
    name: "vite-plugin-drupal-init",
    configResolved(resolvedConfig) {
      const defaultClientId = "DRUPAL_CLIENT_ID";
      const defaultClientSecret = "DRUPAL_CLIENT_SECRET";
      const defaultDrupalUrl = "DRUPAL_URL";

      resolvedClientID = resolveValue(clientID, defaultClientId);
      resolvedClientSecret = resolveValue(clientSecret, defaultClientSecret);
      resolvedDrupalUrl = resolveValue(drupalUrl, defaultDrupalUrl);

      if (!resolvedClientID) {
        console.error(`[drupal-vite] Client ID is not configured.`);
      }
      if (!resolvedClientSecret) {
        console.error(`[drupal-vite] Client Secret is not configured. `);
      }
      if (!resolvedDrupalUrl) {
        console.error(`[drupal-vite] Drupal URL is not configured. '.`);
      }
    },
    resolveId(id) {
      if (
        id === VIRTUAL_MODULE_ID ||
        id === resolvedVirtualModuleId ||
        id.endsWith(VIRTUAL_MODULE_ID)
      ) {
        return resolvedVirtualModuleId;
      }
      return null;
    },

    async load(id) {
      if (!resolvedClientID || !resolvedClientSecret || !resolvedDrupalUrl) {
        this.error(
          "Missing required Drupal configuration. Please check your options or environment variables."
        );
      }

      const sanitizedDrupalUrl = resolvedDrupalUrl.replace(/\/$/, "");
      const fullGraphqlEndpoint = `${sanitizedDrupalUrl}${endpoint}`;

      if (id === resolvedVirtualModuleId || id.includes(VIRTUAL_MODULE_ID)) {
        const hasCustomConfig = fs.existsSync(
          path.resolve(process.cwd(), "drupal-decoupled.config.ts")
        );

        const importLine = hasCustomConfig
          ? `import customConfig from "./drupal-decoupled.config.ts";`
          : "";

        const exchanges = hasCustomConfig
          ? "customConfig.exchanges ?? [fetchExchange]"
          : "[fetchExchange]";

        const module = `
import { drupalAuthClient } from "drupal-auth-client";
import { Client, fetchExchange } from "@urql/core";
${importLine}

export async function getDrupalAuth() {
  return await drupalAuthClient("${sanitizedDrupalUrl}", {
    clientId: "${resolvedClientID}",
    clientSecret: "${resolvedClientSecret}",
  });
}

export async function getDrupalClient() {
  const auth = await getDrupalAuth();
  return new Client({
    url: "${fullGraphqlEndpoint}",
    exchanges: ${exchanges},
    fetchOptions: {
      headers: {
        Authorization: \`\${auth.token_type} \${auth.access_token}\`,
      },
    },
  });
}`;

        return module;
      }
      return null;
    },
  };
}

export type { DrupalViteConfig } from "./types";
