import { NodeArticleTeaserFragment } from "@/graphql/fragments/shared";
import { graphql } from "@/graphql/gql.tada";

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
