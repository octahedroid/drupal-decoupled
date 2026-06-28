import { MediaImageFragment } from "@/graphql/fragments/media";
import { UserFragment } from "@/graphql/fragments/user";
import { graphql } from "@/graphql/gql.tada";

export const NodeArticleTeaserFragment = graphql(
  `
    fragment NodeArticleTeaserFragment on NodeArticle {
      __typename
      id
      title
      summary
      path
      image {
        ...MediaImageFragment
      }
      author {
        ...UserFragment
      }
    }
  `,
  [MediaImageFragment, UserFragment],
);
