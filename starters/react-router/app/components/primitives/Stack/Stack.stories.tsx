import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, Stack, Text } from "~/components/primitives";

const meta: Meta<typeof Stack> = {
  title: "Primitives/Stack",
  component: Stack,
  tags: ["autodocs"],
  args: {
    direction: "vertical",
    gap: "md",
    align: "start",
    children: (
      <>
        <Badge text="Semantic spacing" />
        <Text text="Stacks give the model predictable flow layouts without freestyle CSS nonsense." />
        <Text tone="muted" text="Love that for maintainability." />
      </>
    ),
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    align: "center",
  },
};
