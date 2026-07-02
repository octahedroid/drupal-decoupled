import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "~/lib/utils";

const gridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
    },
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    columns: 3,
    gap: "lg",
    align: "stretch",
  },
});

export interface GridProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof gridVariants> {
  children?: ReactNode;
}

export const Grid = ({
  className,
  columns,
  gap,
  align,
  children,
  ...props
}: GridProps) => {
  return (
    <div
      className={cn(gridVariants({ columns, gap, align, className }))}
      {...props}
    >
      {children}
    </div>
  );
};
