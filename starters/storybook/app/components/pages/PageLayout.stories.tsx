import type { Meta, StoryObj } from '@storybook/react'

import {
  CTA,
  CardGroup,
  CardGroupProps,
  FAQ,
  FAQProps,
  Footer,
  FooterProps,
  Header,
  HeaderProps,
  Hero,
  HeroProps,
  Testimonial,
  TestimonialProps,
} from '~/components/blocks'
import { MainLayout } from '~/components/primitives'

import * as CTAStories from '../blocks/CTA/CTA.stories'
import * as SimpleCardStories from '../blocks/CardGroup/CardGroupSimpleCard.stories'
import * as TeaserCardStories from '../blocks/CardGroup/CardGroupTeaserCard.stories'
import * as FAQStories from '../blocks/FAQ/FAQ.stories'
import * as FooterStories from '../blocks/Footer/Footer.stories'
import * as HeaderStories from '../blocks/Header/Header.stories'
import * as HeroStories from '../blocks/Hero/Hero.stories'
import * as TestimonialStories from '../blocks/Testimonial/Testimonial.stories'

const meta: Meta<typeof MainLayout> = {
  title: 'Pages/Page',
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
