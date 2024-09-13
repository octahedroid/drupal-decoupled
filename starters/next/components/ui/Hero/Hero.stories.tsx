import type { Meta, StoryObj } from '@storybook/react'
import { Hero } from '@/components/ui'

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero',
  component: Hero,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    description: { control: 'text' },
    image: { control: 'object' },
    actions: { control: 'object' },
  },
  args: {
    heading: 'Welcome to our Hero Section',
    description:
      'This is a default description. You can customize it to fit your needs.',
    image: {
      src: '/placeholders/drupal-decoupled/landscape-large.png',
      alt: 'Default hero image',
    },
    actions: [
      { text: 'Get Started', href: '#', variant: 'default' },
      { text: 'Learn More', href: '#', variant: 'outline' },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Hero>

export const Default: Story = {}

export const CustomContent: Story = {
  args: {
    heading: "Resonate with the visitor's problem",
    description:
      'Describe exactly what your product or service does to solve this problem. Avoid using verbose words or phrases.',
    image: {
      src: '/placeholders/doc-tahedroid/landscape-large.png',
      alt: 'Custom hero image',
    },
    actions: [
      {
        text: 'Start Now',
        href: '#',
        variant: 'default',
        className: 'font-bold',
      },
      { text: 'Explore', href: '#', variant: 'secondary', internal: false },
    ],
  },
}

export const SingleAction: Story = {
  args: {
    heading: 'Hero With One Actions',
    actions: [
      {
        text: 'Start Now',
        href: '#',
        variant: 'default',
        className: 'font-bold',
      },
    ],
  },
}

export const WithoutActions: Story = {
  args: {
    heading: 'Hero Without Actions',
    actions: undefined,
  },
}
