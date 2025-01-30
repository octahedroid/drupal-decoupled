import { Field } from '~/components/editor/types'

export const fieldText: Field = {
  type: 'text',
}

export const fieldTextArea: Field = {
  type: 'textarea',
}

export const fieldRichText: Field = {
  type: 'object',
  objectFields: {
    value: { type: 'textarea' },
    // @todo: Add format field "basic_html" | "full_html".
  },
}

export const fieldWebform: Field = {
  type: 'object',
  objectFields: {
    id: {
      type: 'select',
      options: [
        { value: 'none', label: 'Select Webform' },
        { value: 'contact', label: 'Contact' },
      ],
    },
    // @todo: Add array of elements.
  },
}

export const fieldLink: Field = {
  type: 'object',
  objectFields: {
    title: { type: 'text' },
    url: { type: 'text' },
  },
}

export const fieldLinks: Field = {
  type: 'array',
  arrayFields: fieldLink.objectFields,
}

export const fieldMediaExternal: Field = {
  type: 'external',
  fetchList: async () => {
    return await fetch(`/api/visual_editor/media_image`).then((res) =>
      res.json()
    )
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
  objectFields: {
    view: {
      type: 'select',
      options: [
        { value: 'none', label: 'Select View' },
        { value: 'blog', label: 'Blog' },
      ],
    },
    display: {
      type: 'select',
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
  objectFields: {
    name: fieldText,
    company: fieldText,
    position: fieldText,
    // @todo: Rename image field as media or avatar in Drupal.
    image: fieldMediaExternal,
  },
}
