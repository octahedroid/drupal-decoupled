import { FragmentOf, readFragment } from 'gql.tada'
import { ContactForm } from '@/integration/forms/ContactForm/ContactForm'

import { WebformFragment } from '@/graphql/fragments/webform'
import { graphql } from '@/graphql/gql.tada'

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
    <div className="container mx-auto py-8 md:py-16 lg:py-24">
      <div>
        <h2 className="mb-5 text-3xl font-bold sm:text-4xl md:text-5xl">
          {heading}
        </h2>
        {subheadingOptional && (
          <h3 className="mb-3 text-xl">{subheadingOptional}</h3>
        )}
        {descriptionOptional && (
          <p
            className="text-muted-foreground mb-5 text-lg"
            dangerouslySetInnerHTML={{ __html: descriptionOptional }}
          />
        )}
        {form && (
          <div className="py-8 md:py-16 lg:py-24">
            <ContactForm />
          </div>
        )}
      </div>
    </div>
  )
}
