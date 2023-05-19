import { generate } from '@genql/cli'
import path from 'path'
import * as dotenv from 'dotenv'

import drupalAuthClient from "drupal-auth-client"

(async () => {
  // Load environment variables from .env.development file
  const envPath = path.join(__dirname, '../.dev.vars')
  dotenv.config({ path: envPath })

  // Call drupalAuthClient to get a header token
  const authClient = await drupalAuthClient(
    process.env.DRUPAL_AUTH_URI!,
    "client_credentials",
    {
      clientId: process.env.DRUPAL_CLIENT_ID!,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
    },
  );

  generate({
    endpoint:  process.env.DRUPAL_GRAPHQL_URI,
    headers: {
      'Authorization': `${authClient.token_type} ${authClient.access_token}`,
    },
    output: path.join(__dirname, '../app/@types/gen'),
  }).catch((reason) => {
    console.log(reason)
  })

})();





