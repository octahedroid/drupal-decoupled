import '@measured/puck/puck.css'
import {
  ParagraphFaq,
  ParagraphHero,
  ParagraphCta,
  ParagraphCardGroup,
  ParagraphTestimonial,
  ParagraphLogoGroup,
  ParagraphViewReference,
  ParagraphWebform,
} from '~/components/resolvers'

import { Config } from '~/components/resolvers/types'

export const config: Config = {
  root: {
    fields: {},
  },
  components: {
    ParagraphHero,
    ParagraphCardGroup,
    ParagraphLogoGroup,
    ParagraphCta,
    ParagraphTestimonial,
    ParagraphFaq,
    ParagraphViewReference,
    ParagraphWebform,
  },
}
