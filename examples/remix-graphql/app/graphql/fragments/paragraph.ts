import { graphql } from "~/graphql/gql.tada";
import { TextFragment } from "~/graphql/fragments/misc";
import { MediaImageFragment } from "~/graphql/fragments/media";
import { UserFragment } from "~/graphql/fragments/user";
// @todo fix use of NodeArticleTeaserFragment
// import { NodeArticleTeaserFragment  } from "./node";

export const ParagraphCodeBlockFragment = graphql(`
  fragment ParagraphCodeBlockFragment on ParagraphCodeBlock {
    __typename
    id
    titleOptional
    code
    language
    showLineNumbers
  }
`)

 export const ParagraphTextFragment = graphql(`
  fragment ParagraphTextFragment on ParagraphText {
    __typename
    id
    title
    textRich {
      ...TextFragment
    }
  }
 `, [
  TextFragment
])

 export const ParagraphImageFragment = graphql(`
  fragment ParagraphImageFragment on ParagraphImage {
    __typename
    id
    image {
      ...MediaImageFragment
    }
  }
 `, [
  MediaImageFragment
])

 export const ParagraphStaticComponentFragment = graphql(`
  fragment ParagraphStaticComponentFragment on ParagraphStaticComponent {
    __typename
    id
    component
  }
`)

export const ParagraphViewReferenceFragment = graphql(`
fragment ParagraphViewReference on ParagraphViewReference {
  __typename
  id
  reference {
    __typename
    ... on ViewBlogTeaserResult {
      id
      view
      display 
      results {
        # @todo fix use of NodeArticleTeaserFragment
        # ...NodeArticleTeaserFragment
        ... on NodeArticle {
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
      }
    }
  }
}
`, [
  MediaImageFragment,
  UserFragment,
  // @todo fix use of NodeArticleTeaserFragment
  // NodeArticleTeaserFragment
])


export const ParagraphHeroFragment = graphql(`
  fragment ParagraphHeroFragment on ParagraphHero {
    __typename
    id
    title
    text
    image {
      ... on MediaImage {
        ...MediaImageFragment
      }
    }
  }
`,[
  MediaImageFragment
]);


export const ParagraphCardFragment = graphql(`
  fragment ParagraphCardFragment on ParagraphCard {
    __typename
    id
    title
    text
    image {
      ...MediaImageFragment
    }
  }
`, [
  MediaImageFragment
]);

export const ParagraphCardGroupFragment = graphql(`
  fragment ParagraphCardGroupFragment on ParagraphCardGroup {
    __typename
    id
    title
    items {
      __typename
      ...ParagraphCardFragment
    }
  }
`, [
  ParagraphCardFragment
]);

export const ParagraphUnionFragment = graphql(`
  fragment ParagraphUnionFragment on ParagraphUnion {
    ... on ParagraphInterface {
      __typename
      id
    }
    ...ParagraphHeroFragment
    ...ParagraphCardGroupFragment
    ...ParagraphCodeBlockFragment
    ...ParagraphTextFragment
    ...ParagraphImageFragment
    ...ParagraphStaticComponentFragment
    ...ParagraphViewReference
  }
`, [
  ParagraphHeroFragment,
  ParagraphCodeBlockFragment,
  ParagraphTextFragment,
  ParagraphImageFragment,
  ParagraphStaticComponentFragment,
  ParagraphViewReferenceFragment,
  ParagraphCardGroupFragment,
])
