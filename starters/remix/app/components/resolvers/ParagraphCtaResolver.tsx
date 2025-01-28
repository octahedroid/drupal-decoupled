import { CTA } from '~/components/ui'
import {
  Component,
  fieldText,
  fieldTextArea,
  fieldLinks,
} from '~/components/resolvers/types'
import { CTAProps } from '../ui/CTA/CTA'

import { Parser } from '~/components/resolvers/helpers/parser'
const parser = new Parser()

parser.with({
  element: '/actions',
  preset: { preset: 'link' },
})

const defaultProps = {
  heading: 'Subscribe to our newsletter',
  description: 'Stay up to date with our latest news and updates.',
  actions: [{ text: 'Subscribe', href: '/subscribe', variant: 'default' }],
}

export const ParagraphCta: Component = {
  fields: {
    heading: fieldText,
    description: fieldTextArea,
    actions: fieldLinks,
  },
  defaultProps: parser.apply({ data: defaultProps, target: 'data' }),
  render: (props) => {
    const cta = parser.apply({ data: props, target: 'ui' }) as CTAProps

    return <CTA {...cta} />
  },
}
