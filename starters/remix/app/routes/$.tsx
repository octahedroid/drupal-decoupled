import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { FragmentOf, readFragment } from 'gql.tada'
import { metaTags } from 'drupal-remix'

import {
  NodePageFragment,
  NodeArticleFragment,
  TermTagsFragment,
  MenuFragment,
  MenuItemFragment,
} from '~/graphql/fragments'
import { graphql } from '~/graphql/gql.tada'
import { EntityFragmentType } from '~/graphql/types'
import NodeArticleComponent from '~/components/node/NodeArticle'
import NodePageComponent from '~/components/node/NodePage'
import TermTagsComponent from '~/components/taxonomy/TermTags'
import { getClient } from '~/utils/client.server'
import { calculatePath } from '~/utils/routes'
import { calculateMetaTags } from '~/utils/metatags'

import { Header, Footer } from '~/components/blocks'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return []
  }
  const { type, entity } = data

  return metaTags({
    tags: calculateMetaTags(type, entity),
    metaTagOverrides: {
      MetaTagLink: {
        canonical: {
          kind: 'replace',
          pattern: 'dev-drupal-graphql.pantheonsite.io',
          replacement: 'drupal-remix.pages.dev',
        },
      },
      MetaTagProperty: {
        'og:url': {
          kind: 'replace',
          pattern: 'dev-drupal-graphql.pantheonsite.io',
          replacement: 'drupal-remix.pages.dev',
        },
      },
      MetaTagValue: {
        'twitter:url': {
          kind: 'replace',
          pattern: 'dev-drupal-graphql.pantheonsite.io',
          replacement: 'drupal-remix.pages.dev',
        },
      },
    },
  })
}

export const loader = async ({
  params,
  context,
  request,
}: LoaderFunctionArgs) => {
  const path = calculatePath({ path: params['*'], url: request.url })
  const client = await getClient({
    url: context.cloudflare.env.DRUPAL_GRAPHQL_URI,
    auth: {
      uri: context.cloudflare.env.DRUPAL_AUTH_URI,
      clientId: context.cloudflare.env.DRUPAL_CLIENT_ID,
      clientSecret: context.cloudflare.env.DRUPAL_CLIENT_SECRET,
    },
  })

  const nodeRouteQuery = graphql(`
      query route($path: String!) {
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

        menuMain: menu(name: MAIN) {
          ...MenuFragment
        }

        menuFooter: menu(name: FOOTER) {
          ...MenuFragment
        }
      }
    `,
    [NodePageFragment, NodeArticleFragment, TermTagsFragment, MenuFragment]
  )

  const { data, error } = await client.query(nodeRouteQuery, {
    path,
  })

  if (error) {
    throw error
  }

  if (
    !data ||
    !data?.route ||
    data?.route.__typename !== 'RouteInternal' ||
    !data.route.entity
  ) {
    return redirect('/404')
  }

  const menuMain = readFragment(MenuFragment, data.menuMain)
  const navItems = menuMain ? menuMain.items.map((item) => {
    const menuItem = readFragment(MenuItemFragment, item)

    return {
      label: menuItem.label,
      href: menuItem.href || undefined,
      expanded: menuItem.expanded,
    }
  }): []

  return json({
    type: data.route.entity.__typename,
    header: {
      logo: {
        // add DRUPAL URI as env variable
        src: `${context.cloudflare.env.DRUPAL_AUTH_URI}/sites/default/files/2024-09/drupal-decoupled.png`,
        alt: 'Company Logo',
      },
      navItems,
      sticky: true,
      actions: [
        {
          text: 'Docs',
          href: 'https://drupal-decoupled.octahedroid.com/docs',
        },
        {
          text: 'Quickstart',
          href: 'https://drupal-decoupled.octahedroid.com/docs/getting-started/quickstart',
        },
      ],
    },
    footer: {
      logo: {
        // add DRUPAL URI as env variable
        src: `${context.cloudflare.env.DRUPAL_AUTH_URI}/sites/default/files/2024-09/drupal-decoupled.png`,
        alt: 'Company Logo',
      },
      copyrightText: `© ${new Date().getFullYear()} Drupal Decoupled`,
      navItems: [],
    },
    entity: data.route.entity as EntityFragmentType,
    environment: context.cloudflare.env.ENVIRONMENT,
  })
}

export default function Index() {
  const { type, entity, environment, header, footer } =
    useLoaderData<typeof loader>()

  if (!type || !entity) {
    return null
  }

  return (
    <>
      <Header
        logo={header.logo}
        navItems={header.navItems}
        sticky={header.sticky}
        actions={header.actions}
      />
      {type === 'NodePage' && (
        <NodePageComponent
          node={entity as FragmentOf<typeof NodePageFragment>}
          environment={environment}
        />
      )}
      {type === 'NodeArticle' && (
        <NodeArticleComponent
          node={entity as FragmentOf<typeof NodeArticleFragment>}
          environment={environment}
        />
      )}
      {type === 'TermTags' && (
        <TermTagsComponent
          term={entity as FragmentOf<typeof TermTagsFragment>}
        />
      )}
      <Footer
        logo={footer.logo}
        copyrightText={footer.copyrightText}
        columns={[]}
      />
    </>
  )
}
