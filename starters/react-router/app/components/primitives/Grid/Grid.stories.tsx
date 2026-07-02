import type { Meta, StoryObj } from "@storybook/react-vite";

import { Grid, SimpleCard } from "~/components/primitives";

const meta: Meta<typeof Grid> = {
  title: "Primitives/Grid",
  component: Grid,
  tags: ["autodocs"],
  args: {
    columns: 3,
    gap: "lg",
    align: "stretch",
    children: Array.from({ length: 3 }, (_, index) => (
      <SimpleCard
        key={`grid-card-${index}`}
        type="simple"
        heading={`Card ${index + 1}`}
        description="Composable layout primitive for AI-authored sections."
        image={{
          src: "/placeholders/icons/drupal-decoupled-hexagon.png",
          alt: "Feature icon",
        }}
      />
    )),
  },
  argTypes: {
    columns: {
      control: "select",
      options: [1, 2, 3, 4],
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

type Story = StoryObj<typeof Grid>;

export const Default: Story = {};

export const TwoColumns: Story = {
  args: {
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
  },
};
