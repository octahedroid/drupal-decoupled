import { Component, fieldAuthor, fieldText } from '~/components/resolvers/types'
import { Testimonial, type TestimonialProps } from '~/components/blocks'
import { Parser } from '~/components/resolvers/Parser'

const parser = new Parser()

parser
  .with({
    element: '/author.image',
    preset: { preset: 'mediaImage', property: 'mediaImage' },
  })
  .with({
    element: '/author',
    operations: [
      { operation: 'rename', source: 'image', destination: 'avatar' },
    ],
  })

export const ParagraphTestimonial: Component = {
  fields: {
    quote: fieldText,
    author: fieldAuthor,
  },
  defaultProps: parser.apply({ data: Testimonial.defaults, target: 'data' }),
  render: (props) => {
    const testimonial = parser.apply({
      data: props,
      target: 'ui',
    }) as TestimonialProps

    return <Testimonial {...testimonial} />
  },
}
