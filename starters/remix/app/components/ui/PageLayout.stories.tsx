import type { Meta, StoryObj } from '@storybook/react'

import { MainLayout } from './MainLayout'

import { CTA } from './CTA'
import { CardGroup } from './CardGroup'
import { FAQ } from './FAQ'
import { Footer } from './Footer'
import { Header } from './Header'
import { Hero } from './Hero'
import { Testimonial } from './Testimonial'

import * as CTAStories from './CTA.stories'
import * as SimpleCardStories from './CardGroupSimpleCard.stories'
import * as TeaserCardStories from './CardGroupTeaserCard.stories'
import * as FAQStories from './FAQ.stories'
import * as FooterStories from './Footer.stories'
import * as HeaderStories from './Header.stories'
import * as HeroStories from './Hero.stories'
import * as TestimonialStories from './Testimonial.stories'

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
