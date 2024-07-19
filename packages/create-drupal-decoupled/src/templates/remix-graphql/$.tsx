import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { gql } from 'urql'

import { getDrupalClient } from '~/utils/drupal-client.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const path = params['*']
  const drupalClient = await getDrupalClient()
  const { data } = await drupalClient.query(
    gql`
      query getNodeArticleByPath($path: String!) {
        route(path: $path) {
          ... on RouteInternal {
            entity {
              ... on NodeArticle {
                title
                path
                body {
                  value
                }
              }
            }
          }
        }
      }
    `,
    {
      path,
    }
  )

  return { data }
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>()
  return (
    <div>
      <h1 className="text-3xl">{data.route.entity.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.route.entity.body.value }} />
    </div>
  )
}
