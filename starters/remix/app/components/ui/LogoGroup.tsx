import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'

const logoGroupVariants = cva('w-full py-8 md:py-12', {
  variants: {},
  defaultVariants: {},
})

interface LogoProps {
  image: React.ImgHTMLAttributes<HTMLImageElement>
  link: string
}

export interface LogoGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logoGroupVariants> {
  heading: string
  logos: LogoProps[]
}

export const LogoGroup = React.forwardRef<HTMLDivElement, LogoGroupProps>(
  ({ className, heading, logos, ...props }, ref) => {
    return (
      <div className={cn(logoGroupVariants(), className)} ref={ref} {...props}>
        <div className="container mx-auto">
          <h2 className="mb-6 text-center text-xl font-semibold md:mb-8">
            {heading}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo, index) => (
              <a
                key={index}
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  {...logo.image}
                  alt={logo.image.alt || `Logo ${index + 1}`}
                  className={cn(
                    'h-8 w-auto object-contain',
                    logo.image.className,
                  )}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  },
)

LogoGroup.displayName = 'LogoGroup'
