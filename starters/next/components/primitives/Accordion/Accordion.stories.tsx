import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion } from '@/components/primitives'

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    items: [
      {
        title: 'Is it accessible?',
        content: 'Yes. It adheres to the WAI-ARIA design pattern.',
      },
      {
        title: 'Is it styled?',
        content:
          'Yes. It comes with default styles that matches the other components aesthetic.',
      },
      {
        title: 'Is it animated?',
        content:
          'Yes. animated by default, but you can disable it if you prefer.',
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {}
