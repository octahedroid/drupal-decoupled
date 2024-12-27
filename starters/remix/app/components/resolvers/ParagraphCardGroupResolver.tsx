import { FragmentOf, readFragment } from 'gql.tada'
import { CardGroup } from '~/components/ui'
import {
  Component,
  fieldLink,
  fieldMediaExternal,
  fieldText,
  fieldTextArea,
} from '~/components/resolvers/types'
import {
  ParagraphCardGroupFragment,
  ParagraphSimpleCardFragment,
} from '~/graphql/fragments'
import { resolveMediaImage } from '~/components/resolvers/helpers'

export const resolve = (
  paragraph: FragmentOf<typeof ParagraphCardGroupFragment>
) => {
  const {
    id,
    heading,
    subheadingOptional: subheading,
    descriptionOptional: description,
    items,
  } = readFragment(ParagraphCardGroupFragment, paragraph)
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
          image: resolveMediaImage(image),
          type,
        }
      })
    : []

  return {
    id,
    heading,
    description,
    subheading,
    cards,
    action: '',
  }
}

export const ParagraphCardGroup: Component = {
  fields: {
    heading: fieldText,
    subheadingOptional: {
      ...fieldText,
      label: 'subheading',
      ...{
        config: {
          fieldName: 'subheading',
        },
      },
    },
    descriptionOptional: {
      ...fieldTextArea,
      label: 'description',
      ...{
        config: {
          fieldName: 'description',
        },
      },
    },
    items: {
      type: 'array',
      arrayFields: {
        heading: fieldText,
        description: fieldTextArea,
        image: fieldMediaExternal,
        // type: fieldText,
      },
    },
    action: fieldLink,
  },
  render: (props) => {
    const { id, heading, subheading, description, cards } = resolve(props)
    return (
      <CardGroup
        id={id}
        key={id}
        heading={heading}
        subheading={subheading}
        description={description}
        cards={cards}
      />
    )
  },
}
