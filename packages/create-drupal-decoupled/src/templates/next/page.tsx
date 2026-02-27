import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";
import { gql } from "@urql/core";
import { calculatePath } from "@/utils/routes";
import { getClient } from "@/utils/client";
import { calculateMetaTags } from "@/utils/metatags";

const getDrupalData = cache(
  async ({
    params,
    searchParams,
  }: {
    params: { slug: string[] };
    searchParams: Record<string, string>;
  }) => {
    const pathFromParams = params.slug?.join("/");

    const client = await getClient({
      url: process.env.DRUPAL_GRAPHQL_URI ?? "",
      auth: {
        uri: process.env.DRUPAL_AUTH_URI ?? "",
        clientId: process.env.DRUPAL_CLIENT_ID ?? "",
        clientSecret: process.env.DRUPAL_CLIENT_SECRET ?? "",
      },
    });

    const { data, error } = await client.query(
      gql`
        query getContentByPath($path: String!) {
          route(path: $path) {
            ... on RouteInternal {
              entity {
              ... on NodePage {
                __typename
                title
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
      },
    );

    if (error) {
      throw new Error("Error fetching data from Drupal");
    }

    if (data.route.__typename === "RouteRedirect") {
      return redirect(data.route.url);
    }

    return { node: data.route.entity };
  },
);

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string>>;
}): Promise<Metadata> {
  const { node } = await getDrupalData({
    params: await params,
    searchParams: await searchParams,
  });

  return calculateMetaTags(node?.__typename, node);
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { node } = await getDrupalData({
    params: await params,
    searchParams: await searchParams,
  });

  return (
    <div>
      <h1>{node.title}</h1>
      {node.body?.value && (
        <div dangerouslySetInnerHTML={{ __html: node.body.value }} />
      )}
    </div>
  );
}
