import type { Meta, StoryObj } from '@storybook/react'

import { MainLayout, Article, Footer, Header } from '@/components/ui'
import * as ArticleStories from '../Article/Article.stories'
import * as FooterStories from '../Footer/Footer.stories'
import * as HeaderStories from '../Header/Header.stories'
import { HeaderProps } from '../Header/Header'
import { ArticleProps } from '../Article/Article'
import { FooterProps } from '../Footer/Footer'

const meta: Meta<typeof MainLayout> = {
  title: 'Layout/Article Layout',
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
