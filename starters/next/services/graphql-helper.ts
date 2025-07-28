import { FragmentOf, readFragment } from 'gql.tada'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { EntityFragmentType } from '@/graphql/types'
import { getClient } from '@/utils/client'
import { calculatePath } from '@/utils/routes'
import { MenuFragment, MenuItemFragment } from '@/graphql/fragments/menu'
import { RouteQuery } from '@/query/routeQuery'

export async function getDrupalData({ params }: { params: { slug: string[] } }) {
  const pathFromParams = params.slug?.join('/') || '/home'
  const requestUrl = (await headers()).get('x-url')
  const path = calculatePath({
    path: pathFromParams,
    url: requestUrl!,
  })

  const client = await getClient()
 
  const { data, error } = await client.query(RouteQuery, {
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
    ? menuMain.items.map((item: FragmentOf<typeof MenuItemFragment>) => {
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
    environment: process.env.ENVIRONMENT!,
  }
}