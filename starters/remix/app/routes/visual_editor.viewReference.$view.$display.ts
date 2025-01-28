import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { graphql } from "gql.tada";
import { NodeArticleTeaserFragment } from "~/graphql/fragments";
import { getClient } from '~/utils/client.server'

function makeCamelCase(str: string) {
  return str
    .split(' ')
    .map((e, i) => i
      ? e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()
      : e.toLowerCase()
    )
    .join('')
}

export const loader = async ({
  params,
  context,
}: LoaderFunctionArgs) => {

  const { view, display } = params;

  if (!view || !display) {
    throw new Error('Missing view or display parameter')
  }
  const client = await getClient({
    url: context.cloudflare.env.DRUPAL_GRAPHQL_URI,
    auth: {
      uri: context.cloudflare.env.DRUPAL_AUTH_URI,
      clientId: context.cloudflare.env.DRUPAL_CLIENT_ID,
      clientSecret: context.cloudflare.env.DRUPAL_CLIENT_SECRET,
    },
  })

  const queryName = makeCamelCase(`view ${view.replace('_', ' ')} ${display.replace('_', ' ')}`);

  const viewReference = graphql(`
    query viewReference {
      ${queryName} {
        id
        view
        display
        results {
          ...NodeArticleTeaserFragment
        }
      }
    }
  `,
    [
      NodeArticleTeaserFragment,
    ]
  )

  const { data, error } = await client.query(viewReference, { view, display })

  if (error) {
    throw error
  }

  const viewReferenceData = data[queryName];

  return json({ ...viewReferenceData  }, 200);
};
