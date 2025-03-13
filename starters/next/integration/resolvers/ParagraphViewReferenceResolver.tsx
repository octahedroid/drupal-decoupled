import { graphql } from '@/graphql/gql.tada'

import { CardGroup, Hero } from '@/components/blocks'

import {
  ViewBlogTeaserResultFragment,
  ViewBlogTeaserFeaturedResultFragment,
} from '@/graphql/fragments/view'
import { LinkFragment } from '@/graphql/fragments/misc'
import { FragmentOf, readFragment } from 'gql.tada'
import { NodeArticleTeaserFragment } from '@/graphql/fragments/node'
import { resolveMediaImage } from './helpers'

interface ParagraphViewReferenceProps {
  paragraph: FragmentOf<typeof ParagraphViewReferenceFragment>
}

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

export const ParagraphViewReferenceFragment = graphql(
  `
    fragment ParagraphViewReference on ParagraphViewReference {
      __typename
      id
      headingOptional: heading
      subheadingOptional: subheading
      descriptionOptional: description
      link {
        ...LinkFragment
      }
      reference {
        __typename
        ...ViewBlogTeaserResultFragment
        ...ViewBlogTeaserFeaturedResultFragment
      }
    }
  `,
  [
    ViewBlogTeaserResultFragment,
    ViewBlogTeaserFeaturedResultFragment,
    LinkFragment,
  ]
)

export const ParagraphViewReferenceResolver = ({
  paragraph,
}: ParagraphViewReferenceProps) => {
  const {
    id,
    headingOptional,
    descriptionOptional,
    subheadingOptional,
    link: linkFragment,
    reference: referenceFragment,
  } = readFragment(ParagraphViewReferenceFragment, paragraph)

  const action = !linkFragment
    ? readFragment(LinkFragment, linkFragment)
    : undefined
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
          image: resolveMediaImage(image),
        }
      })
    : []

  if (view === 'blog' && display === 'teaser_featured') {
    const featured = cards[0]
    const remainingCards = cards.splice(1)

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
            heading={headingOptional || ''}
            subheading={subheadingOptional || ''}
            description={descriptionOptional || ''}
            cards={remainingCards}
            action={action}
          />
        )}
      </div>
    )
  }

  if (view === 'blog' && display === 'teaser') {
    return (
      <CardGroup
        id={id}
        key={id}
        heading={headingOptional || ''}
        subheading={subheadingOptional || ''}
        description={descriptionOptional || ''}
        cards={cards}
        action={action}
      />
    )
  }
}
