import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'
import { Button, ButtonProps } from './Button'
import { SimpleCard, SimpleCardProps } from './SimpleCard'
import { TeaserCard, TeaserCardProps } from './TeaserCard'

const cardGroupVariants = cva('w-full py-12 md:py-16', {
  variants: {},
  defaultVariants: {},
})

type ActionProps = ButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    text: string
  }

type CardItem =
  | ({ type: 'simple' } & SimpleCardProps)
  | ({ type: 'teaser' } & TeaserCardProps)

export interface CardGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardGroupVariants> {
  heading: string
  subheading?: string
  description?: string
  action?: ActionProps
  cards: CardItem[]
}

export const CardGroup = React.forwardRef<HTMLDivElement, CardGroupProps>(
  (
    { className, heading, subheading, description, action, cards, ...props },
    ref,
  ) => {
    return (
      <div className={cn(cardGroupVariants(), className)} ref={ref} {...props}>
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            {subheading && (
              <p className="text-l mb-4 font-semibold">{subheading}</p>
            )}
            <h2 className="mb-4 text-3xl font-bold">{heading}</h2>
            {description && (
              <p className="text-muted-foreground mx-auto max-w-2xl">
                {description}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {cards.map((card, index) =>
              card.type === 'simple' ? (
                <SimpleCard key={index} {...card} />
              ) : (
                <TeaserCard key={index} {...card} />
              ),
            )}
          </div>
          {action && (
            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <a href={action.href}>{action.text}</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  },
)

CardGroup.displayName = 'CardGroup'
