import { Client, fetchExchange } from '@urql/core';

interface ClientArgs {
  url: string
  token: string
}

export const getClient = ({url = '', token = ''}: ClientArgs) => {
  return new Client({
    //  "https://dev-drupal-graphql.pantheonsite.io/graphql"
    url,
    fetchOptions: {
      headers: {
        Authorization: token,
      },
    },
    exchanges: [fetchExchange],
  });
}

