import { FragmentOf, readFragment } from 'gql.tada'
import { LinkFragment } from '@/graphql/drupal/fragments/misc'
import {
  ParagraphLogoGroupFragment,
  ParagraphLogoFragment,
} from '@/graphql/drupal/fragments/paragraph'
import { extractImageFromMedia } from '@/graphql/drupal/helpers'

interface ParagraphHeroProps {
  paragraph: FragmentOf<typeof ParagraphLogoGroupFragment>
}

export const ParagraphLogoGroupResolver = ({
  paragraph,
}: ParagraphHeroProps) => {
  const { id, heading, items } = readFragment(
    ParagraphLogoGroupFragment,
    paragraph
  )
  const logos = items
    ? items.map((item) => {
        const {
          id,
          link: linkFragment,
          image,
        } = readFragment(
          ParagraphLogoFragment,
          item as FragmentOf<typeof ParagraphLogoFragment>
        )
        const { text, href, internal } = readFragment(
          LinkFragment,
          linkFragment
        )

        return {
          id,
          image: {
            ...extractImageFromMedia(image),
            className: 'h-12',
          },
          link: {
            text,
            href,
            internal,
          },
        }
      })
    : []

  return {
    id,
    heading,
    logos,
  }
}
