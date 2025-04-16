import { FragmentOf, readFragment } from 'gql.tada'

import { WebformFragment } from '~/graphql/fragments/webform'
import { graphql } from '~/graphql/gql.tada'

interface ParagraphWebformProps {
  paragraph: FragmentOf<typeof ParagraphWebformFragment>
}

export const ParagraphWebformFragment = graphql(
  `
    fragment ParagraphWebformFragment on ParagraphWebform {
      __typename
      id
      heading
      subheadingOptional: subheading
      descriptionOptional: description
      form {
        id
        __typename
        ...WebformFragment
      }
    }
  `,
  [WebformFragment]
)

export const ParagraphWebformResolver = ({
  paragraph,
}: ParagraphWebformProps) => {
  const { id, heading, subheadingOptional, descriptionOptional, form } =
    readFragment(ParagraphWebformFragment, paragraph)

  return (
    <div className="container mx-auto grid items-center gap-8 pt-8 pb-8 lg:grid-cols-2">
      <pre>
        {JSON.stringify(
          { id, descriptionOptional, heading, subheadingOptional, form },
          null,
          2
        )}
      </pre>
    </div>
  )
}
