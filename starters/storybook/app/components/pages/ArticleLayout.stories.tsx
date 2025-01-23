import type { Meta, StoryObj } from '@storybook/react'

import {
  Article,
  ArticleProps,
  Footer,
  FooterProps,
  Header,
  HeaderProps,
} from '~/components/blocks'
import { MainLayout } from '~/components/primitives'
import * as ArticleStories from '../blocks/Article/Article.stories'
import * as FooterStories from '../blocks/Footer/Footer.stories'
import * as HeaderStories from '../blocks/Header/Header.stories'

const meta: Meta<typeof MainLayout> = {
  title: 'Pages/Article',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof MainLayout>

console.log(ArticleStories.default.args)

export const Default: Story = {
  args: {
    children: (
      <>
        <Header {...(HeaderStories.default.args as HeaderProps)} />
        <Article {...(ArticleStories.default.args as ArticleProps)} />
        <Footer {...(FooterStories.default.args as FooterProps)} />
      </>
    ),
  },
}
