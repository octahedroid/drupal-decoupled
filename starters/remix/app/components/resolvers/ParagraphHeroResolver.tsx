import { FragmentOf, readFragment } from 'gql.tada'
import { Hero } from '~/components/ui'
import { ParagraphHeroFragment } from '~/graphql/drupal/fragments/paragraph'
import { LinkFragment } from '~/graphql/drupal/fragments/misc'
import {
  parseLink,
  parseMediaImage,
} from '~/graphql/drupal/helpers'
import {
  Component,
  fieldText,
  fieldTextArea,
  fieldMediaExternal,
  fieldLinks,
} from '~/components/resolvers/types'

const resolve = (paragraph: FragmentOf<typeof ParagraphHeroFragment>) => {
  const { __typename, id, heading, description, image, actions } = readFragment(
    ParagraphHeroFragment,
    paragraph
  )

  return {
    __typename,
    id,
    heading,
    description,
    image: parseMediaImage(image),
    actions: actions
      ? actions.map((action) => parseLink(readFragment(LinkFragment, action)))
      : [],
  }
}

export const ParagraphHero: Component = {
  fields: {
    heading: fieldText,
    description: fieldTextArea,
    // @todo: Rename image field as media in Drupal.
    image: fieldMediaExternal,
    actions: fieldLinks,
  },
  render: (props: FragmentOf<typeof ParagraphHeroFragment>) => {
    const { id, heading, description, image, actions } = resolve(props)

    return (
      <Hero
        id={id}
        key={id}
        heading={heading}
        description={description}
        image={image}
        actions={actions}
      />
    )
  },
}
