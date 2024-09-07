import { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/components/ui/utils";
import { ImageProps } from "@/components/ui";

const simpleCardVariants = cva("grid gap-4 text-center", {
  variants: {},
  defaultVariants: {},
});

type Props = {
  image: ImageProps;
  heading: string;
  description: string;
};

export type SimpleCardProps = ComponentProps<"div"> &
  VariantProps<typeof simpleCardVariants> &
  Partial<Props>;

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
        <img {...image} alt={image?.alt} className={cn("object-contain")} />
      </div>
      <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl md:text-4xl">
        {heading}
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

SimpleCard.displayName = "SimpleCard";
