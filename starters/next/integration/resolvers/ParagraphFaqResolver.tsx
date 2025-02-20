import { type Component, config } from 'drupal-decoupled/editor'

import {
  fieldText,
  fieldTextArea,
  fieldQuestion,
} from '@/integration/editor/fields'

import { FAQ, type FAQProps } from '@/components/blocks'

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
