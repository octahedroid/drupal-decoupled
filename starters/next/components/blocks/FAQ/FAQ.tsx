import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { Accordion } from "@/components/primitives";
import { cn } from "@/lib/utils";

const faqVariants = cva(
  "w-full max-w-3xl mx-auto px-4 py-8 md:py-12 lg:py-16",
  {
    variants: {},
    defaultVariants: {},
  },
);

type QuestionProps = {
  question: string;
  answer: string;
};

export interface FAQProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof faqVariants> {
  heading: string;
  description?: string;
  questions: QuestionProps[];
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
      <h2 className="mb-5 text-center text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
        {heading}
      </h2>
      {description && (
        <p className="text-muted-foreground mb-8 text-center text-lg">
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
  );
};
