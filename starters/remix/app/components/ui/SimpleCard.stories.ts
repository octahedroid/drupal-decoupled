import type { Meta, StoryObj } from '@storybook/react'
import { SimpleCard } from './SimpleCard'

const meta: Meta<typeof SimpleCard> = {
  title: 'Components/SimpleCard',
  component: SimpleCard,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    description: { control: 'text' },
    image: { control: 'object' },
    size: {
      control: { type: 'select' },
      options: ['default', 'small', 'large'],
    },
  },
  args: {
    heading: 'Card Heading',
    description:
      'This is a simple card description that explains the feature or step.',
    image: { src: 'https://picsum.photos/60/60', alt: 'Feature icon' },
  },
}

export default meta
type Story = StoryObj<typeof SimpleCard>

export const Default: Story = {}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
  },
}

export const LongContent: Story = {
  args: {
    heading: 'A Very Long Heading That Might Wrap to Multiple Lines',
    description:
      'This is a much longer description that goes into more detail about the feature or step. It might contain multiple sentences and wrap to several lines depending on the container width.',
  },
}
