import { Client, fetchExchange } from "@urql/core";
import { getToken } from "./auth.server";

interface ClientArgs {
  url: string;
  auth: {
    uri: string;
    clientId: string;
    clientSecret: string;
  };
}

export const getClient = async ({ url, auth }: ClientArgs) => {
  const token = await getToken(auth);

  return new Client({
    url,
    fetchOptions: {
      headers: {
        Authorization: token,
      },
    },
    exchanges: [fetchExchange],
  });
};
