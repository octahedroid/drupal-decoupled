import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'
import { type FieldMetadata } from '@conform-to/react'
import { Label } from '~/components/ui/label'

// Create a mock field metadata that conforms to the expected shape
const createMockFieldMeta = (
  name: string,
  value = '',
  error?: string
): FieldMetadata<string> => {
  // Cast to unknown first to avoid TypeScript errors
  return {
    id: name,
    name,
    value,
    initialValue: value,
    errors: error ? [error] : undefined,
    key: name,
    descriptionId: `${name}-description`,
    errorId: `${name}-error`,
    // The actual FieldMetadata expects allErrors to be Record<string, string[]>
    allErrors: error ? { [name]: [error] } : {},
    valid: !error,
    dirty: false,
  } as unknown as FieldMetadata<string>
}

const meta: Meta<typeof Textarea> = {
  title: 'Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm space-y-4 p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    meta: createMockFieldMeta('message'),
    placeholder: 'Enter your message',
  },
  decorators: [
    (Story) => (
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Story />
      </div>
    ),
  ],
}

export const WithContent: Story = {
  args: {
    meta: createMockFieldMeta(
      'bio',
      'I am a software developer with experience in React, TypeScript, and Node.js.'
    ),
    placeholder: 'Tell us about yourself',
  },
  decorators: [
    (Story) => (
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Story />
      </div>
    ),
  ],
}

export const WithError: Story = {
  args: {
    meta: createMockFieldMeta(
      'feedback',
      '',
      'Feedback must be at least 20 characters long'
    ),
    placeholder: 'Enter your feedback',
  },
  decorators: [
    (Story) => (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="feedback">Feedback</Label>
          <Story />
          <p className="text-sm text-red-500">
            Feedback must be at least 20 characters long
          </p>
        </div>
      </div>
    ),
  ],
}

export const Disabled: Story = {
  args: {
    meta: createMockFieldMeta('readonly'),
    placeholder: 'This textarea is disabled',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="space-y-2">
        <Label htmlFor="readonly">Read-only Content</Label>
        <Story />
      </div>
    ),
  ],
}
