import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import getToken from "~/drupal/auth.server";
import { getClient } from "~/drupal/client.server";
import { MediaImageFragment } from "~/drupal/fragments.server";

import NodeArticleTeaser from "~/components/node/NodeArticleTeaser";

export const loader: LoaderFunction = async ({ context }) => {
  const token = await getToken(context);
  const drupalClient = getClient(token, context);

  const {
    nodeArticles: { nodes },
  } = await drupalClient.query({
    nodeArticles: {
      __args: { first: 10 },
      nodes: {
        __typename: true,
        id: true,
        title: true,
        path: true,
        image: {
          on_MediaImage: {
            ...MediaImageFragment,
          },
        },
        author: {
          __scalar: true,
          name: true,
          picture: {
            on_MediaImage: {
              ...MediaImageFragment,
            },
          },
        },
      },
    },
  });

  return json({ nodes }, { status: 200 });
};

export default function Index() {
  const { nodes } = useLoaderData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
      {nodes.map((node: any) => (
        <NodeArticleTeaser key={node.id} {...node} />
      ))}
    </div>
  );
}
