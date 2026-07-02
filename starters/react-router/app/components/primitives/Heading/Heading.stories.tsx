import type { Meta, StoryObj } from "@storybook/react-vite";

import { Heading } from "~/components/primitives";

const meta: Meta<typeof Heading> = {
  title: "Primitives/Heading",
  component: Heading,
  tags: ["autodocs"],
  args: {
    text: "Composable heading for AI-authored sections",
    level: 2,
    size: "lg",
    tone: "default",
  },
  argTypes: {
    level: {
      control: "select",
      options: [1, 2, 3, 4],
    },
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

type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    tone: "primary",
  },
};

export const Inverse: Story = {
  args: {
    tone: "inverse",
  },
  render: (args) => (
    <div className="bg-primary p-6">
      <Heading {...args} />
    </div>
  ),
};
