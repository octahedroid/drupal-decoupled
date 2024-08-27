import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'
import { ImageProps } from './types'

const simpleCardVariants = cva('grid gap-4 text-center', {
  variants: {},
  defaultVariants: {},
})

type Props = {
  image: ImageProps
  heading: string
  description: string
}

export type SimpleCardProps = ComponentProps<'div'> & VariantProps<typeof simpleCardVariants> & Partial<Props>


export const SimpleCard = ({ className, image, heading, description, ...props }: SimpleCardProps) => {
  return (
    <div
      className={cn(simpleCardVariants(), className)}
      {...props}
    >
      <div className="place-self-center">
        <img
          {...image}
          alt={image?.alt}
          className={cn('h-16 w-16 object-contain')}
        />
      </div>
      <h3 className="text-lg font-semibold">{heading}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}


SimpleCard.displayName = 'SimpleCard'
