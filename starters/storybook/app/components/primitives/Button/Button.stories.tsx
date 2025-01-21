import type { Meta, StoryObj } from '@storybook/react'
import { ChevronRight } from 'lucide-react'
import { Button } from '~/components'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    text: 'Default',
    icon: undefined,
    variant: 'default',
    size: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

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

export const Small: Story = {
  args: {
    size: 'sm',
    text: 'Small',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    text: 'Large',
  },
}

export const WithIcon: Story = {
  args: {
    icon: ChevronRight,
  },
}

export const IconOnly: Story = {
  args: {
    text: '',
    icon: ChevronRight,
  },
}
