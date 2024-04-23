import { graphql } from "@/graphql/gql.tada";

export const LinkFragment = graphql(`
  fragment LinkFragment on Link {
    url
    title
    internal
  }
`);

export const TextFragment = graphql(`
  fragment TextFragment on Text {
    format
    value
    processed
  }
`);