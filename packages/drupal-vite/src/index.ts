import { loadEnv, type Plugin, type ResolvedConfig } from "vite";
import * as path from "node:path";
import * as fs from "node:fs";

/**
 * Configuration options for the Drupal Vite plugin
 * @interface DrupalPluginOptions
 */
export interface DrupalPluginOptions {
  /** Client ID for Drupal OAuth authentication */
  clientID?: string;
  /** Client secret for Drupal OAuth authentication */
  clientSecret?: string;
  /** Base URL of the Drupal instance */
  drupalUrl?: string;
  /** Environment variable key for client ID (defaults to DRUPAL_CLIENT_ID) */
  clientIDKey?: string;
  /** Environment variable key for Drupal URL (defaults to DRUPAL_AUTH_URI) */
  drupalUrlKey?: string;
  /** Environment variable key for client secret (defaults to DRUPAL_CLIENT_SECRET) */
  clientSecretKey?: string;
  /** GraphQL endpoint path (defaults to /graphql) */
  graphqlEndpoint?: string;
  /** Output directory for generated files (defaults to .drupal) */
  outputDir?: string;
  /** Array of component paths to be processed */
  components?: string[];
}

const VIRTUAL_MODULE_ID = "drupal-vite/client";

/**
 * Creates a Vite plugin for Drupal integration
 *
 * @description
 * This plugin provides seamless integration between Vite and Drupal by:
 * - Setting up authentication with Drupal using OAuth
 * - Configuring a GraphQL client for Drupal queries
 * - Managing environment variables and configuration
 * - Generating necessary helper files
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
 * // vite.config.ts
 * import { defineConfig } from 'vite';
 * import { drupal } from 'drupal-vite';
 *
 * export default defineConfig({
 *   plugins: [
 *     drupal({
 *       drupalUrl: 'https://your-drupal-site.com',
 *       clientID: 'your-client-id',
 *       clientSecret: 'your-client-secret'
 *     })
 *   ]
 * });
 * ```
 *
 * @abstraction
 * This plugin abstracts the complexity of setting up a Drupal client and
 * managing authentication, allowing developers to focus on building
 *
 * @param {DrupalPluginOptions} options - Configuration options for the plugin
 * @returns {Plugin} A Vite plugin instance
 */
export function drupal(options: DrupalPluginOptions = {}): Plugin {
  const {
    clientID,
    clientSecret,
    drupalUrl,
    clientIDKey,
    drupalUrlKey,
    clientSecretKey,
    graphqlEndpoint = "/graphql",
    outputDir = ".drupal",
  } = options;
  const resolvedVirtualModuleId = `\0${VIRTUAL_MODULE_ID}`;
  let resolvedClientID: string | undefined;
  let resolvedClientSecret: string | undefined;
  let resolvedDrupalUrl: string | undefined;

  let config: ResolvedConfig;

  // Function to generate helper files
  const generateFiles = () => {
    const projectRoot = config.root;
    const genOutputDir = path.resolve(projectRoot, outputDir);
    if (!fs.existsSync(genOutputDir)) {
      fs.mkdirSync(genOutputDir, { recursive: true });
    }
  };

  return {
    name: "vite-plugin-drupal-init",
    configResolved(resolvedConfig) {
      // const env = loadEnv(resolvedConfig.mode, process.cwd(), "");

      const clientIDEnvKey = clientIDKey || "DRUPAL_CLIENT_ID";
      const clientSecretEnvKey = clientSecretKey || "DRUPAL_CLIENT_SECRET";
      // @TODO: Should we rename this to DRUPAL_URI | DRUPAL_URL?
      const drupalUrlEnvKey = drupalUrlKey || "DRUPAL_AUTH_URI";

      resolvedClientID = clientID ?? process.env[clientIDEnvKey];
      resolvedClientSecret = clientSecret ?? process.env[clientSecretEnvKey];
      resolvedDrupalUrl = drupalUrl ?? process.env[drupalUrlEnvKey];

      if (!resolvedClientID) {
        console.error(
          `[drupal-vite] Client ID is not configured. Searched for option 'clientID' or env var '${clientIDKey}'.`
        );
      }
      if (!resolvedClientSecret) {
        console.error(
          `[drupal-vite] Client Secret is not configured. Searched for option 'clientSecret' or env var '${clientSecretKey}'.`
        );
      }
      if (!resolvedDrupalUrl) {
        console.error(
          `[drupal-vite] Drupal URL is not configured. Searched for option 'drupalUrl' or env var '${drupalUrlKey}'.`
        );
      }
      config = resolvedConfig;
    },
    buildStart() {
      if (!fs.existsSync(path.resolve(config.root, outputDir))) {
        generateFiles();
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
      const fullGraphqlEndpoint = `${sanitizedDrupalUrl}${graphqlEndpoint}`;

      if (id === resolvedVirtualModuleId || id.includes(VIRTUAL_MODULE_ID)) {
        return `
import { drupalAuthClient } from "drupal-auth-client";
import { Client, cacheExchange, fetchExchange } from "@urql/core";

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
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
      headers: {
        Authorization: \`\${auth.token_type} \${auth.access_token}\`,
      },
    },
  });
}
          `;
      }
      return null;
    },
  };
}
