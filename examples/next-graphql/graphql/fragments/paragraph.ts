import { graphql } from "@/graphql/gql.tada";
import { LinkFragment, TextFragment } from "./misc";
import { MediaImageFragment } from "./media";
import { UserFragment } from "./user";
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

 export const ParagraphHeroCtaFragment = graphql(`
  fragment ParagraphHeroCtaFragment on ParagraphHeroCta {
    __typename
    id
    title
    text
    intro
    cta {
      ...LinkFragment
    }
  }
 `,[LinkFragment]
 )

 export const ParagraphTextFragment = graphql(`
  fragment ParagraphTextFragment on ParagraphText {
    __typename
    id
    title
    textRich {
      ...TextFragment
    }
  }
 `, [TextFragment])

 export const ParagraphImageFragment = graphql(`
  fragment ParagraphImageFragment on ParagraphImage {
    __typename
    id
    image {
      ...MediaImageFragment
    }
  }
 `, [MediaImageFragment])
 
 export const ParagraphHeroTextFragment = graphql(`
  fragment ParagraphHeroTextFragment on ParagraphHeroText {
    __typename
    id
    intro
    title
    text
  }
 `)

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

export const ParagraphUnionFragment = graphql(`
  fragment ParagraphUnionFragment on ParagraphUnion {
    ... on ParagraphInterface {
      __typename
      id
    }
    ...ParagraphCodeBlockFragment
    ...ParagraphHeroCtaFragment
    ...ParagraphTextFragment
    ...ParagraphImageFragment
    ...ParagraphHeroTextFragment
    ...ParagraphStaticComponentFragment
    ...ParagraphViewReference
  }
`, [
  ParagraphCodeBlockFragment,
  ParagraphHeroCtaFragment,
  ParagraphTextFragment,
  ParagraphImageFragment,
  ParagraphHeroTextFragment,
  ParagraphStaticComponentFragment,
  ParagraphViewReferenceFragment
])
