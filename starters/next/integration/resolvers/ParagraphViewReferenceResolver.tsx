import { type Component, config } from 'drupal-decoupled/editor'

import { CardGroup, CardGroupProps, Hero } from '@/components/blocks'
import {
  fieldLink,
  fieldText,
  fieldTextArea,
  fieldViewReference,
} from '@/integration/editor/fields'

type ViewReferenceData = {
  id: string
  view: string
  display: string
  results: []
}

type ViewReference = {
  view: string
  display: string
  cards: CardGroupProps['cards']
}

type ViewReferenceProps = {
  id: string
  heading: string
  subheading: string
  description: string
  reference: ViewReference
  action: {
    href: string
    internal: boolean
    text: string
  }
}

const defaultCardProps = [
  {
    image: {
      mediaImage: {},
    },
    author: {
      picture: {
        mediaImage: {},
      },
    },
    details: {
      href: '',
      text: '',
      internal: true,
    },
  },
]

const defaultProps = {
  heading: '',
  subheading: '',
  description: '',
  reference: {
    view: 'none',
    display: 'none',
    cards: defaultCardProps,
  },
  action: {
    href: '/blog',
    text: 'Blog',
    internal: true,
  },
}

config.set({
  component: 'ParagraphViewReference',
  fields: {
    headingOptional: {
      type: fieldText,
      config: {
        fieldName: 'heading',
        uiPropName: 'heading',
      },
    },
    subheadingOptional: {
      type: fieldText,
      config: {
        fieldName: 'subheading',
        uiPropName: 'subheading',
      },
    },
    descriptionOptional: {
      type: fieldTextArea,
      config: {
        fieldName: 'description',
        uiPropName: 'description',
      },
    },
    reference: {
      type: fieldViewReference,
      transformers: [
        {
          element: '/{uiPropName}',
          operations: [
            {
              operation: 'rename',
              source: 'results',
              destination: 'cards',
            },
          ],
        },
        {
          element: '/{uiPropName}.cards[*].image',
          preset: { preset: 'mediaImage', property: 'mediaImage' },
        },
        {
          element: '/{uiPropName}.cards[*].author.picture',
          preset: { preset: 'mediaImage', property: 'mediaImage' },
        },
        {
          element: '/{uiPropName}.cards',
          operations: [
            {
              operation: 'add',
              path: 'details',
              type: 'object',
              value: {
                href: '',
                text: 'View post',
                internal: true,
              },
            },
            {
              operation: 'rename',
              source: 'path',
              destination: 'details.href',
            },
          ],
        },
      ],
    },
    link: {
      type: fieldLink,
      config: {
        uiPropName: 'action',
        preset: {
          skipOnNull: true,
        },
      },
    },
  },
  defaultProps,
})

const ParagraphViewReference: Component = {
  fields: config.getFields('ParagraphViewReference'),
  defaultProps: config.parseDefaultProps('ParagraphViewReference'),
  resolveData: async (data) => {
    const getViewReference = async (view: string, display: string) => {
      if (view === 'none' || display === 'none') {
        return {
          view,
          display,
          results: defaultCardProps,
        }
      }

      const viewReference = (await fetch(
        `/api/editor/view_reference/${view}/${display}`
      ).then((res) => res.json())) as ViewReferenceData

      return viewReference
    }

    const reference = await getViewReference(
      data.props.reference.view,
      data.props.reference.display
    )

    return {
      props: {
        subheadingOptional: data.props.subheadingOptional || '',
        headingOptional: data.props.headingOptional || '',
        descriptionOptional: data.props.descriptionOptional || '',
        reference,
        link: data.props.link || {},
      },
    }
  },
  render: (props) => {
    const viewReference = config.parseUIProps(
      'ParagraphViewReference',
      props
    ) as ViewReferenceProps

    const {
      id,
      heading,
      subheading,
      description,
      reference: { view, display, cards },
      action,
    } = viewReference

    if (view === 'blog' && display === 'teaser_featured' && cards.length > 0) {
      const featured = cards.slice(0, 1)[0] as any
      const remainingCards = cards.splice(1)

      return (
        <div id={`${view}-${display}-${id}`}>
          <Hero
            heading={featured.heading}
            image={featured.image}
            description={featured.summary}
            actions={[
              {
                href: featured.path,
                text: featured.title,
                internal: true,
              },
            ]}
          />
          {cards && (
            <>CardGroup</>
            // <CardGroup
            //   key={id}
            //   heading={heading}
            //   subheading={subheading}
            //   description={description}
            //   cards={remainingCards}
            //   action={action}
            // />
          )}
        </div>
      )
    }

    if (view === 'blog' && display === 'teaser') {
      return ( <>CardGroup</>
        // <CardGroup
        //   id={`${view}-${display}-${id}`}
        //   key={id}
        //   heading={heading}
        //   subheading={subheading}
        //   description={description}
        //   cards={cards}
        //   action={action}
        // />
      )
    }

    return (
      <>
        <p>
          View Reference: <strong>{view}</strong> and Display:{' '}
          <strong>{display}</strong> not yet implemented.
        </p>
      </>
    )
  },
}

export { ParagraphViewReference }
