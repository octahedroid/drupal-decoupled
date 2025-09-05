import { graphql } from '@/graphql/gql.tada'

export const LinkFragment = graphql(`
  fragment LinkFragment on Link {
    __typename
    url
    title
    internal
  }
`)

export const TextFragment = graphql(`
  fragment TextFragment on Text {
    __typename
    format
    value
    processed
  }
`)
