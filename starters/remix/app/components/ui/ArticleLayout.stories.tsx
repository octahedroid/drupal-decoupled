import type { Meta, StoryObj } from '@storybook/react'
import { MainLayout } from './MainLayout'

import { Article } from './Article'
import { Footer } from './Footer'
import { Header } from './Header'
import * as ArticleStories from './Article.stories'
import * as FooterStories from './Footer.stories'
import * as HeaderStories from './Header.stories'

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
