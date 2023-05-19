import type { LoaderArgs, V2_MetaFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { Fragment } from "react";

import type { MetaTagUnion, NodePage } from "~/@types/gen/schema";

import getToken from "~/drupal/auth.server";
import { getClient } from "~/drupal/client.server";
import {
  MediaImageFragment,
  MetaTagFragment,
  ParagraphCodeBlockFragment,
  ParagraphHeroCtaFragment,
  ParagraphHeroTextFragment,
  ParagraphImageFragment,
  ParagraphTextFragment,
} from "~/drupal/fragments.server";

import NodeArticleComponent from "~/components/node/NodeArticle";
import NodePageComponent from "~/components/node/NodePage";
import { metaTags } from "drupal-remix";

const NodeTypeComponents = new Map();
NodeTypeComponents.set("NodeArticle", NodeArticleComponent);
NodeTypeComponents.set("NodePage", NodePageComponent);

export const meta: V2_MetaFunction = ({
  data,
}: {
  data: { node: { metatag: MetaTagUnion[] } };
}) => {
  return metaTags(data.node.metatag) as any;
};

export const loader = async ({ params, context }: LoaderArgs) => {
  const path = params["*"] as string;
  const token = await getToken(context);
  const drupalClient = getClient(token, context);

  const { route } = await drupalClient.query({
    route: {
      __args: {
        path: path,
      },
      __typename: true,
      on_RouteInternal: {
        entity: {
          __typename: true,
          on_NodeArticle: {
            id: true,
            title: true,
            path: true,
            image: {
              on_MediaImage: {
                ...MediaImageFragment,
              },
            },
            summary: true,
            author: {
              name: true,
              picture: {
                on_MediaImage: {
                  ...MediaImageFragment,
                },
              },
            },
            components: {
              __typename: true,
              on_ParagraphCodeBlock: {
                ...ParagraphCodeBlockFragment,
              },
              on_ParagraphHeroCta: {
                ...ParagraphHeroCtaFragment,
              },
              on_ParagraphHeroText: {
                ...ParagraphHeroTextFragment,
              },
              on_ParagraphText: {
                ...ParagraphTextFragment,
              },
              on_ParagraphImage: {
                ...ParagraphImageFragment,
              },
            },
            metatag: {
              ...MetaTagFragment,
              __typename: true,
            },
          },
          on_NodePage: {
            id: true,
            title: true,
            path: true,
            showTitle: true,
            image: {
              on_MediaImage: {
                ...MediaImageFragment,
              },
            },
            summary: true,
            components: {
              __typename: true,
              on_ParagraphHeroCta: {
                ...ParagraphHeroCtaFragment,
              },
              on_ParagraphHeroText: {
                ...ParagraphHeroTextFragment,
              },
              on_ParagraphText: {
                ...ParagraphTextFragment,
              },
              on_ParagraphImage: {
                ...ParagraphImageFragment,
              },
            },
            metatag: {
              ...MetaTagFragment,
              __typename: true,
            },
          },
        },
      },
    },
  });

  if (!route || route.__typename !== "RouteInternal") {
    return redirect("/404");
  }

  return json({ node: route.entity }, { status: 200 });
};

export default function Index() {
  const { node } = useLoaderData() as { node: NodePage };
  const Component = NodeTypeComponents.get(node.__typename);

  if (!node || !Component) {
    return <h1>Not Found</h1>;
  }

  return (
    <Fragment>
      <Component node={node} />
    </Fragment>
  );
}
