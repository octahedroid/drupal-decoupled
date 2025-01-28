import { FAQ } from '~/components/ui'
import {
  Component,
  fieldText,
  fieldTextArea,
  fieldRichText,
} from '~/components/resolvers/types'
import { FAQProps } from '~/components/ui/FAQ/FAQ'
import { Parser } from '~/components/resolvers/helpers/parser'

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

const defaultProps = {
  heading: 'Frequently asked questions',
  description:
    'Frequently asked questions ordered by popularity. Remember that if the visitor has not committed to the call to action, they may still have questions (doubts) that can be answered.',
  questions: [
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day money-back guarantee for all our products. If you',
    },
    {
      question: 'How long does shipping take?',
      answer:
        'Shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders.',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we ship to most countries worldwide. Shipping costs and delivery times may vary depending on the destination.',
    },
    {
      question: 'Are your products eco-friendly?',
      answer:
        'We strive to use sustainable materials and eco-friendly packaging whenever possible. Many of our products are made from recycled or biodegradable materials.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can reach our customer support team via email at support@example.com or by phone at 1-800-123-4567, Monday through Friday, 9am to 5pm EST.',
    },
  ],
} as FAQProps

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
  defaultProps: parser.apply({ data: defaultProps, target: 'data' }),
  render: (props) => {
    const faq = parser.apply({ data: props, target: 'ui' }) as FAQProps

    return <FAQ {...faq} />
  },
}
