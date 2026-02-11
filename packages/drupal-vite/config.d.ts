declare module "drupal-vite/user" {
  import type { Exchange } from "@urql/core";

  const config: {
    exchanges?: Exchange[];
  };

  export default config;
}
