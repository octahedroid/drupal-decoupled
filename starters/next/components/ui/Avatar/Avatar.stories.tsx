import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <AvatarImage
          src="/placeholders/doc-tahedroid/avatar.png"
          alt="@shadcn"
        />
        <AvatarFallback>DH</AvatarFallback>
      </>
    ),
  },
  argTypes: {
    children: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {}

export const WithImage: Story = {
  args: {
    children: (
      <>
        <AvatarImage
          src="/placeholders/doc-tahedroid/avatar.png"
          alt="@shadcn"
        />
        <AvatarFallback>DH</AvatarFallback>
      </>
    ),
  },
}

export const Fallback: Story = {
  args: {
    children: <AvatarFallback>DH</AvatarFallback>,
  },
}

export const CustomSize: Story = {
  args: {
    className: 'h-16 w-16',
    children: (
      <>
        <AvatarImage
          src="/placeholders/doc-tahedroid/avatar.png"
          alt="@shadcn"
        />
        <AvatarFallback>DH</AvatarFallback>
      </>
    ),
  },
}

export const NoImage: Story = {
  args: {
    children: (
      <>
        <AvatarImage src="/broken-image.jpg" alt="@shadcn" />
        <AvatarFallback>DH</AvatarFallback>
      </>
    ),
  },
}
