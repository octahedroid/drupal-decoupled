import { graphql } from '@/graphql/gql.tada'
import { MediaImageFragment } from '@/graphql/drupal/fragments/media'
import { UserFragment } from '@/graphql/drupal/fragments/user'
import { LinkFragment } from '@/graphql/drupal/fragments/misc'

// @todo fix importing NodeArticleTeaserFragment from node.ts
// import { NodeArticleTeaserFragment  } from "~/graphql/drupal/fragments/node";
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
  [MediaImageFragment, UserFragment]
)

export const ParagraphWebformFragment = graphql(`
  fragment ParagraphWebformFragment on ParagraphWebform {
    __typename
    id
    heading
    subheadingOptional: subheading
    descriptionOptional: description
    form
  }
`)

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
  [NodeArticleTeaserFragment]
)

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
  [NodeArticleTeaserFragment]
)

export const ParagraphViewReferenceFragment = graphql(
  `
    fragment ParagraphViewReference on ParagraphViewReference {
      __typename
      id
      headingOptional: heading
      subheadingOptional: subheading
      descriptionOptional: description
      actionOptional: link {
        ...LinkFragment
      }
      reference {
        __typename
        ...ViewBlogTeaserResultFragment
        ...ViewBlogTeaserFeaturedResultFragment
      }
    }
  `,
  [ViewBlogTeaserResultFragment, ViewBlogTeaserFeaturedResultFragment]
)

export const ParagraphHeroFragment = graphql(
  `
    fragment ParagraphHeroFragment on ParagraphHero {
      __typename
      id
      heading
      description
      image {
        ... on MediaImage {
          ...MediaImageFragment
        }
      }
      actions {
        ...LinkFragment
      }
    }
  `,
  [MediaImageFragment, LinkFragment]
)

export const ParagraphSimpleCardFragment = graphql(
  `
    fragment ParagraphSimpleCardFragment on ParagraphSimpleCard {
      __typename
      id
      heading
      description
      image {
        ...MediaImageFragment
      }
    }
  `,
  [MediaImageFragment]
)

export const ParagraphCardGroupFragment = graphql(
  `
    fragment ParagraphCardGroupFragment on ParagraphCardGroup {
      __typename
      id
      heading
      subheadingOptional: subheading
      descriptionOptional: description
      items {
        __typename
        ...ParagraphSimpleCardFragment
      }
    }
  `,
  [ParagraphSimpleCardFragment]
)

export const ParagraphCtaFragment = graphql(
  `
    fragment ParagraphCtaFragment on ParagraphCta {
      __typename
      id
      heading
      description
      subheading
      actions {
        ...LinkFragment
      }
    }
  `,
  [LinkFragment]
)

export const ParagraphQuestionFragment = graphql(`
  fragment ParagraphQuestionFragment on ParagraphQuestion {
    __typename
    id
    question
    answer {
      processed
    }
  }
`)

export const ParagraphFaqFragment = graphql(
  `
    fragment ParagraphFaqFragment on ParagraphFaq {
      __typename
      id
      heading
      descriptionOptional: description
      items {
        __typename
        ... on ParagraphQuestion {
          ...ParagraphQuestionFragment
        }
      }
    }
  `,
  [ParagraphQuestionFragment]
)

export const ParagraphLogoFragment = graphql(
  `
    fragment ParagraphLogoFragment on ParagraphLogo {
      __typename
      id
      image {
        ...MediaImageFragment
      }
      link {
        ...LinkFragment
      }
    }
  `,
  [MediaImageFragment, LinkFragment]
)

export const ParagraphLogoGroupFragment = graphql(
  `
    fragment ParagraphLogoGroupFragment on ParagraphLogoGroup {
      __typename
      id
      heading
      items {
        ...ParagraphLogoFragment
      }
    }
  `,
  [ParagraphLogoFragment]
)

export const ParagraphAuthorFragment = graphql(
  `
    fragment ParagraphAuthorFragment on ParagraphAuthor {
      __typename
      id
      image {
        ...MediaImageFragment
      }
      name
      company
      position
    }
  `,
  [MediaImageFragment]
)

export const ParagraphTestimonialFragment = graphql(
  `
    fragment ParagraphTestimonialFragment on ParagraphTestimonial {
      __typename
      id
      quote
      author {
        ...ParagraphAuthorFragment
      }
    }
  `,
  [ParagraphAuthorFragment]
)

export const ParagraphUnionFragment = graphql(
  `
    fragment ParagraphUnionFragment on ParagraphUnion {
      ... on ParagraphInterface {
        __typename
        id
      }
      ...ParagraphHeroFragment
      ...ParagraphCardGroupFragment
      ...ParagraphWebformFragment
      ...ParagraphViewReference
      ...ParagraphCtaFragment
      ...ParagraphFaqFragment
      ...ParagraphLogoGroupFragment
      ...ParagraphTestimonialFragment
    }
  `,
  [
    ParagraphHeroFragment,
    ParagraphWebformFragment,
    ParagraphViewReferenceFragment,
    ParagraphCardGroupFragment,
    ParagraphCtaFragment,
    ParagraphFaqFragment,
    ParagraphLogoGroupFragment,
    ParagraphTestimonialFragment,
  ]
)
