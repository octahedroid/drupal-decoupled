import { type Component, config } from 'drupal-decoupled/editor'

import {
  fieldText,
  fieldTextArea,
  fieldLinks,
} from '@/integration/editor/fields'

import { CTA, type CTAProps } from '@/components/blocks'

config.set({
  component: 'ParagraphCta',
  fields: {
    heading: {
      type: fieldText,
    },
    description: {
      type: fieldTextArea,
    },
    actions: {
      type: fieldLinks,
    },
  },
  defaultProps: CTA.defaults,
})

const ParagraphCta: Component = {
  fields: config.getFields('ParagraphCta'),
  defaultProps: config.parseDefaultProps('ParagraphCta'),
  render: (props) => {
    const cta = config.parseUIProps('ParagraphCta', props) as CTAProps

    return <CTA {...cta} />
  },
}

export { ParagraphCta }
