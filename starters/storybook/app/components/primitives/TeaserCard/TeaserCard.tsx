import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronRight } from 'lucide-react'
import { ComponentProps } from 'react'
import {
  Badge,
  Button,
  ButtonProps,
  Image,
  ImageProps,
} from '~/components/primitives'
import { cn } from '~/lib/utils'

const teaserCardVariants = cva(
  'w-full overflow-hidden rounded-lg shadow-md flex flex-col',
  {
    variants: {},
    defaultVariants: {},
  }
)

export interface TeaserCardProps
  extends ComponentProps<'div'>,
    VariantProps<typeof teaserCardVariants> {
  image: ImageProps
  tags?: string[]
  heading: string
  summary: string
  details: ButtonProps
  type: string
}

export const TeaserCard = ({
  className,
  image,
  tags,
  heading,
  summary,
  details,
  ...props
}: TeaserCardProps) => {
  return (
    <div className={cn(teaserCardVariants(), className)} {...props}>
      <div className="relative">
        <Image
          {...image}
          alt={image?.alt}
          className={cn('h-auto w-full object-cover')}
        />
      </div>
      <div className="flex flex-grow flex-col space-y-2 p-4">
        {tags && tags.length > 0 && (
          <div className="flex gap-2">
            {tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" text={tag}></Badge>
            ))}
          </div>
        )}
        <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl md:text-4xl">
          {heading}
        </h3>
        <p className="flex-grow text-sm text-muted-foreground">{summary}</p>
        {details && (
          <div className="pt-2">
            <Button
              variant="link"
              className="p-0"
              icon={ChevronRight}
              internal
              {...details}
            />
          </div>
        )}
      </div>
    </div>
  )
}
