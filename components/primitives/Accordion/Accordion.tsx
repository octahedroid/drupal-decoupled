import { RichText } from '@/components/primitives'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadcnAccordion,
} from '@/components/ui/accordion'

export interface AccordionProps {
  items: {
    title: string
    content: string
  }[]
}

export const Accordion = ({ items }: AccordionProps) => {
  return (
    <ShadcnAccordion type="multiple">
      {items.map(({ title, content }, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>
            <RichText content={content} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </ShadcnAccordion>
  )
}
