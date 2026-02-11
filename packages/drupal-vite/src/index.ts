import { existsSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";
import type { DrupalPluginOptions } from "./types";
import { resolveValue } from "./utils";

export type { DrupalDecoupledConfig } from "./types";

const VIRTUAL_MODULE_ID = "drupal-vite/client";
const VIRTUAL_CONFIG_MODULE_ID = "drupal-vite/config";

/**
 * Creates a Vite plugin for Drupal integration
 */
export function drupal(options?: DrupalPluginOptions): Plugin {
  const { simple_oauth, graphql, drupalUrl } = options || {};

  const { clientID, clientSecret } = simple_oauth || {};
  const { endpoint = "/graphql" } = graphql || {};

  const resolvedVirtualModuleId = `\0${VIRTUAL_MODULE_ID}`;
  const resolvedVirtualConfigModuleId = `\0${VIRTUAL_CONFIG_MODULE_ID}`;

  let resolvedClientID: string | undefined;
  let resolvedClientSecret: string | undefined;
  let resolvedDrupalUrl: string | undefined;

  return {
    name: "vite-plugin-drupal-init",

    async configResolved() {
      const defaultClientId = "DRUPAL_CLIENT_ID";
      const defaultClientSecret = "DRUPAL_CLIENT_SECRET";
      const defaultDrupalUrl = "DRUPAL_URL";

      resolvedClientID = await resolveValue(clientID, defaultClientId);
      resolvedClientSecret = await resolveValue(
        clientSecret,
        defaultClientSecret,
      );
      resolvedDrupalUrl = await resolveValue(drupalUrl, defaultDrupalUrl);

      if (!resolvedClientID) {
        console.error(`[drupal-vite] Client ID is not configured.`);
      }
      if (!resolvedClientSecret) {
        console.error(`[drupal-vite] Client Secret is not configured.`);
      }
      if (!resolvedDrupalUrl) {
        console.error(`[drupal-vite] Drupal URL is not configured.`);
      }
    },

    resolveId(id) {
      if (
        id === VIRTUAL_CONFIG_MODULE_ID ||
        id === resolvedVirtualConfigModuleId ||
        id.endsWith(VIRTUAL_CONFIG_MODULE_ID)
      ) {
        return resolvedVirtualConfigModuleId;
      }

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
          "Missing required Drupal configuration. Please check your options or environment variables.",
        );
      }

      const sanitizedDrupalUrl = resolvedDrupalUrl.replace(/\/$/, "");
      const fullGraphqlEndpoint = `${sanitizedDrupalUrl}${endpoint}`;

      // ---- user config virtual module
      if (id === resolvedVirtualConfigModuleId) {
        const configPath = resolve(process.cwd(), "drupal-decoupled.config.ts");
        if (existsSync(configPath)) {
          return `import userConfig from ${JSON.stringify(configPath)};
                  export default userConfig;`;
        }
        return `export default {};`;
      }

      // ---- client virtual module
      if (id === resolvedVirtualModuleId) {
        return `
import { drupalAuthClient } from "drupal-auth-client";
import { Client, fetchExchange } from "@urql/core";
import { default as config } from "${resolvedVirtualConfigModuleId}";

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
    exchanges: config.exchanges ? config.exchanges : [fetchExchange],
    fetchOptions: {
      headers: {
        Authorization: \`\${auth.token_type} \${auth.access_token}\`,
      },
    },
  });
}`;
      }
      return null;
    },
  };
}

export type { DrupalPluginOptions } from "./types";
