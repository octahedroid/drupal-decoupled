import type { Meta, StoryObj } from '@storybook/react'
import { CardGroup } from '@/components/ui'

const meta: Meta<typeof CardGroup> = {
  title: 'Components/Card Group - Simple Card',
  component: CardGroup,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
    description: { control: 'text' },
    action: { control: 'object' },
    cards: { control: 'object' },
  },
  args: {
    heading: 'How it works',
    subheading: 'Understand our process',
    description: 'Follow these simple steps to get started with our service.',
    action: {
      text: 'Get Started',
      href: '#',
    },
    cards: [
      {
        type: 'simple',
        image: {
          src: '/placeholders/icons/drupal-decoupled-hexagon.png',
          alt: 'Step 1',
        },
        heading: 'Short summary of step one',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      },
      {
        type: 'simple',
        image: {
          src: '/placeholders/icons/drupal-decoupled-hexagon.png',
          alt: 'Step 2',
        },
        heading: 'Short summary of step two',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      },
      {
        type: 'simple',
        image: {
          src: '/placeholders/icons/drupal-decoupled-hexagon.png',
          alt: 'Step 3',
        },
        heading: 'Short summary of step three',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof CardGroup>

export const Default: Story = {}

export const WithoutSubheading: Story = {
  args: {
    subheading: undefined,
  },
}

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
}

export const WithoutAction: Story = {
  args: {
    action: undefined,
  },
}

export const TwoCards: Story = {
  args: {
    cards: [
      {
        type: 'simple',
        image: {
          src: '/placeholders/icons/drupal-decoupled-hexagon.png',
          alt: 'Step 1',
        },
        heading: 'Short summary of step one',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        type: 'simple',
        image: {
          src: '/placeholders/icons/drupal-decoupled-hexagon.png',
          alt: 'Step 2',
        },
        heading: 'Short summary of step two',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
}
