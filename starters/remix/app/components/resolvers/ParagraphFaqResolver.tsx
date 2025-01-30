import {
  type Component,
  fieldText,
  fieldTextArea,
  fieldRichText,
} from '~/components/editor'
import { FAQ, type FAQProps } from '~/components/blocks'
import { Parser } from '~/components/resolvers/Parser'

const parser = new Parser()

parser
  .with({
    element: '/',
    operations: [
      {
        operation: 'rename',
        source: 'descriptionOptional',
        destination: 'description',
      },
      { operation: 'rename', source: 'items', destination: 'questions' },
    ],
  })
  .with({
    element: '/questions',
    preset: { preset: 'richText', property: 'answer' },
  })

export const ParagraphFaq: Component = {
  fields: {
    heading: fieldText,
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
        question: fieldText,
        answer: fieldRichText,
      },
    },
  },
  defaultProps: parser.apply({ data: FAQ.defaults, target: 'data' }),
  render: (props) => {
    const faq = parser.apply({ data: props, target: 'ui' }) as FAQProps

    return <FAQ {...faq} />
  },
}
