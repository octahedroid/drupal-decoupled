import {
  Component,
  fieldMediaExternal,
  fieldText,
  fieldTextArea,
} from '~/components/resolvers/types'
import { CardGroup, type CardGroupProps } from '~/components/blocks'
import { Parser } from '~/components/resolvers/helpers/parser'

const parser = new Parser()

parser
  .with({
    element: '/',
    operations: [
      {
        operation: 'rename',
        source: 'subheadingOptional',
        destination: 'subheading',
      },
      {
        operation: 'rename',
        source: 'descriptionOptional',
        destination: 'description',
      },
      { operation: 'rename', source: 'items', destination: 'cards' },
    ],
  })
  .with({
    element: '/cards[*].image',
    preset: { preset: 'mediaImage', property: 'mediaImage' },
  })
  .with({
    element: '/cards',
    operations: [
      { operation: 'add', path: 'type', value: 'simple', type: 'string' },
    ],
  })

export const ParagraphCardGroup: Component = {
  fields: {
    heading: fieldText,
    subheadingOptional: {
      ...fieldText,
      label: 'subheading',
      config: {
        fieldName: 'subheading',
      },
    },
    descriptionOptional: {
      ...fieldTextArea,
      label: 'description',
      config: {
        fieldName: 'description',
      },
    },
    items: {
      type: 'array',
      arrayFields: {
        heading: fieldText,
        description: fieldTextArea,
        image: fieldMediaExternal,
      },
    },
  },
  defaultProps: parser.apply({ data: CardGroup.defaults, target: 'data' }),
  render: (props) => {
    const cardGroup = parser.apply({
      data: props,
      target: 'ui',
    }) as CardGroupProps

    return <CardGroup {...cardGroup} />
  },
}
