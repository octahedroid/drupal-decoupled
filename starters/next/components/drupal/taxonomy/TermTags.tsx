import { FragmentOf, readFragment } from 'gql.tada'
import { TermTagsFragment } from '@/graphql/drupal/fragments/terms'

type TermTagsComponentProps = {
  term: FragmentOf<typeof TermTagsFragment>
}

export default function TermTagsComponent({ term }: TermTagsComponentProps) {
  const termTags = readFragment(TermTagsFragment, term)

  return (
    <>
      {/* <Heading level="h2">{termTags.name}</Heading> */}
      <div
        dangerouslySetInnerHTML={{
          __html: termTags.description.processed as string,
        }}
      />
    </>
  )
}
