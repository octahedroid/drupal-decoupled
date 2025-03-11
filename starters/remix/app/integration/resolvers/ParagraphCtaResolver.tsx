import { type Component, config } from 'drupal-decoupled/editor'
import { graphql } from '~/graphql/gql.tada'

import {
  fieldText,
  fieldTextArea,
  fieldLinks,
} from '~/integration/editor/fields'

import { CTA, type CTAProps } from '~/components/blocks'
import { LinkFragment } from '~/graphql/fragments/misc'

export const ParagraphCtaFragment = graphql(
  `
    fragment ParagraphCtaFragment on ParagraphCta {
      __typename
      id
      heading
      description
      subheading
      actions {
        ...LinkFragment
      }
    }
  `,
  [LinkFragment]
)

config.set({
  component: 'ParagraphCta',
  fields: {
    heading: {
      type: fieldText,
    },
    description: {
      type: fieldTextArea,
    },
    actions: {
      type: fieldLinks,
    },
  },
  defaultProps: CTA.defaults,
})

const ParagraphCta: Component = {
  fields: config.getFields('ParagraphCta'),
  defaultProps: config.parseDefaultProps('ParagraphCta'),
  render: (props) => {
    const cta = config.parseUIProps('ParagraphCta', props) as CTAProps

    return <CTA {...cta} />
  },
}

export { ParagraphCta }
