import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/components/ui/utils'
import {
  Button,
  ButtonProps,
  SimpleCard,
  SimpleCardProps,
  TeaserCard,
  TeaserCardProps,
  LinkProps,
} from '@/components/ui'

const cardGroupVariants = cva('w-full py-12 md:py-16', {
  variants: {},
  defaultVariants: {},
})

type ActionProps = ButtonProps | LinkProps

type CardItem = SimpleCardProps | TeaserCardProps

type Props = {
  heading?: string | null
  subheading?: string | null
  description?: string | null
  action?: ActionProps | null
  cards: CardItem[]
}

export type CardGroupProps = ComponentProps<'div'> &
  VariantProps<typeof cardGroupVariants> &
  Props

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
          <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
            {heading}
          </h2>
          {description && (
            <p className="text-muted-foreground mx-auto max-w-2xl">
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
        {action && action.href && (
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <a href={action.href}>{action.text}</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

CardGroup.displayName = 'CardGroup'
