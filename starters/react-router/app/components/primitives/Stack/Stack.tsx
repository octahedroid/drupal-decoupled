import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "~/lib/utils";

const stackVariants = cva("flex", {
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-col sm:flex-row sm:flex-wrap",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    direction: "vertical",
    gap: "md",
    align: "start",
  },
});

export interface StackProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof stackVariants> {
  children?: ReactNode;
}

export const Stack = ({
  className,
  direction,
  gap,
  align,
  children,
  ...props
}: StackProps) => {
  return (
    <div
      className={cn(stackVariants({ direction, gap, align, className }))}
      {...props}
    >
      {children}
    </div>
  );
};
