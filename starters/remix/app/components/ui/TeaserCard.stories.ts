import type { Meta, StoryObj } from '@storybook/react'
import { TeaserCard } from './TeaserCard'

const meta: Meta<typeof TeaserCard> = {
  title: 'Components/TeaserCard',
  component: TeaserCard,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    summary: { control: 'text' },
    tags: { control: 'object' },
    image: { control: 'object' },
    link: { control: 'object' },
    size: {
      control: { type: 'select' },
      options: ['default', 'small', 'large'],
    },
  },
  args: {
    heading: 'Blog title heading will go here',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
    image: { src: 'https://picsum.photos/400/250', alt: 'Blog post image' },
    link: { href: '#', text: 'Read more' },
  },
}

export default meta
type Story = StoryObj<typeof TeaserCard>

export const Default: Story = {}

export const WithOneTag: Story = {
  args: {
    tags: ['Category'],
  },
}

export const WithTwoTags: Story = {
  args: {
    tags: ['Category', 'Featured'],
  },
}

export const WithMoreThanTwoTags: Story = {
  args: {
    tags: ['Category', 'Featured', 'New'], // Only the first two will be displayed
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    tags: ['Category'],
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    tags: ['Category', 'Featured'],
  },
}
