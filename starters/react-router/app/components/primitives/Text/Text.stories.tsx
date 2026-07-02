import type { Meta, StoryObj } from "@storybook/react-vite";

import { Text } from "~/components/primitives";

const meta: Meta<typeof Text> = {
  title: "Primitives/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    text: "Structured text primitive for generated sections that still respects the design system.",
    size: "md",
    tone: "default",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    tone: {
      control: "select",
      options: ["default", "muted", "primary", "inverse"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const Muted: Story = {
  args: {
    tone: "muted",
  },
};

export const Inverse: Story = {
  args: {
    tone: "inverse",
  },
  render: (args) => (
    <div className="bg-primary p-6">
      <Text {...args} />
    </div>
  ),
};
