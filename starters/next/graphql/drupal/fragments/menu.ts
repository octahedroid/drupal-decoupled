import { graphql } from '@/graphql/gql.tada'

export const MenuItemFragment = graphql(`
  fragment MenuItemFragment on MenuItem {
    label: title
    href: url
    expanded
  }
`)

export const MenuFragment = graphql(
  `
    fragment MenuFragment on Menu {
      id
      name
      items {
        ...MenuItemFragment
      }
    }
  `,
  [MenuItemFragment]
)
