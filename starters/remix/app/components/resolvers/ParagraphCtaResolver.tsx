import {
  Component,
  fieldText,
  fieldTextArea,
  fieldLinks,
} from '~/components/resolvers/types'
import { CTA, type CTAProps } from '~/components/blocks'

import { Parser } from '~/components/resolvers/helpers/parser'
const parser = new Parser()

parser.with({
  element: '/actions',
  preset: { preset: 'link' },
})

export const ParagraphCta: Component = {
  fields: {
    heading: fieldText,
    description: fieldTextArea,
    actions: fieldLinks,
  },
  defaultProps: parser.apply({ data: CTA.defaults, target: 'data' }),
  render: (props) => {
    const cta = parser.apply({ data: props, target: 'ui' }) as CTAProps

    return <CTA {...cta} />
  },
}
