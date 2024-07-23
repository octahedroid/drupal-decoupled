import {
  isRouteErrorResponse,
  useRouteError,
  useLoaderData,
} from '@remix-run/react'
import { LoaderFunctionArgs } from '@remix-run/node'
import { gql } from 'urql'

import { getDrupalClient } from '~/utils/drupal-client.server'

const GET_DRUPAL_CONTENT_ERROR = 'Error fetching data from Drupal'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const path = params['*']
  const drupalClient = await getDrupalClient()
  const { data, error } = await drupalClient.query(
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

  if (error) {
    throw new Response(GET_DRUPAL_CONTENT_ERROR, { status: 500 })
  }

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

export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    if (error.data === GET_DRUPAL_CONTENT_ERROR) {
      return (
        <div className='p-4 text-center'>
          <p>There was an error fetching the Drupal content</p>
          <p>
            Hint: Make sure that the query in the loader function is correct and
            the fields are enabled in the GraphQL Compose module
          </p>
        </div>
      )
    }
    return <p>Uh oh, something went wrong</p>
  }
  return <p>Uh oh, something went wrong</p>
}
