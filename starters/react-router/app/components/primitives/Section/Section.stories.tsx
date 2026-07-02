import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Section, Stack, Text } from "~/components/primitives";

const meta: Meta<typeof Section> = {
  title: "Primitives/Section",
  component: Section,
  tags: ["autodocs"],
  args: {
    background: "default",
    padding: "lg",
    children: (
      <Stack gap="md">
        <Text size="lg" text="Design-system section wrapper with semantic spacing." />
        <div>
          <Button href="/" internal text="Primary action" />
        </div>
      </Stack>
    ),
  },
  argTypes: {
    background: {
      control: "select",
      options: ["default", "muted", "primary"],
    },
    padding: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Section>;

export const Default: Story = {};

export const Muted: Story = {
  args: {
    background: "muted",
  },
};

export const Primary: Story = {
  args: {
    background: "primary",
  },
};
