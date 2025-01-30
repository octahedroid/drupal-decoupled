import { graphql } from '~/graphql/gql.tada'

export const MenuItemFragment = graphql(`
  fragment MenuItemFragment on MenuItem {
    __typename
    label: title
    href: url
    expanded
  }
`)

export const MenuFragment = graphql(`
  fragment MenuFragment on Menu {
    __typename
    id
    name
    items {
      ...MenuItemFragment
    }
  }
  `,
  [MenuItemFragment]
)
