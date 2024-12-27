import { FragmentOf, readFragment } from 'gql.tada'
import { CTA } from '~/components/ui'
import {
  Component,
  fieldText,
  fieldTextArea,
  fieldLinks,
} from '~/components/resolvers/types'
import {
  ParagraphCtaFragment,
  LinkFragment,
} from '~/graphql/fragments'
import { resolveLink } from '~/components/resolvers/helpers'

const resolve = (paragraph: FragmentOf<typeof ParagraphCtaFragment>) => {
  const { id, heading, description, actions } = readFragment(
    ParagraphCtaFragment,
    paragraph
  )

  return {
    id,
    heading,
    description,
    actions: actions
      ? actions.map((action) =>
          resolveLink(action)
        )
      : [],
  }
}

export const ParagraphCta: Component = {
  fields: {
    heading: fieldText,
    description: fieldTextArea,
    actions: fieldLinks,
  },
  render: (props: FragmentOf<typeof ParagraphCtaFragment>) => {
    const { id, heading, description, actions } = resolve(props)

    return (
      <CTA
        id={id}
        key={id}
        heading={heading}
        description={description}
        actions={actions}
      />
    )
  },
}
