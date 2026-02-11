/**
  This file is optional since we are only using the fetch exchange.
  Added to the starter to show how to configure exchanges in a Drupal Vite project.
  You can remove this file if you are not using any other exchanges.
*/

import { fetchExchange } from "@urql/core";
import type { DrupalDecoupledConfig } from "drupal-vite";

export default {
  exchanges: [fetchExchange],
} satisfies DrupalDecoupledConfig;
