import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'
import { Button, ButtonProps } from './Button'
import { LinkProps } from './types'

const ctaVariants = cva(
  'w-full max-w-4xl mx-auto text-center px-4 py-8 md:py-12 lg:py-16',
  {
    variants: {},
    defaultVariants: {},
  },
)

type ActionProps = ButtonProps & LinkProps

type Props = {
  subheading?: string
  heading: string
  description: string
  actions: ActionProps[]
}

export type CTAProps = ComponentProps<'div'> &
  VariantProps<typeof ctaVariants> &
  Partial<Props>

export const CTA = ({
  className,
  subheading,
  heading,
  description,
  actions,
  ...props
}: CTAProps) => {
  return (
    <div className={cn(ctaVariants(), className)} {...props}>
      {subheading && (
        <p className="text-l text-muted-foreground mb-4 font-semibold">
          {subheading}
        </p>
      )}
      <h2 className="h2">{heading}</h2>
      <p className="text-muted-foreground mx-auto mb-4 max-w-2xl">
        {description}
      </p>
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {actions
            .slice(0, 2)
            .map(({ text, href, variant, ...actionProps }, index) => (
              <Button
                key={index}
                variant={index === 1 ? 'outline' : variant || 'default'}
                asChild
                {...actionProps}
              >
                <a href={href}>{text}</a>
              </Button>
            ))}
        </div>
      )}
    </div>
  )
}

CTA.displayName = 'CTA'
