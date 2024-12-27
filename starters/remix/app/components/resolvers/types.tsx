import {
  ComponentConfig,
  ComponentData,
  Field as PuckField,
} from '@measured/puck'

export type Component = Omit<
  ComponentConfig<any, any, Omit<ComponentData<any, string>, 'type'>>,
  'type'
>

export type Field = PuckField & {
  config?: {
    fieldName?: string
  }
}

export const fieldText: Field = {
  type: 'text',
}

export const fieldTextArea: Field = {
  type: 'textarea',
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
    // Use GraphQL to fetch media items
    return [
      {
        id: 'f75244df-c71b-45f8-af30-60466cfd0711',
        __typename: 'MediaImage',
        mediaImage: {
          __typename: 'Image',
          title: null,
          url: 'http://drupal-decoupled.ddev.site/sites/default/files/2024-09/logo-next-160x64.png',
          width: 160,
          height: 64,
          alt: 'Next.js',
          size: 1690,
        },
      },
      {
        id: '905a0695-daf8-4002-a8a4-063440a59499',
        __typename: 'MediaImage',
        mediaImage: {
          __typename: 'Image',
          title: null,
          url: 'http://drupal-decoupled.ddev.site/sites/default/files/2024-09/logo-tailwindcss-160x64.png',
          width: 160,
          height: 64,
          alt: 'Tailwind',
          size: 2165,
        },
      },
      {
        id: 'd1c6efd8-9188-4dd3-8dd2-dd8a7dc7f473',
        __typename: 'MediaImage',
        mediaImage: {
          __typename: 'Image',
          title: null,
          url: 'http://drupal-decoupled.ddev.site/sites/default/files/2024-09/hero-landscape-large.png',
          width: 1280,
          height: 720,
          alt: 'hero-landscape',
          size: 55192,
        },
      },
      {
        id: '678da590-ee20-45e2-859c-3ad8d6d0f633',
        __typename: 'MediaImage',
        mediaImage: {
          __typename: 'Image',
          title: null,
          url: 'http://drupal-decoupled.ddev.site/sites/default/files/2024-09/drupal-decoupled_0.png',
          width: 1275,
          height: 675,
          alt: 'drupal-decoupled',
          size: 22285,
        },
      },
      {
        id: '5206febf-a64b-4066-85dd-0672a44a493f',
        __typename: 'MediaImage',
        mediaImage: {
          __typename: 'Image',
          title: null,
          url: 'http://drupal-decoupled.ddev.site/sites/default/files/2024-09/landscape-large.png',
          width: 1280,
          height: 720,
          alt: 'landscape-large',
          size: 8494,
        },
      },
      {
        id: 'dbe427b7-1553-4d94-9ad5-63d855dc3bdc',
        __typename: 'MediaImage',
        mediaImage: {
          __typename: 'Image',
          title: null,
          url: 'http://drupal-decoupled.ddev.site/sites/default/files/2024-09/404-landscape-large.png',
          width: 1280,
          height: 720,
          alt: '404-landscape-large',
          size: 65524,
        },
      },
      {
        id: '33f12057-a61c-4a5a-8468-59bc92924464',
        __typename: 'MediaImage',
        mediaImage: {
          __typename: 'Image',
          title: null,
          url: 'http://drupal-decoupled.ddev.site/sites/default/files/2024-09/drupal-decoupled.png',
          width: 48,
          height: 48,
          alt: 'drupal-decoupled-icon',
          size: 726,
        },
      },
      {
        id: 'b2ac63e7-9f1a-4ee5-8f23-fb3d89bcbd29',
        __typename: 'MediaImage',
        mediaImage: {
          __typename: 'Image',
          title: null,
          url: 'http://drupal-decoupled.ddev.site/sites/default/files/2024-09/logo-graphql-160x64.png',
          width: 160,
          height: 64,
          alt: 'GraphQL',
          size: 2627,
        },
      },
      {
        id: '1d026c14-b0f0-4533-90ba-05dae7a5dc53',
        __typename: 'MediaImage',
        mediaImage: {
          __typename: 'Image',
          title: null,
          url: 'http://drupal-decoupled.ddev.site/sites/default/files/2024-09/logo-drupal-160x64.png',
          width: 160,
          height: 64,
          alt: 'Drupal',
          size: 2364,
        },
      },
      {
        id: '05e73de7-c41c-4e74-b27d-9f04e4a48a3c',
        __typename: 'MediaImage',
        mediaImage: {
          __typename: 'Image',
          title: null,
          url: 'http://drupal-decoupled.ddev.site/sites/default/files/2024-09/logo-react-160x64.png',
          width: 160,
          height: 64,
          alt: 'React',
          size: 3369,
        },
      },
      {
        id: '39f86b4b-fd6c-4cf2-85e4-5f1be96ce52d',
        __typename: 'MediaImage',
        mediaImage: {
          __typename: 'Image',
          title: null,
          url: 'http://drupal-decoupled.ddev.site/sites/default/files/2024-09/avatar.png',
          width: 48,
          height: 48,
          alt: 'avatar',
          size: 1243,
        },
      },
      {
        id: 'df4ce4f9-e157-474b-afc1-1aaec5571723',
        __typename: 'MediaImage',
        mediaImage: {
          __typename: 'Image',
          title: null,
          url: 'http://drupal-decoupled.ddev.site/sites/default/files/2024-09/logo-remix-160x64.png',
          width: 160,
          height: 64,
          alt: 'Remix',
          size: 2022,
        },
      },
    ]
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
