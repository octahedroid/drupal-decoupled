import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '~/components/primitives'

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    text: 'Badge',
    variant: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    text: 'Secondary',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    text: 'Destructive',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    text: 'Outline',
  },
}

export const LongText: Story = {
  args: {
    text: 'This is a badge with a very long text',
  },
}
