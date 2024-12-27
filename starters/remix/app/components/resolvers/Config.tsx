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
    // fields: {
    //   title: fieldText,
    //   showTitle: {
    //     type: "select",
    //     options: [
    //       { label: "No", value: "false" },
    //       { label: "Yes", value: "true" },
    //     ],
    //   },
    //   summary: fieldTextArea,
    // },
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
