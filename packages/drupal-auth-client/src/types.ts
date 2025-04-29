export type Options = {
  clientId: string;
  clientSecret: string;
};

type ClientCredentialsOAuth = {
  options: Options;
};

export type Auth = ClientCredentialsOAuth;

export type Config = {
  fetcher: typeof fetch;
  authURI?: string;
};

export interface OAuthPayload {
  access_token: string;
  token_type: string;
  expires_in: string;
}
