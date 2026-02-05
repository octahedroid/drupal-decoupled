import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "~/lib/utils";

const richTextVariants = cva("prose max-w-none", {
  variants: {},
  defaultVariants: {},
});

export interface RichTextProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof richTextVariants> {
  content: string;
}

export const RichText = ({ className, content, ...props }: RichTextProps) => {
  return (
    <div
      className={cn(richTextVariants(), className)}
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    />
  );
};
