import { graphql } from "~/graphql/gql.tada";
import { LinkFragment, TextFragment } from "./misc";
import { MediaImageFragment } from "./media";

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

export const ParagraphUnionFragment = graphql(`
  fragment ParagraphUnionFragment on ParagraphUnion {
    __typename
    ... on ParagraphInterface {
      id
    }
    ...ParagraphCodeBlockFragment
    ...ParagraphHeroCtaFragment
    ...ParagraphTextFragment
    ...ParagraphImageFragment
    ...ParagraphHeroTextFragment
    ...ParagraphStaticComponentFragment
  }
`, [
  ParagraphCodeBlockFragment,
  ParagraphHeroCtaFragment,
  ParagraphTextFragment,
  ParagraphImageFragment,
  ParagraphHeroTextFragment,
  ParagraphStaticComponentFragment
])