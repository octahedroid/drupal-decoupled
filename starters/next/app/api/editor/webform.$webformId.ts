import type { LoaderFunctionArgs } from "@remix-run/cloudflare"; // or cloudflare/deno
import { json } from "@remix-run/cloudflare";
import { graphql } from "gql.tada";
import { WebformFragment } from "~/graphql/fragments";
import { getClient } from '~/utils/client.server'

export const loader = async ({
  params,
  context,
}: LoaderFunctionArgs) => {

  const { webformId } = params;

  const client = await getClient({
    url: context.cloudflare.env.DRUPAL_GRAPHQL_URI,
    auth: {
      uri: context.cloudflare.env.DRUPAL_AUTH_URI,
      clientId: context.cloudflare.env.DRUPAL_CLIENT_ID,
      clientSecret: context.cloudflare.env.DRUPAL_CLIENT_SECRET,
    },
  })

  const webform = graphql(`
    query webform($webformId: ID!) {
      webform (id: $webformId) {
        ...WebformFragment
      }
    }
  `,
    [
      WebformFragment
    ])

  const { data, error } = await client.query(webform, {webformId})

  if (error) {
    throw error
  }

  return json(data.webform, 200);
};
