import { FragmentOf, readFragment } from 'gql.tada'
import {
  ParagraphCardGroupFragment,
  ParagraphSimpleCardFragment,
} from '@/graphql/drupal/fragments/paragraph'
import { extractImageFromMedia } from '@/graphql/drupal/helpers'

interface ParagraphCardGroupProps {
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>
}

export const ParagraphCardGroupResolver = ({
  paragraph,
}: ParagraphCardGroupProps) => {
  const { id, heading, subheadingOptional, items, descriptionOptional } =
    readFragment(ParagraphCardGroupFragment, paragraph)
  const cards = items
    ? items.map((item) => {
        const type = 'simple'
        const { heading, description, image } = readFragment(
          ParagraphSimpleCardFragment,
          item as FragmentOf<typeof ParagraphSimpleCardFragment>
        )

        return {
          heading,
          description,
          image: extractImageFromMedia(image),
          type,
        }
      })
    : []

  return {
    id,
    heading,
    description: descriptionOptional || null,
    subheading: subheadingOptional || null,
    cards,
    action: null,
  }
}
