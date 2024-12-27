import { FragmentOf, readFragment } from 'gql.tada'
import { Hero } from '~/components/ui'
import {
  ParagraphHeroFragment,
  LinkFragment,
} from '~/graphql/fragments'
import {
  resolveLink,
  resolveMediaImage,
} from '~/components/resolvers/helpers'
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
    image: resolveMediaImage(image),
    actions: actions
      ? actions.map((action) => resolveLink(action))
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
