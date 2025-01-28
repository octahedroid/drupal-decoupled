import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node";
import { graphql } from "gql.tada";
import { MediaImageFragment } from "~/graphql/fragments";
import { getClient } from '~/utils/client.server'

export const loader = async ({
  context,
}: LoaderFunctionArgs) => {
  const client = await getClient({
    url: context.cloudflare.env.DRUPAL_GRAPHQL_URI,
    auth: {
      uri: context.cloudflare.env.DRUPAL_AUTH_URI,
      clientId: context.cloudflare.env.DRUPAL_CLIENT_ID,
      clientSecret: context.cloudflare.env.DRUPAL_CLIENT_SECRET,
    },
  })

  const mediaImages = graphql(`
    query mediaImages {
      mediaImages (first:100, sortKey: TITLE) {
        nodes {
          ...MediaImageFragment
        }
      }
    }
  `,
    [
      MediaImageFragment
    ])

  const { data, error } = await client.query(mediaImages, {})

  if (error) {
    throw error
  }

  return json(data.mediaImages.nodes, 200);
};
