import type { Meta, StoryObj } from '@storybook/react'
import { FAQ } from '@/components/ui'

const meta: Meta<typeof FAQ> = {
  title: 'Components/FAQ',
  component: FAQ,
  tags: ['autodocs'],
  args: {
    heading: 'Frequently asked questions',
    description:
      'Frequently asked questions ordered by popularity. Remember that if the visitor has not committed to the call to action, they may still have questions (doubts) that can be answered.',
    questions: [
      {
        question: 'What is your return policy?',
        answer:
          'We offer a 30-day money-back guarantee for all our products. If you',
      },
      {
        question: 'How long does shipping take?',
        answer:
          'Shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders.',
      },
      {
        question: 'Do you offer international shipping?',
        answer:
          'Yes, we ship to most countries worldwide. Shipping costs and delivery times may vary depending on the destination.',
      },
      {
        question: 'Are your products eco-friendly?',
        answer:
          'We strive to use sustainable materials and eco-friendly packaging whenever possible. Many of our products are made from recycled or biodegradable materials.',
      },
      {
        question: 'How can I contact customer support?',
        answer:
          'You can reach our customer support team via email at support@example.com or by phone at 1-800-123-4567, Monday through Friday, 9am to 5pm EST.',
      },
    ],
  },
  argTypes: {
    heading: { control: 'text' },
    description: { control: 'text' },
    questions: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof FAQ>

export const Default: Story = {}

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
}

export const FewerQuestions: Story = {
  args: {
    questions: meta.args!.questions!.slice(0, 3),
  },
}
