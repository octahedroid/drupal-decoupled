import { Client, fetchExchange } from '@urql/core';

export const getClient = () => {
  return new Client({
    url: "https://dev-drupal-graphql.pantheonsite.io/graphql",
    fetchOptions: {
      headers: {
        Authorization: `zlawHG_38Vh2z0FzqZZ5n68VStVhvPlgDvvSXd8IG7c`,
      },
    },
    exchanges: [fetchExchange],
  });
}

