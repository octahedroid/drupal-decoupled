import { FragmentOf, readFragment } from 'gql.tada'
import { Testimonial } from '~/components/ui'
import {
  ParagraphAuthorFragment,
  ParagraphTestimonialFragment,
} from '~/graphql/fragments/paragraph'
import { Component, fieldAuthor, fieldText } from '~/components/resolvers/types'
import { resolveMediaImage } from '~/graphql/helpers'

const resolve = (
  paragraph: FragmentOf<typeof ParagraphTestimonialFragment>
) => {
  const { id, quote, author } = readFragment(
    ParagraphTestimonialFragment,
    paragraph
  )

  const { name, position, company, image } = readFragment(
    ParagraphAuthorFragment,
    author as FragmentOf<typeof ParagraphAuthorFragment>
  )

  return {
    id,
    quote,
    author: {
      name,
      position,
      company,
      avatar: resolveMediaImage(image),
    },
  }
}

export const ParagraphTestimonial: Component = {
  fields: {
    quote: fieldText,
    author: fieldAuthor,
  },
  render: (props) => {
    const { id, quote, author } = resolve(props)

    return <Testimonial id={id} key={id} quote={quote} author={author} />
  },
}
