import { graphql } from "@/graphql/gql.tada";

export const MetatagFragment = graphql(`
  fragment MetatagFragment on MetaTag @_unmask {
    __typename
    ... on MetaTagLink {
      attributes {
        rel
        href
      }
    }
    ... on MetaTagValue {
      attributes {
        name
        content
      }
    }
    ... on MetaTagProperty {
      attributes {
        property
        content
      }
    }
  }
`);