import { drupalAuthClient } from 'drupal-auth-client'
import { Client, fetchExchange } from '@urql/core'

export const getDrupalClient = async () => {
  const { token_type, access_token } = await drupalAuthClient(
    process.env.DRUPAL_AUTH_URI as string,
    'client_credentials',
    {
      clientId: process.env.DRUPAL_CLIENT_ID as string,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET as string,
    }
  )
  const authorizationHeader = `${token_type} ${access_token}`

  return new Client({
    url: process.env.DRUPAL_GRAPHQL_URI as string,
    fetchOptions: {
      headers: {
        Authorization: authorizationHeader,
      },
    },
    exchanges: [fetchExchange],
  })
}
