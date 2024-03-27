import { LoaderFunctionArgs, json, redirect, type MetaFunction } from "@remix-run/cloudflare";
import { NodePageFragment } from "~/graphql/fragments/node";

import { getClient } from "~/graphql/client.server";
import { useLoaderData } from "@remix-run/react";
import NodePageComponent from "~/components/node/NodePage";
import { Fragment } from "react/jsx-runtime";
import { graphql } from "~/graphql/gql.tada";
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

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const path = "/home";
  const { DRUPAL_GRAPHQL_URI, ENVIRONMENT } = context.cloudflare.env
  const client = getClient({url: DRUPAL_GRAPHQL_URI, token: 'none'});
  
  const query = graphql(`
    query route ($path: String!){
      route(path: $path) {
        __typename 
        ... on RouteInternal {
          entity {
            ...NodePageFragment
          }
        }
      }
    }
  `, [
    NodePageFragment,
  ])

  const { data, error } = await client.query(
    query, 
    {
      path
    }
  )

  if (error) {
    throw error;
  }

  if (!data || !data?.route || data?.route.__typename !== "RouteInternal" || !data.route.entity) {
       return redirect("/404");
  }

  return json({
    node: data.route.entity as FragmentOf<typeof NodePageFragment>,
    environment: ENVIRONMENT,
  })
}

export default function Index() {
  const { node, environment } = useLoaderData<typeof loader>();

  return (
    <Fragment>
      <NodePageComponent node={node} environment={environment} />
    </Fragment>
  );
}
