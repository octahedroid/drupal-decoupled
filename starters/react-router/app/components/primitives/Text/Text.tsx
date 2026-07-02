import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "~/lib/utils";

const textVariants = cva("text-pretty", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
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

export interface TextProps
  extends ComponentPropsWithoutRef<"p">,
    VariantProps<typeof textVariants> {
  text: string;
}

export const Text = ({ className, text, size, tone, ...props }: TextProps) => {
  return (
    <p className={cn(textVariants({ size, tone, className }))} {...props}>
      {text}
    </p>
  );
};
