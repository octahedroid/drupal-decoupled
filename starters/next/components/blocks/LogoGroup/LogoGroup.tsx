import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import {
  Image,
  type ImageProps,
  Link,
  type LinkProps,
} from "@/components/primitives";
import { cn } from "@/lib/utils";

const logoGroupVariants = cva("w-full py-8 md:py-12 text-center", {
  variants: {},
  defaultVariants: {},
});

type LogoProps = {
  image: ImageProps;
  link: LinkProps;
};

export interface LogoGroupProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof logoGroupVariants> {
  heading: string;
  logos: LogoProps[];
}

export const LogoGroup = ({
  className,
  heading,
  logos,
  ...props
}: LogoGroupProps) => {
  return (
    <div className={cn(logoGroupVariants(), className)} {...props}>
      <div className="container mx-auto">
        <h2 className="mb-5 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
          {heading}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map(({ link, image }) => (
            <Link key={link.href} {...link}>
              <Image
                {...image}
                alt={image.alt || "Logo"}
                className={cn("h-8 w-auto object-contain", image.className)}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
