import { graphql } from "@/graphql/gql.tada";

export const ImageFragment = graphql(`
  fragment ImageFragment on Image {
    url
    width
    height
    alt
    title
  }
`)

export const MediaImageFragment = graphql(`
  fragment MediaImageFragment on MediaImage {
    id
    mediaImage {
      ...ImageFragment
    }
  }
`, [ImageFragment])
