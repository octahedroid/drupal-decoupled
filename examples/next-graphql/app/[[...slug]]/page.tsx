import { FragmentOf } from "gql.tada";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Fragment } from "react";

import NodeArticleComponent from "@/components/drupal/node/NodeArticle";
import NodePageComponent from "@/components/drupal/node/NodePage";
import TermTagsComponent from "@/components/drupal/taxonomy/TermTags";
import {
  NodeArticleFragment,
  NodePageFragment,
} from "@/graphql/drupal/fragments/node";
import { TermTagsFragment } from "@/graphql/drupal/fragments/terms";
import { graphql } from "@/graphql/gql.tada";
import { EntityFragmentType } from "@/graphql/drupal/types";
import { getClient } from "@/utils/drupal/client";
import { calculatePath } from "@/utils/drupal/routes";

async function getDrupalData({ params }: { params: { slug: string[] } }) {
  const pathFromParams = params.slug?.join("/") || "/home";
  const requestUrl = headers().get("x-url");
  const path = calculatePath({
    path: pathFromParams,
    url: requestUrl!,
  });

  const client = await getClient({
    url: process.env.DRUPAL_GRAPHQL_URI!,
    auth: {
      uri: process.env.DRUPAL_AUTH_URI!,
      clientId: process.env.DRUPAL_CLIENT_ID!,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
    },
  });
  const nodeRouteQuery = graphql(
    `
      query route($path: String!) {
        route(path: $path) {
          __typename
          ... on RouteInternal {
            entity {
              __typename
              ... on NodePage {
                id
                title
              }
              ...NodePageFragment
              ...NodeArticleFragment
              ...TermTagsFragment
            }
          }
        }
      }
    `,
    [NodePageFragment, NodeArticleFragment, TermTagsFragment]
  );

  const { data, error } = await client.query(nodeRouteQuery, {
    path,
  });

  if (error) {
    throw error;
  }

  if (
    !data ||
    !data?.route ||
    data?.route.__typename !== "RouteInternal" ||
    !data.route.entity
  ) {
    return redirect("/404");
  }
  return {
    type: data.route.entity.__typename,
    entity: data.route.entity as EntityFragmentType,
    environment: process.env.ENVIRONMENT!,
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { type, entity, environment } = await getDrupalData({ params });
  if (!type || !entity) {
    return null;
  }

  return (
    <Fragment>
      {type === "NodePage" && (
        <NodePageComponent
          node={entity as FragmentOf<typeof NodePageFragment>}
          environment={environment}
        />
      )}
      {type === "NodeArticle" && (
        <NodeArticleComponent
          node={entity as FragmentOf<typeof NodeArticleFragment>}
          environment={environment}
        />
      )}
      {type === "TermTags" && (
        <TermTagsComponent
          term={entity as FragmentOf<typeof TermTagsFragment>}
        />
      )}
    </Fragment>
  );
}
