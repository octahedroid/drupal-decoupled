import type { Spec } from "@json-render/core";
import { readFragment, type FragmentOf } from "gql.tada";
import { getDrupalClient } from "drupal-vite/client";

import {
  NodeArticleFragment,
  NodePageFragment,
} from "~/graphql/fragments/node";
import { graphql } from "~/graphql/gql.tada";
import type { NodeResultOf } from "~/graphql/types";
import { resolve } from "~/integration/resolvers/resolver";

const nodeRouteEntityQuery = graphql(
  `
    query routeEntity($path: String!) {
      route(path: $path, revision: "CURRENT") {
        __typename
        ... on RouteInternal {
          entity {
            __typename
            ...NodePageFragment
            ...NodeArticleFragment
          }
        }
      }
    }
  `,
  [NodePageFragment, NodeArticleFragment],
);

export function resolveRouteEntity(entity: {
  __typename: string;
}): NodeResultOf {
  if (entity.__typename === "NodePage") {
    return readFragment(
      NodePageFragment,
      entity as unknown as FragmentOf<typeof NodePageFragment>,
    );
  }

  if (entity.__typename === "NodeArticle") {
    return readFragment(
      NodeArticleFragment,
      entity as unknown as FragmentOf<typeof NodeArticleFragment>,
    );
  }

  throw new Error(`Unsupported entity type: ${entity.__typename}`);
}

export function resolveSpecForNode(node: NodeResultOf): Spec | null {
  if (node.__typename === "NodePage") {
    return resolve({ node });
  }

  return null;
}

export async function getPageSpec(path: string): Promise<Spec | null> {
  const client = await getDrupalClient();

  const { data, error } = await client.query(nodeRouteEntityQuery, { path });

  if (error) {
    throw error;
  }

  if (!data?.route || data.route.__typename !== "RouteInternal") {
    return null;
  }

  if (!data.route.entity) {
    throw new Error("RouteInternal returned no entity");
  }

  const node = resolveRouteEntity(data.route.entity);

  return resolveSpecForNode(node);
}
