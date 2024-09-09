import { graphql } from '@/graphql/gql.tada'

import { MediaImageFragment } from '@/graphql/drupal/fragments/media'
import { UserFragment } from '@/graphql/drupal/fragments/user'
import { MetatagFragment } from '@/graphql/drupal/fragments/metatag'
import { ParagraphUnionFragment } from './paragraph'

export const NodePageFragment = graphql(
  `
    fragment NodePageFragment on NodePage {
      __typename
      id
      title
      showTitle
      summary
      image {
        ...MediaImageFragment
      }
      metatag {
        ...MetatagFragment
      }
      components {
        ...ParagraphUnionFragment
      }
    }
  `,
  [MediaImageFragment, MetatagFragment, ParagraphUnionFragment]
)

export const NodeArticleFragment = graphql(
  `
    fragment NodeArticleFragment on NodeArticle {
      __typename
      id
      title
      summary
      path
      changed {
        timestamp
      }
      image {
        ...MediaImageFragment
      }
      author {
        ...UserFragment
      }
      metatag {
        ...MetatagFragment
      }
      body {
        processed
      }
    }
  `,
  [MediaImageFragment, UserFragment, MetatagFragment, ParagraphUnionFragment]
)

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
  [MediaImageFragment, UserFragment]
)
