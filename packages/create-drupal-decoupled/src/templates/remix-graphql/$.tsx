import {
  isRouteErrorResponse,
  useRouteError,
  useLoaderData,
  MetaFunction,
} from '@remix-run/react'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { gql } from 'urql'
import { metaTags } from 'drupal-remix'

import { getDrupalClient } from '~/utils/drupal-client.server'

const GET_DRUPAL_CONTENT_ERROR = 'Error fetching data from Drupal'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return []
  }

  return metaTags({
    tags: data.node.metatag,
  })
}

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
                image {
                  url
                  alt
                }
                body {
                  value
                }
                metatag {
                  __typename
                  ... on MetaTagLink {
                    attributes {
                      rel
                      href
                    }
                  }
                  ... on MetaTagValue {
                    attributes {
                      name
                      content
                    }
                  }
                  ... on MetaTagProperty {
                    attributes {
                      property
                      content
                    }
                  }
                }
              }
            }
          }
          ... on RouteRedirect {
            url
            status
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

  if (data.route.__typename === 'RouteRedirect') {
    return redirect(data.route.url, {
      status: data.route.status || 302,
    })
  }

  return { node: data.route.entity }
}

export default function Index() {
  const { node } = useLoaderData<typeof loader>()
  return (
    <div className="container mx-auto">
      <h1 className="text-6xl font-bold tracking-tighter leading-none mb-6 text-left">
        {node.title}
      </h1>
      {node.image && (
        <img
          src={node.image.url}
          alt={node.image.alt}
          className="mb-6 mx-auto max-w-lg"
        />
      )}
      <div
        className="max-w-sm lg:max-w-4xl mx-auto text-lg"
        dangerouslySetInnerHTML={{ __html: node.body.value }}
      />
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    if (error.data === GET_DRUPAL_CONTENT_ERROR) {
      return (
        <div className="p-4 text-center">
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
