import type { Meta, StoryObj } from '@storybook/react'
import { LogoGroup } from '@/components/ui'

const meta: Meta<typeof LogoGroup> = {
  title: 'Components/Logo Group',
  component: LogoGroup,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    logos: { control: 'object' },
  },
  args: {
    heading: "Trusted by the world's best companies",
    logos: [
      {
        image: {
          src: '/placeholders/icons/doc-tahedroid.png',
          alt: 'Octahedroid',
        },
        link: { href: 'https://octahedroid.com', internal: false },
      },
      {
        image: {
          src: '/placeholders/icons/drupal-decoupled.png',
          alt: 'Composabase',
        },
        link: { href: 'https://composabase.com', internal: false },
      },
      {
        image: {
          src: '/placeholders/icons/doc-tahedroid.png',
          alt: 'Octahedroid',
        },
        link: { href: 'https://octahedroid.com', internal: false },
      },
      {
        image: {
          src: '/placeholders/icons/drupal-decoupled.png',
          alt: 'Composabase',
        },
        link: { href: 'https://composabase.com', internal: false },
      },
      {
        image: {
          src: '/placeholders/icons/doc-tahedroid.png',
          alt: 'Octahedroid',
        },
        link: { href: 'https://octahedroid.com', internal: false },
      },
      {
        image: {
          src: '/placeholders/icons/drupal-decoupled.png',
          alt: 'Composabase',
        },
        link: { href: 'https://composabase.com', internal: false },
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof LogoGroup>

export const Default: Story = {}

export const CustomHeading: Story = {
  args: {
    heading: 'Our Partners',
  },
}

export const FewerLogos: Story = {
  args: {
    logos: [
      {
        image: {
          src: '/placeholders/icons/doc-tahedroid.png',
          alt: 'Octahedroid',
        },
        link: { href: 'https://octahedroid.com', internal: false },
      },
      {
        image: {
          src: '/placeholders/icons/drupal-decoupled.png',
          alt: 'Composabase',
        },
        link: { href: 'https://composabase.com', internal: false },
      },
    ],
  },
}
