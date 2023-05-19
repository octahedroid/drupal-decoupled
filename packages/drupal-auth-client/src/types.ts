type ClientOptions = {
  clientId: string;
  clientSecret: string;
};

type ClientCredentialsOAuth = {
  token_type: "client_credentials";
  options: ClientOptions;
};

type PasswordOAuth = {
  token_type: "password";
  options: {
    username: string;
    password: string;
  } & ClientOptions;
};

export type Auth = ClientCredentialsOAuth | PasswordOAuth;

export type Options<TConfig extends Auth["token_type"]> = Extract<
  Auth,
  { token_type: TConfig }
>["options"];

export type Config = {
  fetcher: any;
  authURI?: string;
};

export interface OAuthPayload {
  access_token: string;
  token_type: string;
  expires_in: string;
}
