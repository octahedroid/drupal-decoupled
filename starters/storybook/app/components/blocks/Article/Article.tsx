import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import {
  Avatar,
  AvatarProps,
  Badge,
  ImageProps,
  RichText,
} from '~/components/primitives'
import { cn } from '~/lib/utils'

const articleVariants = cva('w-full mb-12 md:mb-16', {
  variants: {},
  defaultVariants: {},
})

type AuthorProps = {
  avatar: AvatarProps
  name: string
}

export interface ArticleProps
  extends ComponentPropsWithoutRef<'article'>,
    VariantProps<typeof articleVariants> {
  title: string
  summary?: string
  content: string
  image: ImageProps
  tags?: string[]
  publishDate: number
  author: AuthorProps
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000) // Convert seconds to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }
  return date.toLocaleDateString('en-US', options)
}

export const Article = ({
  className,
  title,
  summary,
  content,
  image,
  tags,
  publishDate,
  author,
  ...props
}: ArticleProps) => {
  return (
    <article className={cn(articleVariants(), className)} {...props}>
      <div className="md:md-16 container mb-12">
        <img
          {...image}
          alt={image.alt}
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="mx-auto mb-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar src={author.avatar.src} name={author.name} />
            <p className="text-sm font-medium">{author.name}</p>
          </div>
          <p className="text-sm text-gray-500">{formatDate(publishDate)}</p>
        </div>
        {tags && (
          <div className="mb-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge text={tag} variant="secondary" />
            ))}
          </div>
        )}
        {summary && <p className="mb-8 italic text-gray-400">{summary}</p>}
        <RichText content={content} />
      </div>
    </article>
  )
}

Article.defaultProps = {
  title: 'How designers estimate the impact of UX?',
  summary: 'Designers wear many hats, the first one being a moderator.',
  content: `
      <p>Designers aren't purely focused on aesthetics — their role encompasses broader business aspects and technology, while carefully evaluating those by estimating the return on investment for each solution.</p>
      <p>In short, designers ensure that the end value of the specific solution, or product as a whole, brings gains to the client's business as expected and a significant return against the initial investment.</p>
      <h3>Core Areas of Focus</h3>
      <p>At intive, our designers maintain this awareness by developing across three core areas:</p>
      <ul>
        <li>Business</li>
        <li>Technology</li>
        <li>User-centric design practices</li>
      </ul>
      <p>For each vertical, they keep ROI in mind, taking care to estimate and realize the impact of UX on the client's budget, goals, and wider technical framework.</p>
    `,
  image: {
    src: '/placeholders/drupal-decoupled/landscape-large.png',
    alt: 'A cartoon character on a beach with an ice cream',
  },
  tags: ['UX', 'Design', 'Business'],
  publishDate: 1667260800,
  author: {
    avatar: {
      src: '/placeholders/doc-tahedroid/avatar.png',
      name: 'Doc Tahedroid',
    },
    name: 'Doc Tahedroid',
  },
} satisfies ArticleProps
