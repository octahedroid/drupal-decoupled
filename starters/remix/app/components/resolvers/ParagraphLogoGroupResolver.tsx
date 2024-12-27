import { FragmentOf, readFragment } from 'gql.tada'
import { LogoGroup } from '~/components/ui'
import { LinkFragment } from '~/graphql/drupal/fragments/misc'
import {
  ParagraphLogoGroupFragment,
  ParagraphLogoFragment,
} from '~/graphql/drupal/fragments/paragraph'
import { Component, fieldLink, fieldMediaExternal, fieldText } from '~/components/resolvers/types'
import { parseLink, parseMediaImage } from '~/graphql/drupal/helpers'

const resolve = (paragraph: FragmentOf<typeof ParagraphLogoGroupFragment>) => {
  const { id, heading, items } = readFragment(
    ParagraphLogoGroupFragment,
    paragraph
  )
  const logos = items
    ? items.map((item) => {
        const {
          id,
          link,
          image,
        } = readFragment(
          ParagraphLogoFragment,
          item as FragmentOf<typeof ParagraphLogoFragment>
        )

        return {
          id,
          image: {
            ...parseMediaImage(image),
            className: 'h-12',
          },
          link: parseLink(readFragment(LinkFragment, link))
        }
      })
    : []

  return {
    id,
    heading,
    logos,
  }
}

export const ParagraphLogoGroup: Component = {
  fields: {
    heading: fieldText,
    items: {
      type: "array",
      arrayFields: {
        link: fieldLink,
        image: fieldMediaExternal,
      },
    },
  },
  render: (props) => {
    const { id, heading, logos } = resolve(props)

    return <LogoGroup id={id} key={id} heading={heading} logos={logos} />
  },
}
