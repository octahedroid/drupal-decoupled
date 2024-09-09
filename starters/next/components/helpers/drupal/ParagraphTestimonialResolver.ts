import { FragmentOf, readFragment } from 'gql.tada'
import {
  ParagraphAuthorFragment,
  ParagraphTestimonialFragment,
} from '@/graphql/drupal/fragments/paragraph'
import { extractImageFromMedia } from '@/graphql/drupal/helpers'

interface ParagraphTestimonialProps {
  paragraph: FragmentOf<typeof ParagraphTestimonialFragment>
}

export const ParagraphTestimonialResolver = ({
  paragraph,
}: ParagraphTestimonialProps) => {
  const {
    id,
    quote,
    author: authorFragment,
  } = readFragment(ParagraphTestimonialFragment, paragraph)
  const {
    name,
    position,
    company,
    image: imageFragment,
  } = readFragment(
    ParagraphAuthorFragment,
    authorFragment as FragmentOf<typeof ParagraphAuthorFragment>
  )
  const image = extractImageFromMedia(imageFragment)

  return {
    id,
    quote,
    author: {
      name,
      position,
      company,
      avatar: image,
    },
  }
}
