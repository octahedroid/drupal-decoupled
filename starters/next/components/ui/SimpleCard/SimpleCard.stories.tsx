import type { Meta, StoryObj } from '@storybook/react'
import { SimpleCard } from '@/components/ui'

const meta: Meta<typeof SimpleCard> = {
  title: 'Components/Simple Card',
  component: SimpleCard,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    description: { control: 'text' },
    image: { control: 'object' },
  },
  args: {
    heading: 'Card Heading',
    description:
      'This is a simple card description that explains the feature or step.',
    image: {
      src: '/placeholders/icons/drupal-decoupled-hexagon.png',
      alt: 'Feature icon',
    },
  },
}

export default meta
type Story = StoryObj<typeof SimpleCard>

export const Default: Story = {}

export const LongContent: Story = {
  args: {
    heading: 'A Very Long Heading That Might Wrap to Multiple Lines',
    description:
      'This is a much longer description that goes into more detail about the feature or step. It might contain multiple sentences and wrap to several lines depending on the container width.',
  },
}
