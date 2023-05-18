import { GraphQLClient } from "graphql-request";
import fetch from "cross-fetch";

import { clientCredentialsHeaders, passwordHeaders } from "./authHandlers";
import type { Auth, Config, Options } from "./types";

const calculateAuthHeaders = async <TAuth extends Auth["token_type"]>(
  uri: string,
  type: TAuth,
  options: Options<TAuth>,
  fetcher: Config["fetcher"]
) => {
  if (type === "client_credentials") {
    const { clientId, clientSecret, headerKey } =
      options as Options<"client_credentials">;
    const headers = await clientCredentialsHeaders(
      uri,
      clientId,
      clientSecret,
      fetcher,
      headerKey
    );

    if (headers) {
      return headers;
    }
  }
  if (type === "password") {
    const { username, password, clientId, headerKey, clientSecret } =
      options as Options<"password">;
    const headers = await passwordHeaders(
      uri,
      username,
      password,
      clientId,
      clientSecret,
      fetcher,
      headerKey
    );

    if (headers) {
      return headers;
    }
  }
  if (type === "token") {
    const { type: tokenType, value, headerKey } = options as Options<"token">;
    const headerKeyName = headerKey ? headerKey : "Authorization";

    return {
      [headerKeyName]: tokenType ? `${tokenType} ${value}` : value,
    };
  }
};

/**
 * Generate a drupal client with the given auth and config
 * @param uri The uri of the drupal site
 * @param auth The auth strategy to use
 * @param options {Config} The auth options
 * @param config The config for the client
 *
 * The type for the options is decided by the auth type
 * @example
 * const client = drupalClient(
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
 * const client = drupalClient(
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
const drupalGraphqlClient = async <TAuth extends Auth["token_type"]>(
  uri: string,
  type: TAuth,
  options: Options<TAuth>,
  config: Config = {
    fetcher: fetch,
  }
) => {
  const { fetcher, authURI } = config;

  const url = new URL(uri);
  const formattedAuthURI = `${authURI ? authURI : url.origin}/oauth/token`;
  const headers = await calculateAuthHeaders(
    formattedAuthURI,
    type,
    options,
    fetcher
  );
  if (!headers) {
    throw new Error("Unable to fetch auth headers");
  }

  const client = new GraphQLClient(uri, {
    fetch: fetcher,
    headers,
  });

  return client;
};

export default drupalGraphqlClient;
