import { CardGroup } from '~/components/ui'
import {
  Component,
  fieldMediaExternal,
  fieldText,
  fieldTextArea,
} from '~/components/resolvers/types'
import { CardGroupProps } from '~/components/ui/CardGroup/CardGroup'
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

const defaultProps = {
  heading: 'How it works?',
  subheading: 'Get started with our guides',
  description: null,
  cards: [
    {
      type: 'simple',
      heading: 'Discover ...',
      description:
        'Learn how to use Drupal as a headless CMS with our quick-start guides.',
      image: {
        src: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        alt: 'Discover',
        width: 300,
        height: 200,
      },
    },
    {
      type: 'simple',
      heading: 'Discover',
      description:
        'Learn how to use Drupal as a headless CMS with our quick-start guides.',
      image: {
        src: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        alt: 'Discover',
        width: 300,
        height: 200,
      },
    },
    {
      type: 'simple',
      heading: 'Discover',
      description:
        'Learn how to use Drupal as a headless CMS with our quick-start guides.',
      image: {
        src: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        alt: 'Discover',
        width: 300,
        height: 200,
      },
    },
  ],
} as CardGroupProps

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
  defaultProps: parser.apply({ data: defaultProps, target: 'data' }),
  render: (props) => {
    const cardGroup = parser.apply({
      data: props,
      target: 'ui',
    }) as CardGroupProps

    return <CardGroup {...cardGroup} />
  },
}
