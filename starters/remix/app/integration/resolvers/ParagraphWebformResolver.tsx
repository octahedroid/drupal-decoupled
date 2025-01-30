import {
  type Component,
  fieldText,
  fieldTextArea,
  fieldWebform,
} from '~/integration/editor'
import { Parser } from '~/integration/resolvers/Parser'

const parser = new Parser()

parser.with({
  element: '/',
  operations: [
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
  ],
})

type WebformElement = {
  webform_key: string
  title: string
  type: string
}

type Webform = {
  id: string
  elements: WebformElement[]
}

type WebformProps = {
  heading: string
  subheading: string
  description: string
  form: string
  webform: Webform
}

const defaultProps = {
  heading: 'Contact us',
  subheading:
    'Let us know how we can help your organization or project, and we’ll get back to you soon.',
  description: 'Fill out the form below to get in touch with us.',
  form: 'contact',
  webform: {
    id: 'none',
    elements: [],
  },
}

export const ParagraphWebform: Component = {
  fields: {
    heading: fieldText,
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
    webform: {
      ...fieldWebform,
    },
  },
  defaultProps: parser.apply({ data: defaultProps, target: 'data' }),
  resolveData: async (data) => {
    // @todo: Extract this to a helper function
    const getWebform = async (id: string) => {
      if (id === 'none') {
        return {
          id: id,
          elements: [],
        }
      }

      const { elements } = (await fetch(
        `/api/editor/webform/${id}`
      ).then((res) => res.json())) as Webform

      return {
        id: id,
        elements,
      }
    }

    const { elements } = await getWebform(data.props.webform.id)

    return {
      props: {
        heading: data.props.heading || '',
        subheadingOptional: data.props.subheadingOptional || '',
        descriptionOptional: data.props.descriptionOptional || '',
        webform: {
          ...data.props.webform,
          elements,
        },
      },
    }
  },
  render: (props) => {
    const { description, heading, subheading, webform } = parser.apply({
      data: props,
      target: 'ui',
    }) as WebformProps

    return (
      <div>
        <pre>
          {JSON.stringify(
            { description, heading, subheading, webform },
            null,
            2
          )}
        </pre>
      </div>
    )
  },
}
