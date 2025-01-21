import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '~/components'

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    src: '/placeholders/doc-tahedroid/avatar.png',
    name: 'Doc Tahedroid',
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {}

export const Fallback: Story = {
  args: {
    src: undefined,
  },
}
