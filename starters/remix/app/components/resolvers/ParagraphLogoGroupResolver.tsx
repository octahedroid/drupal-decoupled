import {
  Component,
  fieldLink,
  fieldMediaExternal,
  fieldText,
} from '~/components/resolvers/types'
import { Parser } from '~/components/resolvers/helpers/parser'
import { LogoGroup, type LogoGroupProps } from '~/components/blocks'

const parser = new Parser()

parser
  .with({
    element: '/',
    operations: [
      { operation: 'rename', source: 'items', destination: 'logos' },
    ],
  })
  .with({
    element: '/logos[*].image',
    preset: { preset: 'mediaImage', property: 'mediaImage' },
  })
  .with({
    element: '/logos[*].image',
    operations: [
      { operation: 'add', path: 'className', value: 'h-12', type: 'string' },
    ],
  })
  .with({
    element: '/logos[*].link',
    preset: { preset: 'link' },
  })

export const ParagraphLogoGroup: Component = {
  fields: {
    heading: fieldText,
    items: {
      type: 'array',
      arrayFields: {
        link: fieldLink,
        image: fieldMediaExternal,
      },
    },
  },
  defaultProps: parser.apply({ data: LogoGroup.defaultProps, target: 'data' }),
  render: (props) => {
    const logoGroup = parser.apply({
      data: props,
      target: 'ui',
    }) as LogoGroupProps

    return <LogoGroup {...logoGroup} />
  },
}
