import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from '@/components/ui'

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    columns: [
      {
        title: 'Column One',
        links: [
          { text: 'Link One', href: '#' },
          { text: 'Link Two', href: '#' },
          { text: 'Link Three', href: '#' },
          { text: 'Link Four', href: '#' },
          { text: 'Link Five', href: '#' },
        ],
      },
      {
        title: 'Column Two',
        links: [
          { text: 'Link Six', href: '#' },
          { text: 'Link Seven', href: '#' },
          { text: 'Link Eight', href: '#' },
          { text: 'Link Nine', href: '#' },
          { text: 'Link Ten', href: '#' },
        ],
      },
      {
        title: 'Column Three',
        links: [
          { text: 'Link Eleven', href: '#' },
          { text: 'Link Twelve', href: '#' },
          { text: 'Link Thirteen', href: '#' },
          { text: 'Link Fourteen', href: '#' },
          { text: 'Link Fifteen', href: '#' },
        ],
      },
      {
        title: 'Column Four',
        links: [
          { text: 'Link Sixteen', href: '#' },
          { text: 'Link Seventeen', href: '#' },
          { text: 'Link Eighteen', href: '#' },
          { text: 'Link Nineteen', href: '#' },
          { text: 'Link Twenty', href: '#' },
        ],
      },
      {
        title: 'Column Five',
        links: [
          { text: 'Link Twenty One', href: '#' },
          { text: 'Link Twenty Two', href: '#' },
          { text: 'Link Twenty Three', href: '#' },
          { text: 'Link Twenty Four', href: '#' },
          { text: 'Link Twenty Five', href: '#' },
        ],
      },
      {
        title: 'Column Six',
        links: [
          { text: 'Link Twenty Six', href: '#' },
          { text: 'Link Twenty Seven', href: '#' },
          { text: 'Link Twenty Eight', href: '#' },
          { text: 'Link Twenty Nine', href: '#' },
          { text: 'Link Thirty', href: '#' },
        ],
      },
    ],
    logo: {
      src: '/placeholders/icons/doc-tahedroid.png',
      alt: 'Company Logo',
    },
    copyrightText: '© 2023 Drupal Decoupled. All rights reserved.',
  },
  argTypes: {
    columns: { control: 'object' },
    logo: { control: 'object' },
    copyrightText: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {}

export const FewerColumns: Story = {
  args: {
    columns: meta.args!.columns!.slice(0, 3),
  },
}

export const CustomCopyright: Story = {
  args: {
    copyrightText: '© 2023 Your Company Name. All rights reserved.',
  },
}
