import type { Meta, StoryObj } from '@storybook/react'

import {
  CTA,
  CardGroup,
  FAQ,
  Footer,
  Header,
  Hero,
  MainLayout,
  Testimonial,
} from '../'

import * as CTAStories from '../CTA/CTA.stories'
import * as SimpleCardStories from '../CardGroup/CardGroupSimpleCard.stories'
import * as TeaserCardStories from '../CardGroup/CardGroupTeaserCard.stories'
import * as FAQStories from '../FAQ/FAQ.stories'
import * as FooterStories from '../Footer/Footer.stories'
import * as HeaderStories from '../Header/Header.stories'
import * as HeroStories from '../Hero/Hero.stories'
import * as TestimonialStories from '../Testimonial/Testimonial.stories'

const meta: Meta<typeof MainLayout> = {
  title: 'Layout/Page Layout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof MainLayout>

export const Default: Story = {
  args: {
    children: (
      <>
        <Header {...HeaderStories.default.args} />
        <Hero {...HeroStories.default.args} />
        <CardGroup {...SimpleCardStories.default.args} />
        <CTA {...CTAStories.default.args} />
        <Testimonial {...TestimonialStories.default.args} />
        <FAQ {...FAQStories.default.args} />
        <CardGroup {...TeaserCardStories.default.args} />
        <Footer {...FooterStories.default.args} />
      </>
    ),
  },
}
