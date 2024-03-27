import { json, redirect, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { NodePageFragment, NodeArticleFragment } from "~/graphql/fragments/node";
import { getClient } from "~/graphql/client.server";
import { graphql } from "~/graphql/gql.tada";
import NodeArticleComponent from "~/components/node/NodeArticle";
import NodePageComponent from "~/components/node/NodePage";
import { Fragment } from "react/jsx-runtime";
import { FragmentOf } from "gql.tada";

import { metaTags } from "drupal-remix";

export const meta: MetaFunction = ({ data }) => {
  return metaTags({
    tags: data.node.metatag,
    metaTagOverrides: {
      MetaTagLink: {
        canonical: {
          kind: "replace",
          pattern: "dev-drupal-graphql.pantheonsite.io",
          replacement: "drupal-remix.pages.dev",
        },
      },
      MetaTagProperty: {
        "og:url": {
          kind: "replace",
          pattern: "dev-drupal-graphql.pantheonsite.io",
          replacement: "drupal-remix.pages.dev",
        },
      },
      MetaTagValue: {
        "twitter:url": {
          kind: "replace",
          pattern: "dev-drupal-graphql.pantheonsite.io",
          replacement: "drupal-remix.pages.dev",
        },
      },
    },
  })
};

const NodeTypeComponents = new Map();
NodeTypeComponents.set("NodeArticle", NodeArticleComponent);
NodeTypeComponents.set("NodePage", NodePageComponent);
export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  const path = params["*"] ?? "/404";
  const { DRUPAL_GRAPHQL_URI, ENVIRONMENT } = context.cloudflare.env
  const client = getClient({url: DRUPAL_GRAPHQL_URI, token: 'none'});
  
  const nodeRouteQuery = graphql(`
    query route ($path: String!){
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
          }
        }
      }
    }
  `, [
    NodePageFragment,
    NodeArticleFragment
  ])

  const { data, error } = await client.query(
    nodeRouteQuery, 
    {
      path,
    }
  );

  if (error) {
    throw error;
  }

  if (!data || !data?.route || data?.route.__typename !== "RouteInternal" || !data.route.entity) {
    return redirect("/404");
  }

  return json({
    node: data.route.entity,
    environment: ENVIRONMENT,
  })
}

export default function Index() {
  const { node, environment } = useLoaderData<typeof loader>();

  return (
    <Fragment>
      { node.__typename == "NodePage" && node && <NodePageComponent node={node as FragmentOf<typeof NodePageFragment>} environment={environment} />}
      { node.__typename == "NodeArticle" && node && <NodeArticleComponent node={node as FragmentOf<typeof NodeArticleFragment>} environment={environment} />}
    </Fragment>
  );
}
