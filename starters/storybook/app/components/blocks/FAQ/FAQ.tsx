import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'
import { Accordion } from '~/components/primitives'
import { cn } from '~/lib/utils'

const faqVariants = cva(
  'w-full max-w-3xl mx-auto px-4 py-8 md:py-12 lg:py-16',
  {
    variants: {},
    defaultVariants: {},
  }
)

type QuestionProps = {
  question: string
  answer: string
}

export interface FAQProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof faqVariants> {
  heading: string
  description?: string
  questions: QuestionProps[]
}

export const FAQ = ({
  className,
  heading,
  description,
  questions,
  ...props
}: FAQProps) => {
  return (
    <div className={cn(faqVariants(), className)} {...props}>
      <h2 className="mb-5 text-center text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
        {heading}
      </h2>
      {description && (
        <p className="mb-8 text-center text-lg text-muted-foreground">
          {description}
        </p>
      )}
      <Accordion
        items={questions.map((item) => ({
          title: item.question,
          content: item.answer,
        }))}
      />
    </div>
  )
}

FAQ.defaultProps = {
  heading: 'Frequently asked questions',
  description:
    'Frequently asked questions ordered by popularity. Remember that if the visitor has not committed to the call to action, they may still have questions (doubts) that can be answered.',
  questions: [
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day money-back guarantee for all our products. If you',
    },
    {
      question: 'How long does shipping take?',
      answer:
        '<ul><li>Unordered list item 1</li><li>Unordered list item 2</li><li>Unordered list item 3</li></ul>',
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we ship to most countries worldwide. Shipping costs and delivery times may vary depending on the destination.',
    },
  ],
} satisfies FAQProps
