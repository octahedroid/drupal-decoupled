import type { Meta, StoryObj } from '@storybook/react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    type: 'single',
    collapsible: true,
    children: [
      <AccordionItem key="item-1" value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>,
      <AccordionItem key="item-2" value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          componentsaesthetic.
        </AccordionContent>
      </AccordionItem>,
      <AccordionItem key="item-3" value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>,
    ],
  },
  argTypes: {
    type: { control: 'radio', options: ['single', 'multiple'] },
    collapsible: { control: 'boolean' },
    children: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {}

export const SingleType: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
}

export const MultipleType: Story = {
  args: {
    type: 'multiple',
  },
}

export const NonCollapsible: Story = {
  args: {
    type: 'single',
    collapsible: false,
  },
}

export const CustomContent: Story = {
  args: {
    type: 'single',
    collapsible: true,
    children: [
      <AccordionItem key="item-1" value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces. It allows
          you to create reusable UI components and manage the state of your
          application efficiently.
        </AccordionContent>
      </AccordionItem>,
      <AccordionItem key="item-2" value="item-2">
        <AccordionTrigger>What are React Hooks?</AccordionTrigger>
        <AccordionContent>
          React Hooks are functions that let you use state and other React
          features in functional components. They were introduced in React 16.8
          and include hooks like useState, useEffect, useContext, and more.
        </AccordionContent>
      </AccordionItem>,
    ],
  },
}
