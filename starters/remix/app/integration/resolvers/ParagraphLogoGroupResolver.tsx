import { type Component, config } from 'drupal-decoupled/editor'
import { graphql } from '~/graphql/gql.tada'

import { fieldLogo, fieldText } from '~/integration/editor/fields'
import { LogoGroup, type LogoGroupProps } from '~/components/blocks'
import { MediaImageFragment } from '~/graphql/fragments/media'
import { LinkFragment } from '~/graphql/fragments/misc'

const ParagraphLogoFragment = graphql(
  `
    fragment ParagraphLogoFragment on ParagraphLogo {
      __typename
      id
      image {
        ...MediaImageFragment
      }
      link {
        ...LinkFragment
      }
    }
  `,
  [MediaImageFragment, LinkFragment]
)

export const ParagraphLogoGroupFragment = graphql(
  `
    fragment ParagraphLogoGroupFragment on ParagraphLogoGroup {
      __typename
      id
      heading
      items {
        ...ParagraphLogoFragment
      }
    }
  `,
  [ParagraphLogoFragment]
)

config.set({
  component: 'ParagraphLogoGroup',
  fields: {
    heading: {
      type: fieldText,
    },
    items: {
      type: fieldLogo,
      config: {
        uiPropName: 'logos',
      },
      transformers: [
        {
          element: '/{uiPropName}[*].image',
          operations: [
            {
              operation: 'add',
              path: 'className',
              value: 'h-12',
              type: 'string',
            },
          ],
        },
      ],
    },
  },
  defaultProps: LogoGroup.defaults,
})

const ParagraphLogoGroup: Component = {
  fields: config.getFields('ParagraphLogoGroup'),
  defaultProps: config.parseDefaultProps('ParagraphLogoGroup'),
  render: (props) => {
    const logoGroup = config.parseUIProps(
      'ParagraphLogoGroup',
      props
    ) as LogoGroupProps

    return <LogoGroup {...logoGroup} />
  },
}

export { ParagraphLogoGroup }
