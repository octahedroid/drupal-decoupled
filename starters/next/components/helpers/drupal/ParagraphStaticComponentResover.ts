import { FragmentOf, readFragment } from 'gql.tada'
import { ParagraphWebformFragment } from '@/graphql/drupal/fragments/paragraph'

interface ParagraphWebformProps {
  paragraph: FragmentOf<typeof ParagraphWebformFragment>
}

export const ParagraphWebformResolver = ({
  paragraph,
}: ParagraphWebformProps) => {
  const { id, heading, subheadingOptional, descriptionOptional, form } =
    readFragment(ParagraphWebformFragment, paragraph)

  return {
    id,
    heading,
    subheading: subheadingOptional,
    description: descriptionOptional,
    form,
  }
}
