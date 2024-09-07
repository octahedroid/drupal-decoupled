import type { Meta, StoryObj } from '@storybook/react'

import { MainLayout, Article, Footer, Header } from '../'
import * as ArticleStories from '../Article/Article.stories'
import * as FooterStories from '../Footer/Footer.stories'
import * as HeaderStories from '../Header/Header.stories'

const meta: Meta<typeof MainLayout> = {
  title: 'Layout/Article Layout',
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
        <Article {...ArticleStories.default.args} />
        <Footer {...FooterStories.default.args} />
      </>
    ),
  },
}
