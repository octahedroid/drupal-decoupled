import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "~/lib/utils";

const headingVariants = cva("font-bold text-balance", {
  variants: {
    size: {
      sm: "text-2xl sm:text-3xl",
      md: "text-3xl sm:text-4xl",
      lg: "text-4xl sm:text-5xl",
      xl: "text-5xl sm:text-6xl",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      inverse: "text-primary-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
  },
});

export interface HeadingProps
  extends ComponentPropsWithoutRef<"h2">,
    VariantProps<typeof headingVariants> {
  text: string;
  level?: 1 | 2 | 3 | 4;
}

export const Heading = ({
  className,
  text,
  level = 2,
  size,
  tone,
  ...props
}: HeadingProps) => {
  const Tag = `h${level}` as const;

  return (
    <Tag className={cn(headingVariants({ size, tone, className }))} {...props}>
      {text}
    </Tag>
  );
};
