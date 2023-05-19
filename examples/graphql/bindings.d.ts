export {}

// ENV values from wrangler.toml
declare global {
  const DRUPAL_GRAPHQL_URI: string;
  const DRUPAL_AUTH_URI: string;
  const DRUPAL_CLIENT_ID: string;
  const DRUPAL_CLIENT_SECRET: string;

  const ENVIRONMENT: string;
}