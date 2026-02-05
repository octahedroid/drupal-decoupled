import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import { Label } from "@/components/ui/label";
import type { FieldMetadata } from "@conform-to/react";

// Create a mock field metadata that conforms to the expected shape
const createMockFieldMeta = (
  name: string,
  value = "",
  error?: string,
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
  } as unknown as FieldMetadata<string>;
};

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm space-y-4 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    meta: createMockFieldMeta("name"),
    type: "text",
    placeholder: "Enter your name",
  },
  decorators: [
    (Story) => (
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Story />
      </div>
    ),
  ],
};

export const WithValidation: Story = {
  args: {
    meta: createMockFieldMeta("email"),
    type: "email",
    placeholder: "Enter your email",
  },
  decorators: [
    (Story) => (
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  args: {
    meta: createMockFieldMeta("phone", "", "Invalid phone number"),
    type: "tel",
    placeholder: "Enter your phone number",
  },
  decorators: [
    (Story) => (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Story />
          <p className="text-sm text-red-500">Invalid phone number</p>
        </div>
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    meta: createMockFieldMeta("username"),
    type: "text",
    placeholder: "Username",
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Story />
      </div>
    ),
  ],
};
