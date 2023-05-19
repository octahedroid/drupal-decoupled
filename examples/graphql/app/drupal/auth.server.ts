import drupalAuthClient from "drupal-auth-client"

const getToken = async (context: any) => {
  const client = await drupalAuthClient(
    context.DRUPAL_AUTH_URI,
    "client_credentials",
    {
      clientId: context.DRUPAL_CLIENT_ID,
      clientSecret: context.DRUPAL_CLIENT_SECRET,
    },
    {
      fetcher: fetch,
    }
  )

  return `${client.token_type} ${client.access_token}`
}

export default getToken
