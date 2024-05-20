import { clientCredentialsHeader, passwordHeader } from "./authHandlers";
import type { Auth, Config, Options } from "./types";

const calculateAuthHeader = async <TAuth extends Auth["token_type"]>(
  uri: string,
  type: TAuth,
  options: Options<TAuth>,
  fetcher: Config["fetcher"]
) => {
  if (type === "client_credentials") {
    const { clientId, clientSecret} =
      options as Options<"client_credentials">;
    const header = await clientCredentialsHeader(
      uri,
      clientId,
      clientSecret,
      fetcher,
    );

    if (header) {
      return header;
    }
  }

  if (type === "password") {
    const { username, password, clientId, clientSecret } =
      options as Options<"password">;
    const header = await passwordHeader(
      uri,
      username,
      password,
      clientId,
      clientSecret,
      fetcher,
    );

    if (header) {
      return header;
    }
  }

  return null;
};

/**
 * Return headers based on the given auth and config
 * @param uri The uri of the drupal site
 * @param auth The auth strategy to use
 * @param options {Config} The auth options
 * @param config The config for the client
 *
 * The type for the options is decided by the auth type
 * @example
 * const client = drupalAuthClient(
 *  "https://drupal.site",
 * "client_credentials",
 *  {
 *    clientId: "client_id",
 *    clientSecret: "client_secret",
 *  },
 * );
 *
 * In the above example, you only need to provide the clientId and clientSecret
 * because the auth type is "client_credentials" but if you set the auth type to
 * "password" you would need to provide the username and password as well.
 *
 * @example
 * const client = drupalAuthClient(
 *  "https://drupal.site",
 *  "password",
 *  {
 *    username: "username",
 *    password: "password",
 *    clientId: "client_id",
 *    clientSecret: "client_secret",
 *   }
 * );
 *
 *
 **/
const drupalAuthClient = async <TAuth extends Auth["token_type"]>(
  uri: string,
  type: TAuth,
  options: Options<TAuth>,
  config: Config = {
    fetcher: fetch,
  }
) => {
  const { fetcher, authURI } = config;

  const url = new URL(uri);
  const formattedAuthURI = authURI ? authURI : `${url.origin}/oauth/token`;

  const header = await calculateAuthHeader(
    formattedAuthURI,
    type,
    options,
    fetcher
  )

  if (!header) {
    throw new Error("Unable to fetch auth header");
  }

  return header;
};

export { drupalAuthClient };

/**
 * @deprecated
 */
export default drupalAuthClient;
