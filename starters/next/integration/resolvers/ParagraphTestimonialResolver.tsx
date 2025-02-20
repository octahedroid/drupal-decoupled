import { type Component, config } from 'drupal-decoupled/editor'

import { fieldAuthor, fieldText } from '@/integration/editor/fields'
import { Testimonial, type TestimonialProps } from '@/components/blocks'

config.set({
  component: 'ParagraphTestimonial',
  fields: {
    quote: {
      type: fieldText,
    },
    author: {
      type: fieldAuthor,
      transformers: [
        {
          element: '/{uiPropName}',
          operations: [
            { operation: 'rename', source: 'image', destination: 'avatar' },
          ],
        },
      ],
    },
  },
  defaultProps: Testimonial.defaults,
})

const ParagraphTestimonial: Component = {
  fields: config.getFields('ParagraphTestimonial'),
  defaultProps: config.parseDefaultProps('ParagraphTestimonial'),
  render: (props) => {
    const testimonial = config.parseUIProps(
      'ParagraphTestimonial',
      props
    ) as TestimonialProps

    return <Testimonial {...testimonial} />
  },
}

export { ParagraphTestimonial }
