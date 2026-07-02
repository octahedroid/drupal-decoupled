import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "~/lib/utils";

const sectionVariants = cva("w-full", {
  variants: {
    background: {
      default: "bg-background text-foreground",
      muted: "bg-muted/40 text-foreground",
      primary: "bg-primary text-primary-foreground",
    },
    padding: {
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-24 md:py-32",
    },
  },
  defaultVariants: {
    background: "default",
    padding: "lg",
  },
});

export interface SectionProps
  extends ComponentPropsWithoutRef<"section">,
    VariantProps<typeof sectionVariants> {
  children?: ReactNode;
}

export const Section = ({
  className,
  background,
  padding,
  children,
  ...props
}: SectionProps) => {
  return (
    <section
      className={cn(sectionVariants({ background, padding, className }))}
      {...props}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
};
