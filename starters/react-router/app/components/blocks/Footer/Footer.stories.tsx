import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "~/components/blocks";

const meta: Meta<typeof Footer> = {
  title: "Blocks/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    columns: [
      {
        title: "Column One",
        links: [
          { children: "Link One", href: "#" },
          { children: "Link Two", href: "#" },
          { children: "Link Three", href: "#" },
          { children: "Link Four", href: "#" },
          { children: "Link Five", href: "#" },
        ],
      },
      {
        title: "Column Two",
        links: [
          { children: "Link Six", href: "#" },
          { children: "Link Seven", href: "#" },
          { children: "Link Eight", href: "#" },
          { children: "Link Nine", href: "#" },
          { children: "Link Ten", href: "#" },
        ],
      },
      {
        title: "Column Three",
        links: [
          { children: "Link Eleven", href: "#" },
          { children: "Link Twelve", href: "#" },
          { children: "Link Thirteen", href: "#" },
          { children: "Link Fourteen", href: "#" },
          { children: "Link Fifteen", href: "#" },
        ],
      },
      {
        title: "Column Four",
        links: [
          { children: "Link Sixteen", href: "#" },
          { children: "Link Seventeen", href: "#" },
          { children: "Link Eighteen", href: "#" },
          { children: "Link Nineteen", href: "#" },
          { children: "Link Twenty", href: "#" },
        ],
      },
      {
        title: "Column Five",
        links: [
          { children: "Link Twenty One", href: "#" },
          { children: "Link Twenty Two", href: "#" },
          { children: "Link Twenty Three", href: "#" },
          { children: "Link Twenty Four", href: "#" },
          { children: "Link Twenty Five", href: "#" },
        ],
      },
      {
        title: "Column Six",
        links: [
          { children: "Link Twenty Six", href: "#" },
          { children: "Link Twenty Seven", href: "#" },
          { children: "Link Twenty Eight", href: "#" },
          { children: "Link Twenty Nine", href: "#" },
          { children: "Link Thirty", href: "#" },
        ],
      },
    ],
    logo: {
      src: "/placeholders/icons/doc-tahedroid.png",
      alt: "Company Logo",
    },
    copyrightText: "© 2023 Drupal Decoupled. All rights reserved.",
  },
  argTypes: {
    columns: { control: "object" },
    logo: { control: "object" },
    copyrightText: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const FewerColumns: Story = {
  args: {
    columns: meta.args!.columns!.slice(0, 3),
  },
};

export const CustomCopyright: Story = {
  args: {
    copyrightText: "© 2023 Your Company Name. All rights reserved.",
  },
};
