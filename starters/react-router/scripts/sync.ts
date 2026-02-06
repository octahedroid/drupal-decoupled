import path from "node:path";
import {
  generateOutput,
  generateSchema,
  generateTurbo,
} from "@gql.tada/cli-utils";
import * as dotenv from "dotenv";
import { drupalAuthClient } from "drupal-auth-client";

(async () => {
  const envPath = path.join(process.cwd(), ".env");
  dotenv.config({ path: envPath });

  const authClient = await drupalAuthClient(process.env.DRUPAL_AUTH_URI!, {
    clientId: process.env.DRUPAL_CLIENT_ID!,
    clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
  });

  console.log("\n🚀 Generating GraphQL Schema");
  await generateSchema({
    input: process.env.DRUPAL_GRAPHQL_URI!,
    output: undefined,
    headers: {
      Authorization: `${authClient.token_type} ${authClient.access_token}`,
    },
    tsconfig: undefined,
  });

  console.log("\n🚀 Generating Types");
  await generateOutput({
    output: undefined,
    disablePreprocessing: false,
    tsconfig: undefined,
  });

  console.log("\n🚀 Generating Cache");
  await generateTurbo({
    output: undefined,
    failOnWarn: false,
    tsconfig: undefined,
  });
})();
