import { FragmentOf, readFragment } from 'gql.tada'
import { ParagraphCtaFragment } from '@/graphql/drupal/fragments/paragraph'
import { LinkFragment } from '@/graphql/drupal/fragments/misc'

interface ParagraphCtaProps {
  paragraph: FragmentOf<typeof ParagraphCtaFragment>
}

export const ParagraphCtaResolver = ({ paragraph }: ParagraphCtaProps) => {
  const {
    id,
    heading,
    description,
    actions: actionsFragment,
  } = readFragment(ParagraphCtaFragment, paragraph)
  const actions = actionsFragment
    ? actionsFragment.map((action) => readFragment(LinkFragment, action))
    : []

  return {
    id,
    heading,
    description,
    actions,
  }
}
