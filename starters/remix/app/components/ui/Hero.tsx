import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'
import { Button, ButtonProps } from './Button'
import { LinkProps, ImageProps } from './types'

const heroVariants = cva('w-full px-4 py-16 md:py-24 lg:py-32', {
  variants: {},
  defaultVariants: {},
})

type ActionProps = ButtonProps & LinkProps

export interface HeroProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof heroVariants> {
  heading: string
  description?: string
  image: ImageProps
  actions?: ActionProps[]
}

export const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ className, heading, description, image, actions, ...props }, ref) => {
    return (
      <div className={cn(heroVariants(), className)} ref={ref} {...props}>
        <div className="container mx-auto grid items-center gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {heading}
            </h1>
            {description && (
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg lg:mx-0">
                {description}
              </p>
            )}
            {actions && actions.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                {actions.map(({ text, href, ...actionProps }, index) => (
                  <Button key={index} asChild {...actionProps}>
                    <a href={href}>{text}</a>
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="order-first mx-auto w-full max-w-lg lg:order-last lg:max-w-none">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img {...image} className={cn('h-auto w-full object-cover')} />
          </div>
        </div>
      </div>
    )
  },
)

Hero.displayName = 'Hero'
