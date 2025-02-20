import type { Field } from 'drupal-decoupled/editor'

export const fieldText: Field = {
  type: 'text',
  config: {
    type: 'string',
  },
}

export const fieldTextArea: Field = {
  type: 'textarea',
  config: {
    type: 'string_long',
  },
}

export const fieldRichText: Field = {
  type: 'object',
  config: {
    type: 'text_long',
  },
  objectFields: {
    // @todo: render as WYSIWYG editor.
    value: { type: 'textarea' },
    // @todo: Add format field "basic_html" | "full_html".
  },
}

export const fieldWebform: Field = {
  type: 'object',
  config: {
    type: 'webform',
  },
  objectFields: {
    id: {
      type: 'select',
      // @todo: Fetch and load webforms from Drupal.
      options: [
        { value: 'none', label: 'Select Webform' },
        { value: 'contact_form', label: 'Contact' },
      ],
    },
  },
}

export const fieldLink: Field = {
  type: 'object',
  config: {
    type: 'link',
    preset: {
      element: '/{uiPropName}',
      type: 'link',
    },
  },
  objectFields: {
    title: { type: 'text' },
    url: { type: 'text' },
  },
}

export const fieldLinks: Field = {
  type: 'array',
  config: {
    type: 'link',
    preset: {
      element: '/{uiPropName}',
      type: 'link',
    },
  },
  arrayFields: {
    title: { type: 'text' },
    url: { type: 'text' },
  },
}

export const fieldMediaImageExternal: Field = {
  type: 'external',
  config: {
    type: 'media',
    media: {
      type: 'image',
      fieldName: 'mediaImage',
    },
    preset: {
      element: '/{uiPropName}',
      type: 'mediaImage',
      property: '{mediaFieldName}',
    },
  },
  fetchList: async () => {
    return await fetch(`/api/editor/media_image`).then((res) => res.json())
  },
  // @ts-expect-error getItemSummary can return React elements.
  getItemSummary: (item) => {
    return <img src={item.mediaImage.url} alt={item.mediaImage.alt} />
  },
  mapRow: (item) => ({
    'media.image': <img src={item.mediaImage.url} alt={item.mediaImage.alt} />,
    title: item.title || item.mediaImage.alt,
  }),
}

export const fieldViewReference: Field = {
  type: 'object',
  config: {
    type: 'viewfield',
  },
  objectFields: {
    view: {
      type: 'select',
      // @todo: Fetch and load views from Drupal.
      options: [
        { value: 'none', label: 'Select View' },
        { value: 'blog', label: 'Blog' },
      ],
    },
    display: {
      type: 'select',
      // @todo: Fetch and load view-displays from Drupal.
      options: [
        { value: 'none', label: 'Select Display' },
        { value: 'teaser', label: 'Blog Teaser' },
        { value: 'teaser_featured', label: 'Blog Teaser Featured' },
      ],
    },
  },
}

export const fieldAuthor: Field = {
  type: 'object',
  config: {
    type: 'paragraph',
  },
  objectFields: {
    name: fieldText,
    company: fieldText,
    position: fieldText,
    // @todo: Rename image field as media or avatar in Drupal.
    image: fieldMediaImageExternal,
  },
}

export const fieldLogo: Field = {
  type: 'array',
  config: {
    type: 'paragraph',
  },
  arrayFields: {
    link: fieldLink,
    image: fieldMediaImageExternal,
  },
}

export const fieldCard: Field = {
  type: 'array',
  config: {
    type: 'paragraph',
  },
  arrayFields: {
    heading: fieldText,
    description: fieldTextArea,
    image: fieldMediaImageExternal,
  },
}

export const fieldQuestion: Field = {
  type: 'array',
  config: {
    type: 'paragraph',
  },
  arrayFields: {
    question: fieldText,
    answer: fieldRichText,
  },
}
