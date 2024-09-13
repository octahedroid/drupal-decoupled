import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/components/ui/utils'
import { LinkProps, ImageProps } from '@/components/ui'
import { ComponentProps } from 'react'

const logoGroupVariants = cva('w-full py-8 md:py-12 text-center', {
  variants: {},
  defaultVariants: {},
})

type LogoProps = {
  image: ImageProps
  link: LinkProps
}

type Props = {
  heading: string
  logos: LogoProps[]
}

export type LogoGroupProps = ComponentProps<'div'> &
  VariantProps<typeof logoGroupVariants> &
  Props

export const LogoGroup = ({
  className,
  heading,
  logos,
  ...props
}: LogoGroupProps) => {
  return (
    <div className={cn(logoGroupVariants(), className)} {...props}>
      <div className="container mx-auto">
        <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          {heading}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos?.map(
            ({ link, image }, index) =>
              link?.href && (
                <a
                  key={`logo-${index}`}
                  href={link.href}
                  target={link.internal ? '_self' : '_blank'}
                  rel={link.internal ? '' : 'noopener noreferrer'}
                  className="inline-block transition-transform hover:scale-105"
                >
                  <img
                    {...image}
                    alt={image.alt || `Logo ${index + 1}`}
                    className={cn('h-8 w-auto object-contain', image.className)}
                  />
                </a>
              )
          )}
        </div>
      </div>
    </div>
  )
}

LogoGroup.displayName = 'LogoGroup'
