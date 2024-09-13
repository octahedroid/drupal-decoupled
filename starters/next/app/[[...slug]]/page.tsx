import { FragmentOf, readFragment } from 'gql.tada'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import NodeArticleComponent from '@/components/drupal/node/NodeArticle'
import NodePageComponent from '@/components/drupal/node/NodePage'
import TermTagsComponent from '@/components/drupal/taxonomy/TermTags'
import {
  NodeArticleFragment,
  NodePageFragment,
} from '@/graphql/drupal/fragments/node'
import { TermTagsFragment } from '@/graphql/drupal/fragments/terms'
import { graphql } from '@/graphql/gql.tada'
import { EntityFragmentType } from '@/graphql/drupal/types'
import { getClient } from '@/utils/drupal/client'
import { calculatePath } from '@/utils/drupal/routes'

import { Header } from '@/components/ui//Header'
import { Footer } from '@/components/ui/Footer'
import { MenuFragment, MenuItemFragment } from '@/graphql/drupal/fragments/menu'
import type { ButtonProps } from '@/components/ui/types'

async function getDrupalData({ params }: { params: { slug: string[] } }) {
  const pathFromParams = params.slug?.join('/') || '/home'
  const requestUrl = headers().get('x-url')
  const path = calculatePath({
    path: pathFromParams,
    url: requestUrl!,
  })

  const client = await getClient({
    url: process.env.DRUPAL_GRAPHQL_URI!,
    auth: {
      uri: process.env.DRUPAL_AUTH_URI!,
      clientId: process.env.DRUPAL_CLIENT_ID!,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
    },
  })
  const nodeRouteQuery = graphql(
    `
      query route($path: String!) {
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
  const navItems = menuMain?.items.map((item) => {
    const menuItem = readFragment(MenuItemFragment, item)

    return {
      label: menuItem.label,
      href: menuItem.href,
      expanded: menuItem.expanded,
    }
  })

  return {
    type: data.route.entity.__typename,
    header: {
      logo: {
        // add DRUPAL URI as env variable
        src: `${process.env.DRUPAL_AUTH_URI}/sites/default/files/2024-09/drupal-decoupled.png`,
        alt: 'Company Logo',
      },
      navItems: navItems || [],
      sticky: true,
      actions: [
        {
          text: 'Docs',
          href: 'https://drupal-decoupled.octahedroid.com/docs',
          variant: 'default',
          internal: false,
        },
        {
          text: 'Quickstart',
          href: 'https://drupal-decoupled.octahedroid.com/docs/getting-started/quickstart',
          variant: 'default',
          internal: false,
        },
      ] as ButtonProps[],
    },
    footer: {
      logo: {
        // add DRUPAL URI as env variable
        src: `${process.env.DRUPAL_AUTH_URI}/sites/default/files/2024-09/drupal-decoupled.png`,
        alt: 'Company Logo',
      },
      copyrightText: `© ${new Date().getFullYear()} Drupal Decoupled`,
      navItems: [],
    },
    entity: data.route.entity as EntityFragmentType,
    environment: process.env.ENVIRONMENT!,
  }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { type, entity, environment, header, footer } = await getDrupalData({
    params,
  })
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
