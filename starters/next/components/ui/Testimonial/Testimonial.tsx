import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/components/ui/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui'
import { ComponentProps } from 'react'

const testimonialVariants = cva(
  'w-full max-w-3xl mx-auto text-center px-4 py-8 md:py-12 lg:py-16',
  {
    variants: {},
    defaultVariants: {},
  }
)

export type AvatarProps = {
  src: string
  alt: string
}
export type AuthorProps = {
  avatar: AvatarProps
  name: string
  position: string
  company: string
}

export type Props = {
  quote: string
  author: AuthorProps
}

export type TestimonialProps = ComponentProps<'div'> &
  VariantProps<typeof testimonialVariants> &
  Props

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
        <Avatar className="mb-4 h-16 w-16">
          <AvatarImage
            src={author.avatar.src}
            alt={author.avatar.alt || author.name}
          />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="font-semibold">{author.name}</p>
          <p className="text-muted-foreground text-sm">
            {author.position}, {author.company}
          </p>
        </div>
      </div>
    </div>
  )
}

Testimonial.displayName = 'Testimonial'
