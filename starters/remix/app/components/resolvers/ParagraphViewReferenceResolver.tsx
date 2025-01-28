import { CardGroup, Hero } from '~/components/blocks'
import {
  Component,
  fieldLink,
  fieldText,
  fieldTextArea,
  fieldViewReference,
} from '~/components/resolvers/types'
import { Parser } from '~/components/resolvers/helpers/parser'

const parser = new Parser()

parser
  .with({
    element: '/',
    operations: [
      {
        operation: 'rename',
        source: 'headingOptional',
        destination: 'heading',
      },
      {
        operation: 'rename',
        source: 'descriptionOptional',
        destination: 'description',
      },
      {
        operation: 'rename',
        source: 'subheadingOptional',
        destination: 'subheading',
      },
      {
        operation: 'rename',
        source: 'link',
        destination: 'action',
      },
    ],
  })
  .with({
    element: '/reference',
    operations: [
      {
        operation: 'rename',
        source: 'results',
        destination: 'cards',
      },
    ],
  })
  .with({
    element: '/reference.cards[*].image',
    preset: { preset: 'mediaImage', property: 'mediaImage' },
  })
  .with({
    element: '/reference.cards[*].author.picture',
    preset: { preset: 'mediaImage', property: 'mediaImage' },
  })
  .with({
    element: '/action',
    preset: { preset: 'link', skipIfEmpty: true },
  })

type ViewReferenceData = {
  id: string
  view: string
  display: string
  results: []
}

type ViewReference = {
  view: string
  display: string
  cards: []
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

export const ParagraphViewReference: Component = {
  fields: {
    headingOptional: {
      ...fieldText,
      label: 'heading',
      config: {
        fieldName: 'heading',
      },
    },
    subheadingOptional: {
      ...fieldText,
      label: 'subheading',
      config: {
        fieldName: 'subheading',
      },
    },
    descriptionOptional: {
      ...fieldTextArea,
      label: 'description',
      config: {
        fieldName: 'description',
      },
    },
    // @todo: Create fieldViewReferenceExternal 'external' field type.
    reference: fieldViewReference,
    link: fieldLink,
  },
  defaultProps: parser.apply({ data: defaultProps, target: 'data' }),
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
        `/visual_editor/viewReference/${view}/${display}`
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
        descriptionOptional: data.props.headingOptional || '',
        reference: {
          ...data.props.reference,
          results: reference ? reference.results : data.props.reference.results,
        },
        link: data.props.link || {},
      },
    }
  },
  render: (props) => {
    const viewReference = parser.apply({
      data: props,
      target: 'ui',
    }) as ViewReferenceProps
    const {
      id,
      heading,
      subheading,
      description,
      reference: { view, display, cards },
      action,
    } = viewReference

    if (view === 'blog' && display === 'teaser_featured' && cards.length > 0) {
      const featured = cards[0] as any
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

    if (view === 'blog' && display === 'teaser') {
      return (
        <CardGroup
          id={`${view}-${display}-${id}`}
          key={id}
          heading={heading}
          subheading={subheading}
          description={description}
          cards={cards}
          action={action}
        />
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
