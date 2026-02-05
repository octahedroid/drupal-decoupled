import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { Image, type ImageProps } from "~/components/primitives";
import { cn } from "~/lib/utils";

const simpleCardVariants = cva("grid gap-4 text-center", {
  variants: {},
  defaultVariants: {},
});

export interface SimpleCardProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof simpleCardVariants> {
  image: ImageProps;
  heading: string;
  description: string;
  type: string;
}

export const SimpleCard = ({
  className,
  image,
  heading,
  description,
  ...props
}: SimpleCardProps) => {
  return (
    <div className={cn(simpleCardVariants(), className)} {...props}>
      <div className="place-self-center">
        <Image {...image} alt={image?.alt} className={cn("object-contain")} />
      </div>
      <h3 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-gray-100">
        {heading}
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};
