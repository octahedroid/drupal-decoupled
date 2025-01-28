import { Testimonial } from '~/components/ui'
import { Component, fieldAuthor, fieldText } from '~/components/resolvers/types'
import { TestimonialProps } from '~/components/ui/Testimonial/Testimonial'
import { Parser } from '~/components/resolvers/helpers/parser'

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

const defaultProps = {
  quote:
    "This product has completely transformed our workflow. It's intuitive, powerful, and addresses all the pain points we were experiencing with our previous solution.",
  author: {
    avatar: {
      src: 'https://shop.raceya.fit/wp-content/uploads/2020/11/logo-placeholder.jpg',
      alt: 'Doc Tahedroid',
      width: 40,
      height: 40,
    },
    name: 'Doc Tahedroid',
    position: 'CEO',
    company: 'Tech Innovators Inc.',
  },
} as TestimonialProps

export const ParagraphTestimonial: Component = {
  fields: {
    quote: fieldText,
    author: fieldAuthor,
  },
  defaultProps: parser.apply({ data: defaultProps, target: 'data' }),
  render: (props) => {
    const testimonial = parser.apply({
      data: props,
      target: 'ui',
    }) as TestimonialProps

    return <Testimonial {...testimonial} />
  },
}
