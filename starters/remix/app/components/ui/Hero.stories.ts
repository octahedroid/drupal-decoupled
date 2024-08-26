import type { Meta, StoryObj } from '@storybook/react'
import { Hero } from './Hero'

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
      src: 'https://picsum.photos/800/600',
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
      src: 'https://picsum.photos/800/600',
      alt: 'Custom hero image',
    },
    actions: [
      {
        text: 'Start Now',
        href: '#',
        variant: 'default',
        className: 'font-bold',
      },
      { text: 'Explore', href: '#', variant: 'secondary', target: '_blank' },
    ],
  },
}

export const WithoutDescription: Story = {
  args: {
    heading: 'Hero Without Description',
    description: undefined,
  },
}

export const WithoutActions: Story = {
  args: {
    heading: 'Hero Without Actions',
    actions: undefined,
  },
}
