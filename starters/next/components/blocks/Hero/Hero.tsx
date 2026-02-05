import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import {
  Button,
  type ButtonProps,
  Image,
  type ImageProps,
} from "@/components/primitives";
import { cn } from "@/lib/utils";

const heroVariants = cva("w-full px-4 py-8 md:py-16 lg:py-24", {
  variants: {},
  defaultVariants: {},
});

export interface HeroProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof heroVariants> {
  heading: string;
  description: string;
  image?: ImageProps;
  actions?: ButtonProps[];
}

export const Hero = ({
  className,
  heading,
  description,
  image,
  actions,
  ...props
}: HeroProps) => {
  return (
    <div className={cn(heroVariants(), className)} {...props}>
      <div className="container mx-auto grid items-center gap-8 lg:grid-cols-2">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
            {heading}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg lg:mx-0">
            {description}
          </p>
          {actions && actions.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              {actions.slice(0, 2).map(({ variant, ...actionProps }, index) => (
                <Button
                  variant={index === 1 ? "outline" : variant || "default"}
                  {...actionProps}
                  key={index}
                />
              ))}
            </div>
          )}
        </div>
        <div className="order-first mx-auto w-full max-w-lg lg:order-last lg:max-w-none">
          {image && (
            <Image {...image} className={cn("h-auto w-full object-cover")} />
          )}
        </div>
      </div>
    </div>
  );
};

Hero.defaults = {
  heading: "Welcome to our Hero Section",
  description:
    "This is a default description. You can customize it to fit your needs.",
  image: {
    src: "/app/static/placeholders/doc-tahedroid/hero-landscape-large.png",
    alt: "Default hero image",
  },
  actions: [
    { text: "Get Started", href: "#", variant: "default", internal: true },
    { text: "Learn More", href: "#", variant: "outline" },
  ],
} satisfies HeroProps;
