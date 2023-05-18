import FormData from "form-data";
import type { Config, OAuthPayload } from "./types";

const parseOAuthPayload = async (response: any, headerKey?: string) => {
  const json = await response.json();
  const { access_token, token_type } = json as OAuthPayload;

  const headerKeyName = headerKey ? headerKey : "Authorization";
  return {
    [headerKeyName]: `${token_type} ${access_token}`,
  };
};

export const clientCredentialsHeaders = async (
  authUri: string,
  clientId: string,
  clientSecret: string,
  fetcher: Config["fetcher"],
  headerKey?: string
) => {
  const formData = new FormData();
  formData.append("grant_type", "client_credentials");
  formData.append("client_id", clientId);
  formData.append("client_secret", clientSecret);

  const response = await fetcher(authUri, {
    method: "post",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  if (response.ok) {
    return await parseOAuthPayload(response, headerKey);
  }

  return false;
};

export const passwordHeaders = async (
  authUri: string,
  username: string,
  password: string,
  clientId: string,
  clientSecret: string,
  fetcher: Config["fetcher"],
  headerKey?: string
) => {
  const formData = new FormData();
  formData.append("grant_type", "password");
  formData.append("client_id", clientId);
  formData.append("client_secret", clientSecret);
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetcher(authUri, {
    method: "post",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });

  if (response.ok) {
    return await parseOAuthPayload(response, headerKey);
  }

  return false;
};
