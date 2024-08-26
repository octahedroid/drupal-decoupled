import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'
import { Badge } from './Badge'
import { Button } from './Button'
import { ChevronRight } from 'lucide-react'

const teaserCardVariants = cva('w-full overflow-hidden rounded-lg shadow-md', {
  variants: {
    size: {
      default: '',
      small: 'max-w-sm',
      large: 'max-w-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export interface TeaserCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof teaserCardVariants> {
  image: React.ImgHTMLAttributes<HTMLImageElement>
  tags?: string[]
  heading: string
  summary: string
  link: {
    href: string
    text: string
  }
}

export const TeaserCard = React.forwardRef<HTMLDivElement, TeaserCardProps>(
  ({ className, image, tags, heading, summary, link, size, ...props }, ref) => {
    return (
      <div
        className={cn(teaserCardVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        <div className="relative">
          <img
            {...image}
            alt={image.alt || heading}
            className={cn('h-48 w-full object-cover', image.className)}
          />
        </div>
        <div className="space-y-2 p-4">
          {tags && tags.length > 0 && (
            <div className="flex gap-2">
              {tags.slice(0, 2).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/80 text-gray-800"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <h3 className="text-xl font-semibold">{heading}</h3>
          <p className="text-muted-foreground text-sm">{summary}</p>
          <Button variant="link" asChild className="p-0">
            <a href={link.href} className="flex items-center">
              {link.text}
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    )
  },
)

TeaserCard.displayName = 'TeaserCard'
