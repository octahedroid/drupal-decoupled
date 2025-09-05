import { Client, fetchExchange } from '@urql/core'
import { getToken } from './auth'


export const getClient = async () => {
  const token = await getToken({
    uri: process.env.DRUPAL_AUTH_URI!,
    clientId: process.env.DRUPAL_CLIENT_ID!,
    clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
  })
  return new Client({
    url:process.env.DRUPAL_GRAPHQL_URI!,
    fetchOptions: {
      headers: {
        Authorization: token,
      },
    },
    exchanges: [fetchExchange],
  })
}
