import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'
import { Button, ButtonProps } from './Button'
import { SimpleCard, SimpleCardProps } from './SimpleCard'
import { TeaserCard, TeaserCardProps } from './TeaserCard'
import { LinkProps } from './types'

const cardGroupVariants = cva('w-full py-12 md:py-16', {
  variants: {},
  defaultVariants: {},
})

type ActionProps = ButtonProps & LinkProps

type CardItem =
  | ({ type: 'simple' } & SimpleCardProps)
  | ({ type: 'teaser' } & TeaserCardProps)

type Props = {
  heading: string
  subheading?: string
  description?: string
  action?: ActionProps
  cards: CardItem[]
}

export type CardGroupProps = ComponentProps<'div'> &
  VariantProps<typeof cardGroupVariants> &
  Required<Pick<Props, 'cards'>> &
  Partial<Omit<Props, 'cards'>>

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
          {subheading && <p className="font-semibold text-gray-900 dark:text-gray-100 mb-4 text-lg sm:text-xl md:text-2xl">{subheading}</p>}
          <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-5 text-3xl sm:text-4xl md:text-5xl">{heading}</h2>
          {description && (
            <p className="text-muted-foreground mx-auto max-w-2xl">
              {description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
}

CardGroup.displayName = 'CardGroup'
