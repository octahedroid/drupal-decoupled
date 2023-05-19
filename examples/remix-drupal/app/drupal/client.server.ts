import { createClient } from '~/@types/gen'

export const getClient = (token: string, context: any) => {
  return createClient({
    url: context.DRUPAL_GRAPHQL_URI,
    headers: {
      'Authorization': `${token}`,
    },
  })
}
