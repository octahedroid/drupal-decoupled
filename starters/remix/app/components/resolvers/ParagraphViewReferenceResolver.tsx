import { FragmentOf, readFragment } from 'gql.tada'
import { CardGroup, Hero, TeaserCardProps } from '~/components/ui'
import {
  ParagraphViewReferenceFragment,
  ViewBlogTeaserResultFragment,
  ViewBlogTeaserFeaturedResultFragment,
} from '~/graphql/drupal/fragments/paragraph'
import { NodeArticleTeaserFragment } from '~/graphql/drupal/fragments/node'
import { Component, fieldAuthor, fieldLink, fieldText, fieldTextArea } from '~/components/resolvers/types'
import { resolveLink, resolveMediaImage } from '~/graphql/drupal/helpers'
import { LinkFragment } from '~/graphql/drupal/fragments/misc'

type ReferenceFragment = (
  | FragmentOf<typeof ViewBlogTeaserResultFragment>
  | FragmentOf<typeof ViewBlogTeaserFeaturedResultFragment>
) & { __typename: string }

const calculateReference = (referenceFragment: ReferenceFragment) => {
  if (referenceFragment.__typename === 'ViewBlogTeaserResult') {
    return readFragment(
      ViewBlogTeaserResultFragment,
      referenceFragment as FragmentOf<typeof ViewBlogTeaserResultFragment>
    )
  }

  if (referenceFragment.__typename === 'ViewBlogTeaserFeaturedResult') {
    return readFragment(
      ViewBlogTeaserFeaturedResultFragment,
      referenceFragment as FragmentOf<
        typeof ViewBlogTeaserFeaturedResultFragment
      >
    )
  }
}

const resolve = (paragraph: FragmentOf<typeof ParagraphViewReferenceFragment>) => {
  const {
    id,
    headingOptional: heading = '',
    descriptionOptional: description = '',
    subheadingOptional: subheading = '',
    link: action,
    reference: referenceFragment,
  } = readFragment(ParagraphViewReferenceFragment, paragraph)

    const reference = calculateReference(referenceFragment)
  
    const { view, display, results } = reference
    ? reference
    : { view: undefined, display: undefined, results: undefined }
  
    const cards = results
    ? results.map((item) => {
      const type = 'teaser'
      const { image, path, summary, title } = readFragment(
        NodeArticleTeaserFragment,
        item as FragmentOf<typeof NodeArticleTeaserFragment>
      )
      const link = {
        href: path,
        text: 'Read post',
      }

      if (!image) {
        return { heading: title, summary, type, link }
      }

      return {
        heading: title,
        summary,
        type,
        link,
        image: resolveMediaImage(image)
      }
    })
    : []

  return {
    id,
    view,
    display,
    heading: heading || '',
    description: description || '',
    subheading: subheading || '',
    cards,
    action: action ? resolveLink(readFragment(LinkFragment, action)) : undefined,
  }
}

export const ParagraphViewReference: Component = {
  fields: {
    // @todo: Create View Reference 'external' field type.
    view: fieldText,
    display: fieldText,
    headingOptional: {
      ...fieldText,
      label: 'heading',
      ...{
        config: {
          fieldName: 'heading',
        }
      }
    },
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
    link: fieldLink,
  },
  defaultProps: {
    subheadingOptional: '',
  },
  resolveData: async (data) => {
    const props = resolve(data.props)
    return {
      props: {
        subheadingOptional: props.subheading,
        headingOptional: props.heading,
        descriptionOptional: props.description,
      },
    }
  },
  render: (props) => {
    const { id, view, display, heading, subheading, description, cards, action } = resolve(props)

    if (view === 'blog' && display === 'blog_featured') {
      const featured = cards[0]
      const remainingCards = cards.splice(1) as TeaserCardProps[]

      return (
        <div id={id}>
          <Hero
            heading={featured.heading}
            image={featured.image}
            description={featured.summary}
            actions={[
              {
                href: featured.link.href,
                text: featured.link.text,
                internal: true,
              },
            ]}
          />
          {cards && (
            <CardGroup
              key={id}
              heading={heading}
              subheading={subheading}
              description={description}
              cards={remainingCards}
              action={action}
            />
          )}
        </div>
      )
    }

    if (view === 'blog' && display === 'blog_teaser') {
      return (
        <CardGroup
          id={id}
          key={id}
          heading={heading}
          subheading={subheading}
          description={description}
          cards={cards as TeaserCardProps[]}
          action={action}
        />
      )
    }

    return <div>View Reference: {JSON.stringify({
      id,
      view,
      display,
    }, null , 2)}</div>
  }
}