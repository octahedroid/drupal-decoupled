import { LogoGroup } from '~/components/ui'
import {
  Component,
  fieldLink,
  fieldMediaExternal,
  fieldText,
} from '~/components/resolvers/types'
import { Parser } from '~/components/resolvers/helpers/parser'
import { LogoGroupProps } from '~/components/ui/LogoGroup/LogoGroup'

const parser = new Parser()

parser
  .with({
    element: '/',
    operations: [
      { operation: 'rename', source: 'items', destination: 'logos' },
    ],
  })
  .with({
    element: '/logos[*].image',
    preset: { preset: 'mediaImage', property: 'mediaImage' },
  })
  .with({
    element: '/logos[*].image',
    operations: [
      { operation: 'add', path: 'className', value: 'h-12', type: 'string' },
    ],
  })
  .with({
    element: '/logos[*].link',
    preset: { preset: 'link' },
  })

const defaultProps = {
  heading: "Trusted by the world's best companies",
  logos: [
    {
      image: {
        src: 'https://shop.raceya.fit/wp-content/uploads/2020/11/logo-placeholder.jpg',
        alt: 'Octahedroid',
        className: 'h-12',
      },
      link: { href: 'https://octahedroid.com', internal: false },
    },
    {
      image: {
        src: 'https://shop.raceya.fit/wp-content/uploads/2020/11/logo-placeholder.jpg',
        alt: 'Composabase',
        className: 'h-12',
      },
      link: { href: 'https://composabase.com', internal: false },
    },
    {
      image: {
        src: 'https://shop.raceya.fit/wp-content/uploads/2020/11/logo-placeholder.jpg',
        alt: 'Octahedroid',
        className: 'h-12',
      },
      link: { href: 'https://octahedroid.com', internal: false },
    },
    {
      image: {
        src: 'https://shop.raceya.fit/wp-content/uploads/2020/11/logo-placeholder.jpg',
        alt: 'Composabase',
      },
      link: { href: 'https://composabase.com', internal: false },
    },
    {
      image: {
        src: 'https://shop.raceya.fit/wp-content/uploads/2020/11/logo-placeholder.jpg',
        alt: 'Octahedroid',
      },
      link: { href: 'https://octahedroid.com', internal: false },
    },
    {
      image: {
        src: 'https://shop.raceya.fit/wp-content/uploads/2020/11/logo-placeholder.jpg',
        alt: 'Composabase',
      },
      link: { href: 'https://composabase.com', internal: false },
    },
  ],
} as LogoGroupProps

export const ParagraphLogoGroup: Component = {
  fields: {
    heading: fieldText,
    items: {
      type: 'array',
      arrayFields: {
        link: fieldLink,
        image: fieldMediaExternal,
      },
    },
  },
  defaultProps: parser.apply({ data: defaultProps, target: 'data' }),
  render: (props) => {
    const logoGroup = parser.apply({
      data: props,
      target: 'ui',
    }) as LogoGroupProps

    return <LogoGroup {...logoGroup} />
  },
}
