import { drupalAuthClient } from "drupal-auth-client";

interface TokenArgs {
  uri: string
  clientId: string
  clientSecret: string
}

export const getToken = async ({uri, clientId, clientSecret}: TokenArgs) => {
  const client = await drupalAuthClient(
    uri,
    "client_credentials",
    {
      clientId,
      clientSecret,
    }
  );

  return `${client.token_type} ${client.access_token}`;
};
