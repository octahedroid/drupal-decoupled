import { FragmentOf, readFragment } from 'gql.tada'
import {
  ParagraphViewReferenceFragment,
  ViewBlogTeaserResultFragment,
  ViewBlogTeaserFeaturedResultFragment,
} from '@/graphql/drupal/fragments/paragraph'
import { NodeArticleTeaserFragment } from '@/graphql/drupal/fragments/node'
import { extractImageFromMedia } from '@/graphql/drupal/helpers'
import { LinkFragment } from '@/graphql/drupal/fragments/misc'

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

export const ParagraphViewReferenceResolver = ({
  paragraph,
}: ParagraphViewReferenceProps) => {
  const {
    id,
    headingOptional,
    descriptionOptional,
    subheadingOptional,
    actionOptional,
    reference: referenceFragment,
  } = readFragment(ParagraphViewReferenceFragment, paragraph)
  const action = !actionOptional
    ? readFragment(LinkFragment, actionOptional)
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
          image: extractImageFromMedia(image),
        }
      })
    : []

  return {
    id,
    view,
    display,
    heading: headingOptional || undefined,
    description: descriptionOptional || undefined,
    subheading: subheadingOptional || undefined,
    cards,
    action,
  }
}
