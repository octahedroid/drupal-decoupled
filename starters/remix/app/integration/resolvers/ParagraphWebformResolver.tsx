import { type Component, config } from 'drupal-decoupled/editor'

import {
  fieldText,
  fieldTextArea,
  fieldWebform,
} from '~/integration/editor/fields'

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
  form: Webform
}

const defaultProps = {
  heading: 'Contact us',
  subheading:
    'Let us know how we can help your organization or project, and we’ll get back to you soon.',
  description: 'Fill out the form below to get in touch with us.',
  form: {
    id: 'none',
    elements: [],
  },
}

config.set({
  component: 'ParagraphWebform',
  fields: {
    heading: {
      type: fieldText,
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
    form: {
      type: fieldWebform,
    },
  },
  defaultProps,
})

const ParagraphWebform: Component = {
  fields: config.getFields('ParagraphWebform'),
  defaultProps: config.parseDefaultProps('ParagraphWebform'),
  resolveData: async (data) => {
    // @todo: Extract this to a helper function
    const getWebform = async (id: string) => {
      if (id === 'none') {
        return {
          id: id,
          elements: [],
        }
      }

      const { elements } = (await fetch(`/api/editor/webform/${id}`).then(
        (res) => res.json()
      )) as Webform

      return {
        id: id,
        elements,
      }
    }

    const { elements } = await getWebform(data.props.form.id)

    return {
      props: {
        heading: data.props.heading || '',
        subheadingOptional: data.props.subheadingOptional || '',
        descriptionOptional: data.props.descriptionOptional || '',
        form: {
          ...data.props.form,
          elements,
        },
      },
    }
  },
  render: (props) => {
    const { description, heading, subheading, form } = config.parseUIProps(
      'ParagraphWebform',
      props
    ) as WebformProps

    return (
      <div>
        <pre>
          {JSON.stringify({ description, heading, subheading, form }, null, 2)}
        </pre>
      </div>
    )
  },
}

export { ParagraphWebform }
