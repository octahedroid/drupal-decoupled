import type { Meta, StoryObj } from '@storybook/react'
import { LogoGroup } from './LogoGroup'

const meta: Meta<typeof LogoGroup> = {
  title: 'Components/LogoGroup',
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
        image: { src: 'https://picsum.photos/160/64', alt: 'Octahedroid' },
        link: 'https://octahedroid.com',
      },
      {
        image: {
          src: 'https://picsum.photos/id/40/160/64',
          alt: 'Composabase',
        },
        link: 'https://composabase.com',
      },
      {
        image: { src: 'https://picsum.photos/160/64', alt: 'Octahedroid' },
        link: 'https://octahedroid.com',
      },
      {
        image: {
          src: 'https://picsum.photos/id/40/160/64',
          alt: 'Composabase',
        },
        link: 'https://composabase.com',
      },
      {
        image: { src: 'https://picsum.photos/160/64', alt: 'Octahedroid' },
        link: 'https://octahedroid.com',
      },
      {
        image: {
          src: 'https://picsum.photos/id/40/160/64',
          alt: 'Composabase',
        },
        link: 'https://composabase.com',
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
        image: { src: 'https://picsum.photos/160/64', alt: 'Octahedroid' },
        link: 'https://octahedroid.com',
      },
      {
        image: {
          src: 'https://picsum.photos/id/40/160/64',
          alt: 'Composabase',
        },
        link: 'https://composabase.com',
      },
    ],
  },
}
