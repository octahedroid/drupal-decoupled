import { json, redirect, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Fragment } from "react/jsx-runtime";
import { FragmentOf } from "gql.tada";
import { metaTags } from "drupal-remix";

import { NodePageFragment, NodeArticleFragment } from "~/graphql/fragments/node";
import { TermTagsFragment } from "~/graphql/fragments/terms";
import { graphql } from "~/graphql/gql.tada";
import NodeArticleComponent from "~/components/node/NodeArticle";
import NodePageComponent from "~/components/node/NodePage";
import { getClient } from "~/utils/client.server";
import { calculatePath } from "~/utils/routes";
import { calculateMetaTags } from "~/utils/metatags";
import { EntityFragmentType } from "~/utils/types";
import TermTagsComponent from "~/components/taxonomy/TermTags";

export const meta: MetaFunction<typeof loader> = ({
  data,
}) => {
  if (!data) {
    return [];
  }
  const { type, entity } = data;

  return metaTags({
    tags: calculateMetaTags(type, entity),
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
  });
};

export const loader = async ({ params, context, request }: LoaderFunctionArgs) => {
  const path = calculatePath({path: params["*"], url: request.url});
  const client = await getClient({
    url: context.cloudflare.env.DRUPAL_GRAPHQL_URI,
    auth: {
      uri: context.cloudflare.env.DRUPAL_AUTH_URI,
      clientId: context.cloudflare.env.DRUPAL_CLIENT_ID,
      clientSecret: context.cloudflare.env.DRUPAL_CLIENT_SECRET,
    },
  });
  
  const nodeRouteQuery = graphql(`
    query route ($path: String!){
      route(path: $path) {
        __typename 
        ... on RouteInternal {
          entity {
            __typename
            ...NodePageFragment
            ...NodeArticleFragment
            ...TermTagsFragment
          }
        }
      }
    }
  `, [
    NodePageFragment,
    NodeArticleFragment,
    TermTagsFragment
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
    entity: data.route.entity as EntityFragmentType,
    environment: context.cloudflare.env.ENVIRONMENT,
  })
}

export default function Index() {
  const { type, entity, environment } = useLoaderData<typeof loader>();

  if (!type || !entity) {
    return null;
  }

  return (
    <Fragment>
      { type === "TermTags" && <TermTagsComponent term={entity as FragmentOf<typeof TermTagsFragment>} />}
      { type === "NodePage" && <NodePageComponent node={entity as FragmentOf<typeof NodePageFragment>} environment={environment} />}
      { type === "NodeArticle" && <NodeArticleComponent node={entity as FragmentOf<typeof NodeArticleFragment>} environment={environment} />}
    </Fragment>
  );
}
