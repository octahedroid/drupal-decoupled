import {
  Component,
  fieldText,
  fieldTextArea,
  fieldMediaExternal,
  fieldLinks,
} from '~/components/resolvers/types'
import { Hero, type HeroProps } from '~/components/blocks'

import { Parser } from '~/components/resolvers/helpers/parser'
const parser = new Parser()

parser
  .with({
    element: '/image',
    preset: { preset: 'mediaImage', property: 'mediaImage' },
  })
  .with({
    element: '/actions',
    preset: { preset: 'link' },
  })

export const ParagraphHero: Component = {
  fields: {
    heading: fieldText,
    description: fieldTextArea,
    // @todo: Rename image field as media in Drupal.
    image: fieldMediaExternal,
    actions: fieldLinks,
  },
  
  defaultProps: parser.apply({ data: Hero.defaults, target: 'data' }),
  render: (props) => {
    const hero = parser.apply({ data: props, target: 'ui' }) as HeroProps

    return <Hero {...hero} />
  },
}
