import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/utils/ui'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion'

const faqVariants = cva(
  'w-full max-w-3xl mx-auto px-4 py-8 md:py-12 lg:py-16 text-center',
  {
    variants: {},
    defaultVariants: {},
  },
)

type QuestionProps = {
  question: string
  answer: string
}

type Props = {
  heading: string
  description?: string
  questions: QuestionProps[]
}

type FAQProps = ComponentProps<'div'> & VariantProps<typeof faqVariants> & Partial<Props>

export const FAQ = ({ className, heading, description, questions, ...props }: FAQProps) => {
  return (
    <div className={cn(faqVariants(), className)} {...props}>
      <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {heading}
      </h2>
      {description && (
        <p className="text-muted-foreground mb-8 text-lg">{description}</p>
      )}
      <Accordion type="single" collapsible className="w-full">
        {questions && questions.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className='text-left' >{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

FAQ.displayName = 'FAQ'

