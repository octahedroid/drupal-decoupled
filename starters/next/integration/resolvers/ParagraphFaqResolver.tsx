import { type Component, config } from 'drupal-decoupled/editor'

import {
  fieldText,
  fieldTextArea,
  fieldQuestion,
} from '@/integration/editor/fields'

import { FAQ, type FAQProps } from '@/components/blocks'
import { graphql } from '@/graphql/gql.tada'

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
          __typename
          id
          question
          answer {
            __typename
            value
            processed
          }
        }
      }
    }
  `,
  []
)

config.set({
  component: 'ParagraphFaq',
  fields: {
    heading: {
      type: fieldText,
    },
    descriptionOptional: {
      type: fieldTextArea,
      config: {
        fieldName: 'description',
        uiPropName: 'description',
      },
    },
    items: {
      type: fieldQuestion,
      config: {
        uiPropName: 'questions',
      },
    },
  },
  defaultProps: FAQ.defaults,
})

const ParagraphFaq: Component = {
  fields: config.getFields('ParagraphFaq'),
  defaultProps: config.parseDefaultProps('ParagraphFaq'),
  render: (props) => {
    const faq = config.parseUIProps('ParagraphFaq', props) as FAQProps

    return <FAQ {...faq} />
  },
}

export { ParagraphFaq }
