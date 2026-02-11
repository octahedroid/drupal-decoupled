import { MediaImageFragment } from "@/graphql/fragments/media";
import { graphql } from "@/graphql/gql.tada";

export const UserFragment = graphql(
  `
    fragment UserFragment on User {
      __typename
      id
      name
      picture {
        ... on MediaImage {
          ...MediaImageFragment
        }
      }
    }
  `,
  [MediaImageFragment],
);
