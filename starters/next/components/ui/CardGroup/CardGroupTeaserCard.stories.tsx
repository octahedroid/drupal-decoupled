import type { Meta, StoryObj } from '@storybook/react'
import { CardGroup } from '@/components/ui'

const meta: Meta<typeof CardGroup> = {
  title: 'Components/Card Group - Teaser Card',
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
        type: 'teaser',
        image: {
          src: '/placeholders/drupal-decoupled/landscape-small.png',
          alt: 'Blog post 1',
        },
        tags: ['Category', 'Featured'],
        heading: 'Blog title heading will go here',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
        link: { href: '#', text: 'Read more' },
      },
      {
        type: 'teaser',
        image: {
          src: '/placeholders/doc-tahedroid/landscape-small.png',
          alt: 'Blog post 2',
        },
        tags: ['Category'],
        heading: 'Blog title heading will go here',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
        link: { href: '#', text: 'Read more' },
      },
      {
        type: 'teaser',
        image: {
          src: '/placeholders/drupal-decoupled/landscape-small.png',
          alt: 'Blog post 3',
        },
        tags: ['New', 'Popular'],
        heading: 'Blog title heading will go here',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
        link: { href: '#', text: 'Read more' },
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

export const WithoutDescriptionAndSubheading: Story = {
  args: {
    subheading: undefined,
    description: undefined,
  },
}

export const WithoutCategories: Story = {
  args: {
    heading: 'Headline introducing resources',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    cards: [
      {
        type: 'teaser',
        image: {
          src: '/placeholders/doc-tahedroid/landscape-small.png',
          alt: 'Blog post 1',
        },
        tags: undefined,
        heading: 'Blog title heading will go here',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
        link: { href: '#', text: 'Read more' },
      },
      {
        type: 'teaser',
        image: {
          src: '/placeholders/drupal-decoupled/landscape-small.png',
          alt: 'Blog post 2',
        },
        tags: undefined,
        heading: 'Blog title heading will go here',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
        link: { href: '#', text: 'Read more' },
      },
      {
        type: 'teaser',
        image: {
          src: '/placeholders/doc-tahedroid/landscape-small.png',
          alt: 'Blog post 3',
        },
        tags: undefined,
        heading: 'Blog title heading will go here',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
        link: { href: '#', text: 'Read more' },
      },
    ],
  },
}

export const MixedEmptyCategories: Story = {
  args: {
    heading: 'Headline introducing resources',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    cards: [
      {
        type: 'teaser',
        image: {
          src: '/placeholders/doc-tahedroid/landscape-small.png',
          alt: 'Blog post1',
        },
        tags: ['Category', 'Featured'],
        heading: 'Blog title heading will go here',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
        link: { href: '#', text: 'Read more' },
      },
      {
        type: 'teaser',
        image: {
          src: '/placeholders/drupal-decoupled/landscape-small.png',
          alt: 'Blog post 1',
        },
        tags: undefined,
        heading: 'Blog title heading will go here',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
        link: { href: '#', text: 'Read more' },
      },
      {
        type: 'teaser',
        image: {
          src: '/placeholders/doc-tahedroid/landscape-small.png',
          alt: 'Blog post 3',
        },
        tags: ['Category', 'Featured'],
        heading: 'Blog title heading will go here',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
        link: { href: '#', text: 'Read more' },
      },
    ],
  },
}

export const WithoutAction: Story = {
  args: {
    action: undefined,
    cards: [
      {
        type: 'teaser',
        image: {
          src: '/placeholders/drupal-decoupled/landscape-small.png',
          alt: 'Blog post 1',
        },
        tags: ['Category', 'Featured'],
        heading: 'Blog title heading will go here',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
        link: { href: '#', text: 'Read more' },
      },
      {
        type: 'teaser',
        image: {
          src: '/placeholders/doc-tahedroid/landscape-small.png',
          alt: 'Blog post 2',
        },
        tags: ['Category'],
        heading: 'Blog title heading will go here',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
        link: { href: '#', text: 'Read more' },
      },
      {
        type: 'teaser',
        image: {
          src: '/placeholders/drupal-decoupled/landscape-small.png',
          alt: 'Blog post 3',
        },
        tags: ['New', 'Popular'],
        heading: 'Blog title heading will go here',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
        link: { href: '#', text: 'Read more' },
      },
    ],
  },
}
