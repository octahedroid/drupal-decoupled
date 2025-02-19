import { type Component, config } from 'drupal-decoupled/editor'

import {
  fieldText,
  fieldTextArea,
  fieldMediaImageExternal,
  fieldLinks,
} from '~/integration/editor/fields'

import { Hero, type HeroProps } from '~/components/blocks'

config.set({
  component: 'ParagraphHero',
  fields: {
    heading: {
      type: fieldText,
    },
    description: {
      type: fieldTextArea,
    },
    image: {
      type: fieldMediaImageExternal,
    },
    actions: {
      type: fieldLinks,
    },
  },
  defaultProps: Hero.defaults,
})

const ParagraphHero: Component = {
  fields: config.getFields('ParagraphHero'),
  defaultProps: config.parseDefaultProps('ParagraphHero'),
  render: (props) => {
    const hero = config.parseUIProps('ParagraphHero', props) as HeroProps

    return <Hero {...hero} />
  },
}

export { ParagraphHero }
