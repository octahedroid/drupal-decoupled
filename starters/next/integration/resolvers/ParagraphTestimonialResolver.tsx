import { FragmentOf, readFragment } from 'gql.tada'

import { graphql } from '@/graphql/gql.tada'
import { MediaImageFragment } from '@/graphql/fragments/media'
import { resolveMediaImage } from '@/integration/resolvers/helpers'
import { Testimonial } from '@/components/blocks'

interface ParagraphTestimonialProps {
  paragraph: FragmentOf<typeof ParagraphTestimonialFragment>
}

const ParagraphAuthorFragment = graphql(
  `
    fragment ParagraphAuthorFragment on ParagraphAuthor {
      __typename
      id
      image {
        ...MediaImageFragment
      }
      name
      company
      position
    }
  `,
  [MediaImageFragment]
)

export const ParagraphTestimonialFragment = graphql(
  `
    fragment ParagraphTestimonialFragment on ParagraphTestimonial {
      __typename
      id
      quote
      author {
        __typename
        ...ParagraphAuthorFragment
      }
    }
  `,
  [ParagraphAuthorFragment]
)

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
  const image = resolveMediaImage(imageFragment)

  return (
    <Testimonial
      id={id}
      key={id}
      quote={quote}
      author={{
        name,
        position,
        company,
        avatar: image,
      }}
    />
  )
}
