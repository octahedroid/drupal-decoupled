import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/components/ui/utils'
import { Badge, Button, LinkProps, ImageProps } from '@/components/ui'
import { ChevronRight } from 'lucide-react'
import { ComponentProps } from 'react'

const teaserCardVariants = cva(
  'w-full overflow-hidden rounded-lg shadow-md flex flex-col',
  {
    variants: {},
    defaultVariants: {},
  }
)

export type Props = {
  image: ImageProps
  tags?: string[]
  heading: string
  summary: string
  link: LinkProps
  className?: string
  type: string
}

export type TeaserCardProps = ComponentProps<'div'> &
  VariantProps<typeof teaserCardVariants> &
  Props

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
      <div className="flex flex-grow flex-col space-y-2 p-4">
        {tags && tags.length > 0 && (
          <div className="flex gap-2">
            {tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl md:text-4xl">
          {heading}
        </h3>
        <p className="text-muted-foreground flex-grow text-sm">{summary}</p>
        {link && link.text && link.href && (
          <div className="pt-2">
            <Button variant="link" asChild className="p-0">
              <a href={link.href ?? undefined} className="flex items-center">
                {link?.text}
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

TeaserCard.displayName = 'TeaserCard'
