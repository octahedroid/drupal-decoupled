import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import {
  Button,
  ButtonProps,
  SimpleCard,
  SimpleCardProps,
  TeaserCard,
  TeaserCardProps,
} from '@/components/primitives'
import { cn } from '@/lib/utils'

const cardGroupVariants = cva('w-full py-12 md:py-16', {
  variants: {},
  defaultVariants: {},
})

type CardItem = SimpleCardProps | TeaserCardProps

export interface CardGroupProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof cardGroupVariants> {
  heading?: string
  subheading?: string
  description?: string
  action?: ButtonProps
  cards: CardItem[]
}

export const CardGroup = ({
  className,
  heading,
  subheading,
  description,
  action,
  cards,
  ...props
}: CardGroupProps) => {
  return (
    <div className={cn(cardGroupVariants(), className)} {...props}>
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          {subheading && (
            <h5 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100 sm:text-xl md:text-2xl">
              {subheading}
            </h5>
          )}
          {heading && (
            <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((card, index) => {
            return card && card.type === 'simple' ? (
              <SimpleCard key={index} {...(card as SimpleCardProps)} />
            ) : (
              <TeaserCard key={index} {...(card as TeaserCardProps)} />
            )
          })}
        </div>
        {action && (
          <div className="mt-12 text-center">
            <Button {...action} variant="outline" />
          </div>
        )}
      </div>
    </div>
  )
}

CardGroup.defaultProps = {
  heading: 'How it works',
  subheading: 'Understand our process',
  description: 'Follow these simple steps to get started with our service.',
  action: {
    text: 'Get Started',
    href: '#',
  },
  cards: [
    {
      type: 'simple',
      image: {
        src: '/placeholders/icons/drupal-decoupled-hexagon.png',
        alt: 'Step 1',
      },
      heading: 'Short summary of step one',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
    {
      type: 'simple',
      image: {
        src: '/placeholders/icons/drupal-decoupled-hexagon.png',
        alt: 'Step 2',
      },
      heading: 'Short summary of step two',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
    {
      type: 'simple',
      image: {
        src: '/placeholders/icons/drupal-decoupled-hexagon.png',
        alt: 'Step 3',
      },
      heading: 'Short summary of step three',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
  ],
} satisfies CardGroupProps
