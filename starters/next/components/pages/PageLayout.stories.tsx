import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  CardGroup,
  type CardGroupProps,
  CTA,
  type CTAProps,
  FAQ,
  type FAQProps,
  Footer,
  type FooterProps,
  Header,
  type HeaderProps,
  Hero,
  type HeroProps,
  Testimonial,
  type TestimonialProps,
} from "@/components/blocks";
import * as SimpleCardStories from "@/components/blocks/CardGroup/CardGroupSimpleCard.stories";
import * as TeaserCardStories from "@/components/blocks/CardGroup/CardGroupTeaserCard.stories";
import * as CTAStories from "@/components/blocks/CTA/CTA.stories";
import * as FAQStories from "@/components/blocks/FAQ/FAQ.stories";
import * as FooterStories from "@/components/blocks/Footer/Footer.stories";
import * as HeaderStories from "@/components/blocks/Header/Header.stories";
import * as HeroStories from "@/components/blocks/Hero/Hero.stories";
import * as TestimonialStories from "@/components/blocks/Testimonial/Testimonial.stories";
import { MainLayout } from "@/components/primitives";

const meta: Meta<typeof MainLayout> = {
  title: "Pages/Page",
  component: MainLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Header {...(HeaderStories.default.args as HeaderProps)} />
        <Hero {...(HeroStories.default.args as HeroProps)} />
        <CardGroup {...(SimpleCardStories.default.args as CardGroupProps)} />
        <CTA {...(CTAStories.default.args as CTAProps)} />
        <Testimonial
          {...(TestimonialStories.default.args as TestimonialProps)}
        />
        <FAQ {...(FAQStories.default.args as FAQProps)} />
        <CardGroup {...(TeaserCardStories.default.args as CardGroupProps)} />
        <Footer {...(FooterStories.default.args as FooterProps)} />
      </>
    ),
  },
};
