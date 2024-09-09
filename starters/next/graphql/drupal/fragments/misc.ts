import { graphql } from '@/graphql/gql.tada'

export const LinkFragment = graphql(`
  fragment LinkFragment on Link {
    href: url
    text: title
    internal
  }
`)

export const TextFragment = graphql(`
  fragment TextFragment on Text {
    format
    value
    processed
  }
`)
