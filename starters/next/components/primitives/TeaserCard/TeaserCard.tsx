import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import {
  Badge,
  Button,
  type ButtonProps,
  Image,
  type ImageProps,
} from "@/components/primitives";
import { cn } from "@/lib/utils";

const teaserCardVariants = cva(
  "w-full overflow-hidden rounded-lg shadow-md flex flex-col",
  {
    variants: {},
    defaultVariants: {},
  },
);

export interface TeaserCardProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof teaserCardVariants> {
  image: ImageProps;
  tags?: string[];
  heading: string;
  summary: string;
  details: ButtonProps;
  type: string;
}

export const TeaserCard = ({
  className,
  image,
  tags,
  heading,
  summary,
  details,
  ...props
}: TeaserCardProps) => {
  return (
    <div className={cn(teaserCardVariants(), className)} {...props}>
      <div className="relative">
        <Image
          {...image}
          alt={image?.alt}
          className={cn("h-auto w-full object-cover")}
        />
      </div>
      <div className="flex grow flex-col space-y-2 p-4">
        {tags && tags.length > 0 && (
          <div className="flex gap-2">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" text={tag}></Badge>
            ))}
          </div>
        )}
        <h3 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-gray-100">
          {heading}
        </h3>
        <p className="text-muted-foreground grow text-sm">{summary}</p>
        {details && (
          <div className="pt-2">
            <Button variant="link" className="p-0" internal {...details}>
              <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
