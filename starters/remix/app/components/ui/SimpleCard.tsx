import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'

const simpleCardVariants = cva('grid gap-4 text-center', {
  variants: {
    size: {
      default: 'p-6',
      small: 'p-4',
      large: 'p-8',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export interface SimpleCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof simpleCardVariants> {
  image: React.ImgHTMLAttributes<HTMLImageElement>
  heading: string
  description: string
}

export const SimpleCard = React.forwardRef<HTMLDivElement, SimpleCardProps>(
  ({ className, image, heading, description, size, ...props }, ref) => {
    return (
      <div
        className={cn(simpleCardVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        <div className="place-self-center">
          <img
            {...image}
            alt={image.alt || heading}
            className={cn('h-16 w-16 object-contain')}
          />
        </div>
        <h3 className="text-lg font-semibold">{heading}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    )
  },
)

SimpleCard.displayName = 'SimpleCard'
