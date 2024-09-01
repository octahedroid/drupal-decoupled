import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'
import { LinkProps, ImageProps } from './types'

const logoGroupVariants = cva('w-full py-8 md:py-12', {
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
  Partial<Props>

export const LogoGroup = ({
  className,
  heading,
  logos,
  ...props
}: LogoGroupProps) => {
  return (
    <div className={cn(logoGroupVariants(), className)} {...props}>
      <div className="container mx-auto">
        <h2 className="mb-6 text-center text-xl font-semibold md:mb-8">
          {heading}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos?.map(({ link, image }, index) => (
            <a
              key={`logo-${index}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-105"
            >
              <img
                {...image}
                alt={image.alt || `Logo ${index + 1}`}
                className={cn('h-8 w-auto object-contain', image.className)}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

LogoGroup.displayName = 'LogoGroup'
