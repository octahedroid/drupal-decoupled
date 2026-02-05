import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { Button, type ButtonProps } from "~/components/primitives";
import { cn } from "~/lib/utils";

const ctaVariants = cva(
  "w-full max-w-4xl mx-auto text-center px-4 py-8 md:py-12 lg:py-16",
  {
    variants: {},
    defaultVariants: {},
  },
);

export interface CTAProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof ctaVariants> {
  heading: string;
  subheading?: string;
  description: string;
  actions: ButtonProps[];
}

export const CTA = ({
  className,
  subheading,
  heading,
  description,
  actions,
  ...props
}: CTAProps) => {
  return (
    <div className={cn(ctaVariants(), className)} {...props}>
      {subheading && (
        <h5 className="mb-4 text-lg font-semibold text-gray-900 sm:text-xl md:text-2xl dark:text-gray-100">
          {subheading}
        </h5>
      )}
      <h2 className="mb-5 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
        {heading}
      </h2>
      <p className="text-muted-foreground mx-auto mb-4 max-w-2xl">
        {description}
      </p>
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {actions.slice(0, 2).map(({ internal, ...actionProps }, index) => (
            <Button
              internal={internal}
              variant={index === 1 ? "outline" : "default"}
              {...actionProps}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

CTA.defaults = {
  heading: "Default CTA Heading",
  description: "This is a default CTA description",
  actions: [
    {
      text: "Primary Action",
      internal: true,
      href: "#",
    },
    {
      text: "Secondary Action",
      internal: true,
      href: "#",
    },
  ],
} satisfies CTAProps;
