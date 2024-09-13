import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/components/ui/utils'
import { Button, ButtonProps, ImageProps } from '@/components/ui'

const heroVariants = cva('w-full px-4 py-8 md:py-16 lg:py-24', {
  variants: {},
  defaultVariants: {},
})

type Props = {
  heading: string
  description: string
  image?: ImageProps
  actions?: ButtonProps[]
}

export type HeroProps = ComponentProps<'div'> &
  VariantProps<typeof heroVariants> &
  Props

export const Hero = ({
  className,
  heading,
  description,
  image,
  actions,
  ...props
}: HeroProps) => {
  return (
    <div className={cn(heroVariants(), className)} {...props}>
      <div className="container mx-auto grid items-center gap-8 lg:grid-cols-2">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
            {heading}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg lg:mx-0">
            {description}
          </p>
          {actions && actions.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
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
        <div className="order-first mx-auto w-full max-w-lg lg:order-last lg:max-w-none">
          {image && (
            <img {...image} className={cn('h-auto w-full object-cover')} />
          )}
        </div>
      </div>
    </div>
  )
}

Hero.displayName = 'Hero'
