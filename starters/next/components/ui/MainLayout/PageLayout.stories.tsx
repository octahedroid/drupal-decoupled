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
} from '@/components/ui'

import * as CTAStories from '../CTA/CTA.stories'
import * as SimpleCardStories from '../CardGroup/CardGroupSimpleCard.stories'
import * as TeaserCardStories from '../CardGroup/CardGroupTeaserCard.stories'
import * as FAQStories from '../FAQ/FAQ.stories'
import * as FooterStories from '../Footer/Footer.stories'
import * as HeaderStories from '../Header/Header.stories'
import * as HeroStories from '../Hero/Hero.stories'
import * as TestimonialStories from '../Testimonial/Testimonial.stories'
import { HeaderProps } from '../Header/Header'
import { TestimonialProps } from '../Testimonial/Testimonial'
import { FooterProps } from '../Footer/Footer'
import { CardGroupProps } from '../CardGroup/CardGroup'
import { HeroProps } from '../Hero/Hero'
import { FAQProps } from '../FAQ/FAQ'

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
        <Header {...(HeaderStories.default.args as HeaderProps)} />
        <Hero {...(HeroStories.default.args as HeroProps)} />
        <CardGroup {...(SimpleCardStories.default.args as CardGroupProps)} />
        <CTA {...CTAStories.default.args} />
        <Testimonial
          {...(TestimonialStories.default.args as TestimonialProps)}
        />
        <FAQ {...(FAQStories.default.args as FAQProps)} />
        <CardGroup {...(TeaserCardStories.default.args as CardGroupProps)} />
        <Footer {...(FooterStories.default.args as FooterProps)} />
      </>
    ),
  },
}
