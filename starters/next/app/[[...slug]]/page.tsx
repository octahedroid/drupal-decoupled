import { FragmentOf, readFragment } from 'gql.tada'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { NodeArticleFragment, NodePageFragment } from '@/graphql/fragments/node'
import { TermTagsFragment } from '@/graphql/fragments/terms'
import { graphql } from '@/graphql/gql.tada'
import { EntityFragmentType } from '@/graphql/types'
import NodeArticleComponent from '@/integration/node/NodeArticle'
import NodePageComponent from '@/integration/node/NodePage'
import TermTagsComponent from '@/integration/taxonomy/TermTags'
import { getClient } from '@/utils/client'
import { calculatePath } from '@/utils/routes'

import { PageProps } from '@/.next/types/app/layout'
import { Footer, Header } from '@/components/blocks'
import { MenuFragment, MenuItemFragment } from '@/graphql/fragments/menu'

async function getDrupalData({ params }: { params: { slug: string[] } }) {
  const pathFromParams = params.slug?.join('/') || '/home'
  const requestUrl = (await headers()).get('x-url')
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
  const navItems = menuMain
    ? menuMain.items.map((item) => {
        const menuItem = readFragment(MenuItemFragment, item)

        return {
          label: menuItem.label,
          href: menuItem.href || undefined,
          expanded: menuItem.expanded,
        }
      })
    : []

  return {
    type: data.route.entity.__typename,
    header: {
      logo: {
        // add DRUPAL URI as env variable
        src: `${process.env.DRUPAL_AUTH_URI}/sites/default/files/2024-09/drupal-decoupled.png`,
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

export default async function Page({ params }: PageProps) {
  const { type, entity, environment, header, footer } = await getDrupalData({
    params: await params,
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
