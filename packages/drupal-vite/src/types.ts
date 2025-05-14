import type { Exchange } from "@urql/core";

export interface DrupalViteConfig {
  /** Custom exchanges for the GraphQL client */
  exchanges?: Exchange[];
}

/**
 * Options for the Drupal Simple OAuth plugin
 * @interface DrupalSimpleOAuthPluginOptions
 */
export interface DrupalSimpleOAuthPluginOptions {
  /** 
   * Client ID for Drupal OAuth authentication 
   * Can be a direct value or an environment variable name
   */
  clientID?: string;
  /** 
   * Client secret for Drupal OAuth authentication 
   * Can be a direct value or an environment variable name
   */
  clientSecret?: string;
}

/**
 * GraphQL configuration options
 * @interface DrupalGraphQLOptions
 */
export interface DrupalGraphQLOptions {
  /** GraphQL endpoint path (defaults to /graphql) */
  endpoint?: string;
}

/**
 * Configuration options for the Drupal Vite plugin
 * @interface DrupalPluginOptions
 */
export interface DrupalPluginOptions {
  /** 
   * Base URL of the Drupal instance
   * Can be a direct value or an environment variable name 
   */
  drupalUrl?: string;
  /** Options for the Simple OAuth plugin */
  simple_oauth?: DrupalSimpleOAuthPluginOptions;
  /** GraphQL configuration options */
  graphql?: DrupalGraphQLOptions;
}
