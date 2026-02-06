import { MediaImageFragment } from "~/graphql/fragments/media";
import { UserFragment } from "~/graphql/fragments/user";
import { graphql } from "~/graphql/gql.tada";

// @todo fix importing NodeArticleTeaserFragment from node.ts
// import { NodeArticleTeaserFragment } from "~/graphql/fragments/node";
const NodeArticleTeaserFragment = graphql(
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

export const ViewBlogTeaserResultFragment = graphql(
  `
    fragment ViewBlogTeaserResultFragment on ViewBlogTeaserResult {
      __typename
      id
      view
      display
      results {
        ...NodeArticleTeaserFragment
      }
    }
  `,
  [NodeArticleTeaserFragment],
);

export const ViewBlogTeaserFeaturedResultFragment = graphql(
  `
    fragment ViewBlogTeaserFeaturedResultFragment on ViewBlogTeaserFeaturedResult {
      __typename
      id
      view
      display
      results {
        ...NodeArticleTeaserFragment
      }
    }
  `,
  [NodeArticleTeaserFragment],
);
