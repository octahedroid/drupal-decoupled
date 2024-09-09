import type { Meta, StoryObj } from '@storybook/react'
import { Article } from '@/components/ui'

const meta: Meta<typeof Article> = {
  title: 'Components/Article',
  component: Article,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    title: 'How designers estimate the impact of UX?',
    summary: 'Designers wear many hats, the first one being a moderator.',
    content: `
      <p>Designers aren't purely focused on aesthetics — their role encompasses broader business aspects and technology, while carefully evaluating those by estimating the return on investment for each solution.</p>
      <p>In short, designers ensure that the end value of the specific solution, or product as a whole, brings gains to the client's business as expected and a significant return against the initial investment.</p>
      <h3>Core Areas of Focus</h3>
      <p>At intive, our designers maintain this awareness by developing across three core areas:</p>
      <ul>
        <li>Business</li>
        <li>Technology</li>
        <li>User-centric design practices</li>
      </ul>
      <p>For each vertical, they keep ROI in mind, taking care to estimate and realize the impact of UX on the client's budget, goals, and wider technical framework.</p>
    `,
    image: {
      src: '/placeholders/drupal-decoupled/landscape-large.png',
      alt: 'A cartoon character on a beach with an ice cream',
    },
    tags: ['UX', 'Design', 'Business'],
    publishDate: 1667260800,
    author: {
      avatar: {
        src: '/placeholders/doc-tahedroid/avatar.png',
        alt: 'Doc Tahedroid',
      },
      name: 'Doc Tahedroid',
    },
  },
  argTypes: {
    title: { control: 'text' },
    summary: { control: 'text' },
    content: { control: 'text' },
    image: { control: 'object' },
    tags: { control: 'object' },
    publishDate: { control: 'date' },
    author: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof Article>

export const Default: Story = {}

export const WithoutSummary: Story = {
  args: {
    summary: undefined,
  },
}

export const WithoutTags: Story = {
  args: {
    tags: undefined,
  },
}

export const LongTitle: Story = {
  args: {
    title:
      'This is a very long title that should wrap to multiple lines in the article component',
  },
}

export const ShortContent: Story = {
  args: {
    content: '<p>This is a short article content.</p>',
  },
}

export const DifferentDate: Story = {
  args: {
    publishDate: 1684108800,
  },
}
