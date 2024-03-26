import { json, redirect, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { NodePageFragment, NodeArticleFragment } from "~/graphql/fragments/node";
import { getClient } from "~/graphql/client.server";
import { graphql } from "~/graphql/gql.tada";
import NodeArticleComponent from "~/components/node/NodeArticle";
import NodePageComponent from "~/components/node/NodePage";
import { Fragment } from "react/jsx-runtime";
import { FragmentOf } from "gql.tada";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

type NodeType = typeof NodeArticleComponent | typeof NodePageComponent;
const NodeTypeComponents = new Map();
NodeTypeComponents.set("NodeArticle", NodeArticleComponent);
NodeTypeComponents.set("NodePage", NodePageComponent);
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const path = params["*"] ?? "/404";
  const client = getClient();
  
  const nodeRouteQuery = graphql(`
    query route ($path: String!){
      route(path: $path) {
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
    type: data.route.entity.__typename,
    page: data.route.entity.__typename === "NodePage" ? data?.route?.entity as FragmentOf<typeof NodePageFragment> : null,
    article: data.route.entity.__typename === "NodeArticle" ? data?.route?.entity as FragmentOf<typeof NodeArticleFragment> : null,
    environment: 'production'
  })
}

export default function Index() {
  const { type, page, article, environment } = useLoaderData<typeof loader>();

  return (
    <Fragment>
      { type == "NodePage" && page && <NodePageComponent node={page} environment={environment} />}
      { type == "NodeArticle" && article && <NodeArticleComponent node={article} environment={environment} />}
    </Fragment>
  );
}
