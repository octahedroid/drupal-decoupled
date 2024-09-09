import { graphql } from '@/graphql/gql.tada'

export const ImageFragment = graphql(`
  fragment ImageFragment on Image {
    src: url
    width
    height
    alt
  }
`)

export const MediaImageFragment = graphql(
  `
    fragment MediaImageFragment on MediaImage {
      id
      mediaImage {
        ...ImageFragment
      }
    }
  `,
  [ImageFragment]
)
