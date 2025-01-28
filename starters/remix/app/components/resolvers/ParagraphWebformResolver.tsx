import { FormgenJSONSchema7 } from '@react-formgen/json-schema'
import {
  Component,
  fieldText,
  fieldTextArea,
  fieldWebform,
} from '~/components/resolvers/types'
import { Contact } from '~/components/webforms/Contact'
import { Parser } from '~/components/resolvers/helpers/parser'

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

      const { elements } = (await fetch(`/visual_editor/webform/${id}`).then(
        (res) => res.json()
      )) as Webform

      return {
        id: id,
        elements,
      }
    }

    const { elements } = await getWebform(data.props.webform.id)

    return {
      props: {
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

    type JSONSchemaProperties = Record<string, FormgenJSONSchema7>
    const properties: JSONSchemaProperties = {}
    const required: string[] = []

    if (webform && webform.elements) {
      const skipElements = ['actions']
      webform.elements.forEach((element) => {
        if (!element) {
          return {}
        }

        const { webform_key, title, type } = element

        if (!webform_key || !title || !type) {
          return {}
        }

        if (skipElements.includes(webform_key)) {
          return {}
        }

        properties[webform_key] = {
          title: `${title} - ${type}`,
          type: 'string', // TODO: Implement other types
        }

        // @todo: Extract field properties as required and others from Drupal.
        required.push(webform_key)
      })
    }

    const schema = {
      $schema: 'http://json-schema.org/draft-06/schema#',
      type: 'object',
      title: heading,
      description: description,
      properties: properties,
      required: required,
    } as FormgenJSONSchema7

    return (
      <Contact
        key={webform.id}
        heading={heading}
        subheading={subheading}
        description={description}
        schema={schema}
      />
    )
  },
}
