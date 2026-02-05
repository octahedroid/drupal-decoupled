import type { Meta, StoryObj } from "@storybook/react-vite";
import { TeaserCard } from "@/components/primitives";

const meta: Meta<typeof TeaserCard> = {
  title: "Primitives/Teaser Card",
  component: TeaserCard,
  tags: ["autodocs"],
  argTypes: {
    heading: { control: "text" },
    summary: { control: "text" },
    tags: { control: "object" },
    image: { control: "object" },
    details: { control: "object" },
  },
  args: {
    heading: "Blog title heading will go here",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    image: {
      src: "/placeholders/drupal-decoupled/landscape-small.png",
      alt: "Blog post image",
    },
    details: { href: "/blog", text: "Read more" },
  },
};

export default meta;
type Story = StoryObj<typeof TeaserCard>;

export const Default: Story = {};

export const WithOneTag: Story = {
  args: {
    tags: ["Category"],
  },
};

export const WithTwoTags: Story = {
  args: {
    tags: ["Category", "Featured"],
  },
};

export const WithMoreThanTwoTags: Story = {
  args: {
    tags: ["Category", "Featured", "New"], // Only the first two will be displayed
  },
};
