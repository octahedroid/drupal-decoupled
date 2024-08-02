import { redirect } from "next/navigation";

import { getDrupalClient } from "@/utils/drupal/client";
import { gql } from "urql";
import { calculatePath } from "@/utils/drupal/calculate-path";

async function getDrupalData({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: Record<string, string>;
}) {
  const GET_DRUPAL_CONTENT_ERROR = "Error fetching data from Drupal";

  const pathFromParams = params.slug?.join("/");

  const drupalClient = await getDrupalClient();
  const { data, error } = await drupalClient.query(
    gql`
      query getNodeArticleByPath($path: String!) {
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
        path: pathFromParams,
        token: searchParams?.token,
      }),
    }
  );

  if (error) {
    throw new Response(GET_DRUPAL_CONTENT_ERROR, { status: 500 });
  }

  if (data.route.__typename === "RouteRedirect") {
    return redirect(data.route.url);
  }

  return { node: data.route.entity };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: Record<string, string>;
}) {
  const { node } = await getDrupalData({ params, searchParams });

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
      <div
        className="max-w-sm lg:max-w-4xl mx-auto text-lg"
        dangerouslySetInnerHTML={{ __html: node.body.value }}
      />
    </div>
  );
}
