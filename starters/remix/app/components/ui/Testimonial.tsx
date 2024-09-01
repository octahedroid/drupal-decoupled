import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'
import { Avatar, AvatarImage, AvatarFallback } from './Avatar'

const testimonialVariants = cva(
  'w-full max-w-3xl mx-auto text-center px-4 py-8 md:py-12 lg:py-16',
  {
    variants: {},
    defaultVariants: {},
  },
)

export type PeopleProps = {
  avatar: string
  name: string
  position: string
  company: string
}

export type Props = {
  heading: string
  quote: string
  people: PeopleProps
}

export type TestimonialProps = ComponentProps<'div'> &
  VariantProps<typeof testimonialVariants> &
  Required<Pick<Props, 'people'>> &
  Partial<Omit<Props, 'people'>>

export const Testimonial = ({
  className,
  heading,
  quote,
  people,
  ...props
}: TestimonialProps) => {
  return (
    <div className={cn(testimonialVariants(), className)} {...props}>
      <h2 className="text-muted-foreground mb-6 text-lg font-medium">
        {heading}
      </h2>
      <blockquote className="mb-10 text-2xl font-bold sm:text-3xl">
        "{quote}"
      </blockquote>
      <div className="flex flex-col items-center">
        <Avatar className="mb-4 h-16 w-16">
          <AvatarImage src={people.avatar} alt={people.name} />
          <AvatarFallback>{people.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="font-semibold">{people.name}</p>
          <p className="text-muted-foreground text-sm">
            {people.position}, {people.company}
          </p>
        </div>
      </div>
    </div>
  )
}

Testimonial.displayName = 'Testimonial'
