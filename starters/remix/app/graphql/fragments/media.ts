import { graphql } from '~/graphql/gql.tada'

export const ImageFragment = graphql(`
  fragment ImageFragment on Image {
    __typename
    url
    title
    width
    height
    alt
  }
`)

export const MediaImageFragment = graphql(
  `
    fragment MediaImageFragment on MediaImage {
      __typename
      id
      mediaImage {
        ...ImageFragment
      }
    }
  `,
  [ImageFragment]
)
