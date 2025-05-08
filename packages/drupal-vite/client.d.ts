declare module "drupal-vite/client" {
  import type { drupalAuthClient } from "drupal-auth-client";
  import type { Client } from "@urql/core";

  /**
   * Gets the Drupal authentication token and related data
   */
  export function getDrupalAuth(): ReturnType<typeof drupalAuthClient>;

  /**
   * Gets a configured Drupal GraphQL client
   */
  export function getDrupalClient(): Promise<Client>;
}
