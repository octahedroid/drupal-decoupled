import type { Meta, StoryObj } from '@storybook/react'
import { Testimonial } from './Testimonial'

const meta: Meta<typeof Testimonial> = {
  title: 'Components/Testimonial',
  component: Testimonial,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    quote: { control: 'text' },
    people: { control: 'object' },
  },
  args: {
    heading:
      'A customer testimonial that highlights features and answers potential customer doubts about your product or service. Showcase testimonials from a similar demographic to your customers.',
    quote:
      "This product has completely transformed our workflow. It's intuitive, powerful, and addresses all the pain points we were experiencing with our previous solution.",
    people: {
      avatar: '/api/placeholder/100/100',
      name: 'Jane Doe',
      position: 'CEO',
      company: 'Tech Innovators Inc.',
    }
  },
}

export default meta
type Story = StoryObj<typeof Testimonial>

export const Default: Story = {}

export const CustomTestimonial: Story = {
  args: {
    heading: 'Our customers love our product',
    quote:
      "This solution has revolutionized how we manage our projects. It's a game-changer for our team's productivity.",
    people: {
      avatar: '/api/placeholder/100/100',
      name: 'John Doe',
      position: 'CEO',
      company: 'Tech Innovators Inc.',
    }
  },
}
