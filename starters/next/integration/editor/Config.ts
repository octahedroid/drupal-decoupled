import { type Config } from 'drupal-decoupled/editor'

import { ParagraphHero } from '@/integration/resolvers/ParagraphHeroResolver'
import { ParagraphLogoGroup } from '@/integration/resolvers/ParagraphLogoGroupResolver'
import { ParagraphCardGroup } from '@/integration/resolvers/ParagraphCardGroupResolver'
import { ParagraphCta } from '@/integration/resolvers/ParagraphCtaResolver'
import { ParagraphTestimonial } from '@/integration/resolvers/ParagraphTestimonialResolver'
import { ParagraphFaq } from '@/integration/resolvers/ParagraphFaqResolver'
import { ParagraphViewReference } from '@/integration/resolvers/ParagraphViewReferenceResolver'
import { ParagraphWebform } from '../resolvers/ParagraphWebformResolver'

export const puckConfig: Config = {
  root: {
    fields: {},
  },
  components: {
    ParagraphHero,
    ParagraphLogoGroup,
    ParagraphCardGroup,
    ParagraphCta,
    ParagraphTestimonial,
    ParagraphFaq,
    ParagraphViewReference,
    ParagraphWebform,
  },
}
