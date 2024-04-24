import { graphql } from "@/graphql/gql.tada";

export const TermTagsFragment = graphql(`
  fragment TermTagsFragment on TermTags  {
    __typename
    id
    name
    description {
      processed
    }
  }
`);