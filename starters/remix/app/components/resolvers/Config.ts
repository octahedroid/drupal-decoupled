import { type Config } from '@measured/puck'
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
