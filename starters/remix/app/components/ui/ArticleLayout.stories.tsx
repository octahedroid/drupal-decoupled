import type { Meta, StoryObj } from '@storybook/react'
import { MainLayout } from './MainLayout'
import { Header } from './Header'
import { Article } from './Article'
import { Footer } from './Footer'

const meta: Meta<typeof MainLayout> = {
  title: 'Layout/Article Layout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: (
      <>
        <Header
          actions={[
            {
              href: 'https://drupal-decoupled.octahedroid.com/docs',
              text: 'Docs',
              variant: 'outline',
            },
            {
              href: 'https://drupal-decoupled.octahedroid.com/',
              text: 'Get started',
              variant: 'default',
            },
          ]}
          logo={{
            alt: 'Company Logo',
            src: '/placeholders/icons/drupal-decoupled.png',
          }}
          navItems={[
            {
              href: '#',
              label: 'Home',
            },
            {
              children: [
                {
                  href: '#product-a',
                  label: 'Product A',
                },
                {
                  href: '#product-b',
                  label: 'Product B',
                },
                {
                  href: '#product-c',
                  label: 'Product C',
                },
              ],
              label: 'Products',
            },
            {
              children: [
                {
                  href: '#consulting',
                  label: 'Consulting',
                },
                {
                  href: '#training',
                  label: 'Training',
                },
                {
                  href: '#support',
                  label: 'Support',
                },
              ],
              label: 'Services',
            },
            {
              href: '#about',
              label: 'About',
            },
            {
              href: '#contact',
              label: 'Contact',
            },
          ]}
          sticky
        />
        <Article
          author={{
            avatar: '/placeholders/doc-tahedroid/avatar.png',
            name: 'Doc Tahedroid',
          }}
          content="
              <p>Designers aren't purely focused on aesthetics — their role encompasses broader business aspects and technology, while carefully evaluating those by estimating the return on investment for each solution.</p>
              <p>In short, designers ensure that the end value of the specific solution, or product as a whole, brings gains to the client's business as expected and a significant return against the initial investment.</p>
              <h3>Core Areas of Focus</h3>
              <p>At intive, our designers maintain this awareness by developing across three core areas:</p>
              <ul>
                <li>Business</li>
                <li>Technology</li>
                <li>User-centric design practices</li>
              </ul>
              <p>For each vertical, they keep ROI in mind, taking care to estimate and realize the impact of UX on the client's budget, goals, and wider technical framework.</p>
            "
          image={{
            alt: 'A cartoon character on a beach with an ice cream',
            src: '/placeholders/drupal-decoupled/landscape-large.png',
          }}
          publishDate={new Date('2022-11-01T00:00:00.000Z')}
          summary="Designers wear many hats, the first one being a moderator."
          tags={['UX', 'Design', 'Business']}
          title="How designers estimate the impact of UX?"
        />
        <Footer
          columns={[
            {
              links: [
                {
                  href: '#',
                  text: 'Link One',
                },
                {
                  href: '#',
                  text: 'Link Two',
                },
                {
                  href: '#',
                  text: 'Link Three',
                },
                {
                  href: '#',
                  text: 'Link Four',
                },
                {
                  href: '#',
                  text: 'Link Five',
                },
              ],
              title: 'Column One',
            },
            {
              links: [
                {
                  href: '#',
                  text: 'Link Six',
                },
                {
                  href: '#',
                  text: 'Link Seven',
                },
                {
                  href: '#',
                  text: 'Link Eight',
                },
                {
                  href: '#',
                  text: 'Link Nine',
                },
                {
                  href: '#',
                  text: 'Link Ten',
                },
              ],
              title: 'Column Two',
            },
            {
              links: [
                {
                  href: '#',
                  text: 'Link Eleven',
                },
                {
                  href: '#',
                  text: 'Link Twelve',
                },
                {
                  href: '#',
                  text: 'Link Thirteen',
                },
                {
                  href: '#',
                  text: 'Link Fourteen',
                },
                {
                  href: '#',
                  text: 'Link Fifteen',
                },
              ],
              title: 'Column Three',
            },
          ]}
          copyrightText="© 2023 Drupal Decoupled. All rights reserved."
          logo={{
            alt: 'Company Logo',
            src: '/placeholders/icons/doc-tahedroid.png',
          }}
        />
      </>
    ),
  },
  argTypes: {
    children: {
      control: 'object',
    },
  },
}

export default meta

type Story = StoryObj<typeof MainLayout>

export const Default: Story = {}
