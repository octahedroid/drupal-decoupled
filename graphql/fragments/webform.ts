import { graphql } from '@/graphql/gql.tada'

export const WebformFragment = graphql(`
  fragment WebformFragment on Webform {
    __typename
    id
    label
    description
    elements {
      webform_key
      type
      title
      options {
        __typename
        id
        value
      }
      states {
        __typename
        element
        condition
        trigger
      }
    }
  }
`)
