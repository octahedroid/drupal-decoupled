import type { Meta, StoryObj } from '@storybook/react'
import { MainLayout } from './MainLayout'
import { Hero } from './Hero'
import { CardGroup } from './CardGroup'
import { CTA } from './CTA'
import { Testimonial } from './Testimonial'
import { FAQ } from './FAQ'
import { Header } from './Header'
import { Footer } from './Footer'

const meta: Meta<typeof MainLayout> = {
  title: 'Layout/Page Layout',
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
        <Hero
          actions={[
            {
              href: '#',
              text: 'Get Started',
              variant: 'default',
            },
            {
              href: '#',
              text: 'Learn More',
              variant: 'outline',
            },
          ]}
          description="This is a default description. You can customize it to fit your needs."
          heading="Welcome to our Hero Section"
          image={{
            alt: 'Default hero image',
            src: '/placeholders/drupal-decoupled/landscape-large.png',
          }}
        />
        <CardGroup
          action={{
            href: '#',
            text: 'Get Started',
          }}
          cards={[
            {
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
              heading: 'Short summary of step one',
              image: {
                alt: 'Step 1',
                src: '/placeholders/icons/drupal-decoupled-hexagon.png',
              },
              type: 'simple',
            },
            {
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
              heading: 'Short summary of step two',
              image: {
                alt: 'Step 2',
                src: '/placeholders/icons/drupal-decoupled-hexagon.png',
              },
              type: 'simple',
            },
            {
              description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
              heading: 'Short summary of step three',
              image: {
                alt: 'Step 3',
                src: '/placeholders/icons/drupal-decoupled-hexagon.png',
              },
              type: 'simple',
            },
          ]}
          description="Follow these simple steps to get started with our service."
          heading="How it works"
          subheading="Understand our process"
        />
        <CTA
          actions={[
            {
              href: '/signup',
              text: 'Sign Up',
              variant: 'default',
            },
            {
              href: '/about',
              text: 'Learn More',
              variant: 'outline',
            },
          ]}
          description="Sign up now and start enjoying our amazing features. It's quick, easy, and free to get started!"
          heading="Ready to get started?"
          subheading="Join us today"
        />
        <Testimonial
          heading="Our customers love our product"
          people={{
            avatar: '/api/placeholder/100/100',
            company: 'Tech Innovators Inc.',
            name: 'John Doe',
            position: 'CEO',
          }}
          quote="This solution has revolutionized how we manage our projects. It's a game-changer for our team's productivity."
        />
        <FAQ
          description="Frequently asked questions ordered by popularity. Remember that if the visitor has not committed to the call to action, they may still have questions (doubts) that can be answered."
          heading="Frequently asked questions"
          questions={[
            {
              answer:
                'We offer a 30-day money-back guarantee for all our products. If you',
              question: 'What is your return policy?',
            },
            {
              answer:
                'Shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders.',
              question: 'How long does shipping take?',
            },
            {
              answer:
                'Yes, we ship to most countries worldwide. Shipping costs and delivery times may vary depending on the destination.',
              question: 'Do you offer international shipping?',
            },
            {
              answer:
                'We strive to use sustainable materials and eco-friendly packaging whenever possible. Many of our products are made from recycled or biodegradable materials.',
              question: 'Are your products eco-friendly?',
            },
            {
              answer:
                'You can reach our customer support team via email at support@example.com or by phone at 1-800-123-4567, Monday through Friday, 9am to 5pm EST.',
              question: 'How can I contact customer support?',
            },
          ]}
        />
        <CardGroup
          action={{
            href: '#',
            text: 'Get Started',
          }}
          cards={[
            {
              heading: 'Blog title heading will go here',
              image: {
                alt: 'Blog post 1',
                src: '/placeholders/drupal-decoupled/landscape-small.png',
              },
              link: {
                href: '#',
                text: 'Read more',
              },
              summary:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
              tags: ['Category', 'Featured'],
              type: 'teaser',
            },
            {
              heading: 'Blog title heading will go here',
              image: {
                alt: 'Blog post 2',
                src: '/placeholders/doc-tahedroid/landscape-small.png',
              },
              link: {
                href: '#',
                text: 'Read more',
              },
              summary:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
              tags: ['Category'],
              type: 'teaser',
            },
            {
              heading: 'Blog title heading will go here',
              image: {
                alt: 'Blog post 3',
                src: '/placeholders/drupal-decoupled/landscape-small.png',
              },
              link: {
                href: '#',
                text: 'Read more',
              },
              summary:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
              tags: ['New', 'Popular'],
              type: 'teaser',
            },
          ]}
          description="Follow these simple steps to get started with our service."
          heading="How it works"
          subheading="Understand our process"
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
