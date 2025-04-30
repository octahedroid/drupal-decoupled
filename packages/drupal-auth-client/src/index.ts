import { clientCredentialsHeader } from "./authHandlers";
import type { Config, Options } from "./types";

const calculateAuthHeader = async (
  uri: string,
  options: Options,
  fetcher: Config["fetcher"]
) => {
  const { clientId, clientSecret } = options;
  const header = await clientCredentialsHeader(
    uri,
    clientId,
    clientSecret,
    fetcher
  );

  if (header) {
    return header;
  }
};

/**
 * Return headers based on the given auth and config
 * @param uri The uri of the drupal site
 * @param options {Config} The auth options
 * @param config The config for the client
 *
 * The type for the options is decided by the auth type
 * @example
 * const client = drupalAuthClient(
 *  "https://drupal.site",
 *  {
 *    clientId: "client_id",
 *    clientSecret: "client_secret",
 *  },
 * );
 **/
const drupalAuthClient = async (
  uri: string,
  options: Options,
  config: Config = {
    fetcher: fetch,
  }
) => {
  const { fetcher, authURI } = config;

  const url = new URL(uri);
  const formattedAuthURI = authURI ? authURI : `${url.origin}/oauth/token`;

  const header = await calculateAuthHeader(formattedAuthURI, options, fetcher);

  if (!header) {
    throw new Error("Unable to fetch auth header");
  }

  return header;
};

export { drupalAuthClient };
