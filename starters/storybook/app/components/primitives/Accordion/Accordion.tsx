import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadcnAccordion,
} from '~/components/ui/accordion'

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
        <AccordionItem value={`item-${index}`}>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </ShadcnAccordion>
  )
}
