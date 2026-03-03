import { metaTags } from "drupal-decoupled/react-router";
import { isRouteErrorResponse, redirect, useRouteError } from "react-router";
import { gql } from "@urql/core";
import { getDrupalClient } from "drupal-vite/client";
import { calculatePath } from "~/utils/routes";
import { calculateMetaTags } from "~/utils/metatags";
import type { Route } from "./+types/$";

const GET_DRUPAL_CONTENT_ERROR = "Error fetching data from Drupal";

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [];
  }
  const { type, entity } = data;

  return metaTags({
    tags: calculateMetaTags(type, entity),
  });
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const path = params["*"];
  const client = await getDrupalClient();
  const { data, error } = await client.query(
    gql`
      query getContentByPath($path: String!) {
        route(path: $path) {
          ... on RouteInternal {
            entity {
              ... on NodeArticle {
                __typename
                title
                path
                image {
                  url
                  alt
                  width
                  height
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
              ... on NodePage {
                __typename
                title
                path
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
            __typename
            url
            status
          }
        }
      }
    `,
    {
      path: calculatePath({
        path,
        url: request.url,
      }),
    },
  );

  if (error) {
    throw new Response(GET_DRUPAL_CONTENT_ERROR, { status: 500 });
  }

  if (data.route.__typename === "RouteRedirect") {
    return redirect(data.route.url, {
      status: data.route.status || 302,
    });
  }

  return {
    node: data.route.entity,
    type: data.route.entity.__typename,
    entity: data.route.entity,
  };
};

export default function Page({ loaderData: { node } }: Route.ComponentProps) {
  return (
    <div className="container mx-auto">
      <h1 className="text-6xl font-bold tracking-tighter leading-none mb-6 text-left">
        {node.title}
      </h1>
      {node.image && (
        <img
          src={node.image.url}
          alt={node.image.alt}
          width={node.image.width}
          height={node.image.height}
          className="mb-6 mx-auto max-w-lg"
        />
      )}
      {node.body?.value && (
        <div
          className="max-w-sm lg:max-w-4xl mx-auto text-lg"
          dangerouslySetInnerHTML={{ __html: node.body.value }}
        />
      )}
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.data === GET_DRUPAL_CONTENT_ERROR) {
      return (
        <div>
          <p>There was an error fetching the Drupal content.</p>
          <p>
            Make sure that the query in the loader function is correct and the
            fields are enabled in the GraphQL Compose module.
          </p>
        </div>
      );
    }
    return <p>Something went wrong</p>;
  }
  return <p>Something went wrong</p>;
}
