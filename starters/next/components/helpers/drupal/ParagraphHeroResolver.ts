import { FragmentOf, readFragment } from 'gql.tada'
import { ParagraphHeroFragment } from '@/graphql/drupal/fragments/paragraph'
import { extractImageFromMedia } from '@/graphql/drupal/helpers'
import { LinkFragment } from '@/graphql/drupal/fragments/misc'

interface ParagraphHeroProps {
  paragraph: FragmentOf<typeof ParagraphHeroFragment>
}

export const ParagraphHeroResolver = ({ paragraph }: ParagraphHeroProps) => {
  const {
    id,
    heading,
    description,
    image: mediaImage,
    actions: actionsFragment,
  } = readFragment(ParagraphHeroFragment, paragraph)
  const image = extractImageFromMedia(mediaImage)
  const actions = actionsFragment
    ? actionsFragment.map((action) => readFragment(LinkFragment, action))
    : []

  return {
    id,
    heading,
    description,
    image,
    actions,
  }
}
