import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import { Avatar, type AvatarProps } from '@/components/primitives'
import { cn } from '@/lib/utils'

const testimonialVariants = cva(
  'w-full max-w-3xl mx-auto text-center px-4 py-8 md:py-12 lg:py-16',
  {
    variants: {},
    defaultVariants: {},
  }
)

type AuthorProps = {
  avatar: AvatarProps
  name: string
  position: string
  company: string
}

export interface TestimonialProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof testimonialVariants> {
  quote: string
  author: AuthorProps
}

export const Testimonial = ({
  className,
  quote,
  author,
  ...props
}: TestimonialProps) => {
  return (
    <div className={cn(testimonialVariants(), className)} {...props}>
      <blockquote className="mb-10 text-2xl font-bold sm:text-3xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex flex-col items-center">
        <Avatar src={author.avatar.src} name={author.name} />
        <div className="text-center">
          <p className="font-semibold">{author.name}</p>
          <p className="text-sm text-muted-foreground">
            {author.position}, {author.company}
          </p>
        </div>
      </div>
    </div>
  )
}

Testimonial.defaultProps = {
  quote:
    "This product has completely transformed our workflow. It's intuitive, powerful, and addresses all the pain points we were experiencing with our previous solution.",
  author: {
    avatar: {
      src: 'placeholders/doc-tahedroid/avatar.png',
      name: 'Doc Tahedroid',
    },
    name: 'Doc Tahedroid',
    position: 'CEO',
    company: 'Tech Innovators Inc.',
  },
} satisfies TestimonialProps
