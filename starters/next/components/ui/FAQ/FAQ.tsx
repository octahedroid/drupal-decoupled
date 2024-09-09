import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/components/ui/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  RichText,
} from '@/components/ui'
import { ComponentProps } from 'react'

const faqVariants = cva(
  'w-full max-w-3xl mx-auto px-4 py-8 md:py-12 lg:py-16 text-center',
  {
    variants: {},
    defaultVariants: {},
  }
)

type QuestionProps = {
  question: string
  answer: string
}

type Props = {
  heading: string
  description?: string | null
  questions: QuestionProps[]
}

export type FAQProps = ComponentProps<'div'> &
  VariantProps<typeof faqVariants> &
  Props

export const FAQ = ({
  className,
  heading,
  description,
  questions,
  ...props
}: FAQProps) => {
  return (
    <div className={cn(faqVariants(), className)} {...props}>
      <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
        {heading}
      </h2>
      {description && (
        <p className="text-muted-foreground mb-8 text-lg">{description}</p>
      )}
      <Accordion type="single" collapsible className="w-full">
        {questions &&
          questions.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-left">
                <RichText content={item.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  )
}

FAQ.displayName = 'FAQ'
