import type { Meta, StoryObj } from '@storybook/react'
import { CTA } from '@/components/ui'

const meta: Meta<typeof CTA> = {
  title: 'Components/CTA',
  component: CTA,
  tags: ['autodocs'],
  args: {
    subheading: 'Join us today',
    heading: 'Ready to get started?',
    description:
      "Sign up now and start enjoying our amazing features. It's quick, easy, and free to get started!",
    actions: [
      { text: 'Sign Up', href: '/signup', variant: 'default' },
      { text: 'Learn More', href: '/about', variant: 'outline' },
    ],
  },
  argTypes: {
    subheading: { control: 'text' },
    heading: { control: 'text' },
    description: { control: 'text' },
    actions: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof CTA>

export const Default: Story = {}

export const SingleButton: Story = {
  args: {
    heading: 'Subscribe to our newsletter',
    description: 'Stay up to date with our latest news and updates.',
    actions: [{ text: 'Subscribe', href: '/subscribe', variant: 'default' }],
  },
}

export const NoActions: Story = {
  args: {
    heading: 'Welcome to our platform',
    description: 'Discover amazing features and boost your productivity.',
    actions: undefined,
  },
}
