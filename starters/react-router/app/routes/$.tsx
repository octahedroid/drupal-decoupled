import type { Route } from './+types/$'
import { type FragmentOf, readFragment } from 'gql.tada'
import { metaTags } from 'drupal-decoupled/remix'
import { graphql } from '~/graphql/gql.tada'
import type { EntityFragmentType } from '~/graphql/types'
import NodeArticleComponent from '~/integration/node/NodeArticle'
import NodePageComponent from '~/integration/node/NodePage'
import TermTagsComponent from '~/integration/taxonomy/TermTags'
import { calculatePath } from '~/utils/routes'
import { calculateMetaTags } from '~/utils/metatags'
import { Header, Footer } from '~/components/blocks'
import { NodeArticleFragment, NodePageFragment } from '~/graphql/fragments/node'
import { TermTagsFragment } from '~/graphql/fragments/terms'
import { MenuFragment, MenuItemFragment } from '~/graphql/fragments/menu'
import { redirect } from 'react-router'
import { getDrupalClient } from 'drupal-vite/client'

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return []
  }
  const { type, entity } = data

  return metaTags({
    tags: calculateMetaTags(type, entity),
    metaTagOverrides: {
      MetaTagLink: {
        canonical: {
          // @ts-expect-error - fix typings.
          kind: 'replace',
          pattern: 'dev-drupal-graphql.pantheonsite.io',
          replacement: 'drupal-remix.pages.dev',
        },
      },
      MetaTagProperty: {
        'og:url': {
          // @ts-expect-error - fix typings.
          kind: 'replace',
          pattern: 'dev-drupal-graphql.pantheonsite.io',
          replacement: 'drupal-remix.pages.dev',
        },
      },
      MetaTagValue: {
        'twitter:url': {
          // @ts-expect-error - fix typings.
          kind: 'replace',
          pattern: 'dev-drupal-graphql.pantheonsite.io',
          replacement: 'drupal-remix.pages.dev',
        },
      },
    },
  })
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const path = calculatePath({ path: params['*'], url: request.url })

  const client = await getDrupalClient()

  const nodeRouteQuery = graphql(
    `
      query route($path: String!) {
        route(path: $path, revision: "CURRENT") {
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
          href: 'https://drupal-decoupled.octahedroid.com/docs/getting-started/quick-start/drupal',
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
    environment: process.env.ENVIRONMENT as string,
  }
}

export default function Home({
  loaderData: { type, entity, environment, header, footer },
}: Route.ComponentProps) {
  if (!type || !entity) {
    return <pre>Invalid data</pre>
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
