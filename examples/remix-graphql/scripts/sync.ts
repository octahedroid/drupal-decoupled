import path from "path";
import * as dotenv from "dotenv";
import { drupalAuthClient } from "drupal-auth-client";
import { execSync } from "node:child_process";

(async () => {
  const envPath = path.join(process.cwd(), ".dev.vars");

  dotenv.config({ path: envPath });

  const authClient = await drupalAuthClient(
    process.env.DRUPAL_AUTH_URI!,
    "client_credentials",
    {
      clientId: process.env.DRUPAL_CLIENT_ID!,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
    }
  );

  const commands = [
    {
      title: '🚀  Dowloading GraphQL Schema ...',
      executable: `gql.tada generate-schema ${process.env.DRUPAL_GRAPHQL_URI!} --header=Authorization:"${authClient.token_type} ${authClient.access_token}"`
    },
    {
      title: '🚀  Generating Types ...',
      executable: `gql.tada generate-output`,
    },
    {
      title: '🚀  Generating Cache ...',
      executable: `gql.tada turbo`,
    }
  ]

  for (const command of commands) {
    console.log(`\n${command.title}`);
    execSync(command.executable, { stdio: 'inherit' });
  }

})();
