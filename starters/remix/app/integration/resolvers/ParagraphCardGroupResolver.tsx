import { type Component, config } from 'drupal-decoupled/editor'
import { graphql } from '~/graphql/gql.tada'

import {
  fieldCard,
  fieldText,
  fieldTextArea,
} from '~/integration/editor/fields'

import { CardGroup, type CardGroupProps } from '~/components/blocks'
import { MediaImageFragment } from '~/graphql/fragments/media'

const ParagraphSimpleCardFragment = graphql(
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

config.set({
  component: 'ParagraphCardGroup',
  fields: {
    heading: {
      type: fieldText,
    },
    subheadingOptional: {
      type: fieldText,
      config: {
        uiPropName: 'subheading',
        fieldName: 'subheading',
      },
    },
    descriptionOptional: {
      type: fieldTextArea,
      config: {
        uiPropName: 'description',
        fieldName: 'description',
      },
    },
    items: {
      type: fieldCard,
      config: {
        uiPropName: 'cards',
      },
      transformers: [
        {
          element: '/{uiPropName}',
          operations: [
            { operation: 'add', path: 'type', value: 'simple', type: 'string' },
          ],
        },
      ],
    },
  },
  defaultProps: CardGroup.defaults,
})

const ParagraphCardGroup: Component = {
  fields: config.getFields('ParagraphCardGroup'),
  defaultProps: config.parseDefaultProps('ParagraphCardGroup'),
  render: (props) => {
    const cardGroup = config.parseUIProps(
      'ParagraphCardGroup',
      props
    ) as CardGroupProps

    return <CardGroup {...cardGroup} />
  },
}

export { ParagraphCardGroup }
