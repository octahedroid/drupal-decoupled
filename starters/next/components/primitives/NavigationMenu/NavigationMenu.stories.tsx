import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavigationMenu } from '@/components/primitives'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Primitives/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  args: {
    navItems: [
      { label: 'Link One', href: '#' },
      { label: 'Link Two', href: '#' },
      { label: 'Link Three', href: '#' },
      { label: 'Link Four', href: '#' },
    ],
  },
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {}

export const NestedMenuItems: Story = {
  args: {
    navItems: [
      { label: 'Home', href: '#' },
      {
        label: 'Products',
        children: [
          { label: 'Product A', href: '#product-a' },
          { label: 'Product B', href: '#product-b' },
          { label: 'Product C', href: '#product-c' },
        ],
      },
      {
        label: 'Services',
        children: [
          { label: 'Consulting', href: '#consulting' },
          { label: 'Training', href: '#training' },
          { label: 'Support', href: '#support' },
        ],
      },
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
}
