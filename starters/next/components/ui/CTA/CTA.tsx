import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/components/ui/utils'
import { Button, ButtonProps } from '@/components/ui'

const ctaVariants = cva(
  'w-full max-w-4xl mx-auto text-center px-4 py-8 md:py-12 lg:py-16',
  {
    variants: {},
    defaultVariants: {},
  }
)

type Props = {
  subheading?: string
  heading: string
  description: string
  actions: ButtonProps[]
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
        <h5 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100 sm:text-xl md:text-2xl">
          {subheading}
        </h5>
      )}
      <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
        {heading}
      </h2>
      <p className="text-muted-foreground mx-auto mb-4 max-w-2xl">
        {description}
      </p>
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {actions.slice(0, 2).map(
            ({ text, href, variant, internal, ...actionProps }, index) =>
              href && (
                <Button
                  key={index}
                  variant={index === 1 ? 'outline' : variant || 'default'}
                  asChild
                  {...actionProps}
                >
                  <a
                    target={internal ? '_self' : '_blank'}
                    rel={internal ? '' : 'noopener noreferrer'}
                    href={href}
                  >
                    {text}
                  </a>
                </Button>
              )
          )}
        </div>
      )}
    </div>
  )
}

CTA.displayName = 'CTA'
