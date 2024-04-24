import { graphql } from "@/graphql/gql.tada";
import { MediaImageFragment } from "@/graphql/fragments/media";

export const UserFragment = graphql(`
  fragment UserFragment on User {
    id
    name
    picture {
      ... on MediaImage {
        ...MediaImageFragment
      }
    }
  }
`, [MediaImageFragment])
