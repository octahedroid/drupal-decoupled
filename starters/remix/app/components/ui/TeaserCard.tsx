import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'
import { Badge } from './Badge'
import { Button } from './Button'
import { ChevronRight } from 'lucide-react'
import { LinkProps, ImageProps } from './types'

const teaserCardVariants = cva('w-full overflow-hidden rounded-lg shadow-md', {
  variants: {},
  defaultVariants: {},
})

export type Props = {
  image: ImageProps
  tags?: string[]
  heading: string
  summary: string
  link: LinkProps
}

export type TeaserCardProps = ComponentProps<'div'> &
  VariantProps<typeof teaserCardVariants> &
  Partial<Props>

export const TeaserCard = ({
  className,
  image,
  tags,
  heading,
  summary,
  link,
  ...props
}: TeaserCardProps) => {
  return (
    <div className={cn(teaserCardVariants(), className)} {...props}>
      <div className="relative">
        <img
          {...image}
          alt={image?.alt}
          className={cn('h-auto w-full object-cover')}
        />
      </div>
      <div className="space-y-2 p-4">
        {tags && tags.length > 0 && (
          <div className="flex gap-2">
            {tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <h3 className="text-xl font-semibold">{heading}</h3>
        <p className="text-muted-foreground text-sm">{summary}</p>
        <Button variant="link" asChild className="p-0">
          <a href={link?.href} className="flex items-center">
            {link?.text}
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  )
}

TeaserCard.displayName = 'TeaserCard'
