import { graphql } from '~/graphql/gql.tada'

export const MetatagFragment = graphql(`
  fragment MetatagFragment on MetaTag @_unmask {
    __typename
    ... on MetaTagLink {
      __typename
      attributes {
        rel
        href
      }
    }
    ... on MetaTagValue {
      __typename
      attributes {
        name
        content
      }
    }
    ... on MetaTagProperty {
      __typename
      attributes {
        property
        content
      }
    }
  }
`)
