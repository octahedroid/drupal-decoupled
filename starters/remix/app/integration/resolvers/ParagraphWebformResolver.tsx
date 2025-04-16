import { FragmentOf, readFragment } from 'gql.tada'
import { ContactForm } from '~/integration/forms/ContactForm/ContactForm'

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
  const { heading, subheadingOptional, descriptionOptional, form } =
    readFragment(ParagraphWebformFragment, paragraph)

  return (
    <div className="container mx-auto grid items-center gap-8 pt-8 pb-8 lg:grid-cols-2">
      <div>
        <h2>{heading}</h2>
        {subheadingOptional && <h3>{subheadingOptional}</h3>}
        {descriptionOptional && (
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: descriptionOptional }}
          />
        )}
        {form && (
          <div className="pt-8">
            <ContactForm />
          </div>
        )}
      </div>
      {/* <pre>
        {JSON.stringify(
          { id, descriptionOptional, heading, subheadingOptional, form },
          null,
          2
        )}
      </pre> */}
    </div>
  )
}
