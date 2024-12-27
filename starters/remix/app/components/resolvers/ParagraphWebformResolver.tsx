import { FragmentOf, readFragment } from 'gql.tada'
import { Component, fieldText, fieldTextArea } from '~/components/resolvers/types'
import { ParagraphWebformFragment } from '~/graphql/fragments'

const resolve = (paragraph: FragmentOf<typeof ParagraphWebformFragment>) => {
  const {
    id,
    heading,
    subheadingOptional: subheading = '',
    descriptionOptional: description = '',
    form 
  } = readFragment(ParagraphWebformFragment, paragraph)

  return {
    id,
    heading,
    subheading,
    description,
    form,
  }
}

export const ParagraphWebform: Component = {
  fields: {
    heading: fieldText,
    subheadingOptional: {
      ...fieldText,
      label: 'subheading',
      ...{
        config: {
          fieldName: 'subheading',
        }
      }
    },
    descriptionOptional: {
      ...fieldTextArea,
      label: 'description',
      ...{
        config: {
          fieldName: 'description',
        }
      }
    },
  },
  resolveData: async (data) => {
    const props = resolve(data.props)
    return {
      props: {
        subheadingOptional: props.subheading,
        descriptionOptional: props.description,
      },
    }
  },
  render: (props) => {
    const webform  = resolve(props)

    return (
      <div className="container mx-auto items-center gap-8 lg:grid-cols-2 mt-10 mb-10">
        <p>Component resolver pending to implement</p>
        <pre>{JSON.stringify(webform, null, 2)}</pre>
      </div>
    )
  },
}
