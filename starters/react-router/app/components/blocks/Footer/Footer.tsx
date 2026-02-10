import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { type ImageProps, Link, type LinkProps } from "~/components/primitives";
import { cn } from "~/lib/utils";

const footerVariants = cva("w-full bg-gray-200 ", {
  variants: {},
  defaultVariants: {},
});

type FooterColumn = {
  title: string;
  links: LinkProps[];
};

export interface FooterProps
  extends ComponentPropsWithoutRef<"footer">,
    VariantProps<typeof footerVariants> {
  columns: FooterColumn[];
  logo: ImageProps;
  copyrightText: string;
}

const FooterColumn = ({ title, links }: FooterColumn) => (
  <div className="mb-8 lg:mb-0">
    <h5 className="h5">{title}</h5>
    <ul className="space-y-2">
      {links.map(
        (link) =>
          link && (
            <li key={`${link.children}-${link.href}`}>
              <Link {...link}>{link.children}</Link>
            </li>
          ),
      )}
    </ul>
  </div>
);

export const Footer = ({
  className,
  columns,
  logo,
  copyrightText,
  ...props
}: FooterProps) => {
  return (
    <footer className={cn(footerVariants(), className)} {...props}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {columns.map((column) => (
            <FooterColumn key={column.title} {...column} />
          ))}
        </div>
        <div className="border-border mt-12 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <div className="mb-4 md:mb-0">
            <img src={logo.src} alt={logo.alt} className="h-8 w-auto" />
          </div>
          <div className="text-muted-foreground text-sm">{copyrightText}</div>
        </div>
      </div>
    </footer>
  );
};
