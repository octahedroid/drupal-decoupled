import type { Config, OAuthPayload } from "./types";

export const clientCredentialsHeader = async (
  authUri: string,
  clientId: string,
  clientSecret: string,
  fetcher: Config["fetcher"],
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
    return await response.json() as OAuthPayload;
  }

  return null;
};

export const passwordHeader = async (
  authUri: string,
  username: string,
  password: string,
  clientId: string,
  clientSecret: string,
  fetcher: Config["fetcher"],
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
    return await response.json() as OAuthPayload;
  }

  return null;
};
