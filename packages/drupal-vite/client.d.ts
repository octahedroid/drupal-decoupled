declare module "drupal-vite/client" {
  import type { drupalAuthClient } from "drupal-auth-client";
  import type { Client } from "@urql/core";

  /**
   * Gets the Drupal authentication token and related data
   * 
   * @returns A promise resolving to the Drupal auth data
   */
  export function getDrupalAuth(): ReturnType<typeof drupalAuthClient>;

  /**
   * Gets a configured Drupal GraphQL client with authentication
   * Uses any custom configuration from drupal-decoupled.config.ts if available
   * 
   * @returns A promise resolving to a configured URQL Client for Drupal
   */
  export function getDrupalClient(): Promise<Client>;
}
