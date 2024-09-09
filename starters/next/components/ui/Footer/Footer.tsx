import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/components/ui/utils'
import { LinkProps, ImageProps } from '@/components/ui'

const footerVariants = cva('w-full bg-gray-200 ', {
  variants: {},
  defaultVariants: {},
})

type FooterColumn = {
  title: string
  links: LinkProps[]
}

type Props = {
  columns: FooterColumn[]
  logo: ImageProps
  copyrightText: string
}

export type FooterProps = ComponentProps<'footer'> &
  VariantProps<typeof footerVariants> &
  Props

const FooterColumn = ({ title, links }: FooterColumn) => (
  <div className="mb-8 lg:mb-0">
    <h5 className="h5">{title}</h5>
    <ul className="space-y-2">
      {links.map(
        (link, index) =>
          link &&
          link.href && (
            <li key={index}>
              <a
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                {link.text}
              </a>
            </li>
          )
      )}
    </ul>
  </div>
)

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
          {columns.map((column, index) => (
            <FooterColumn key={index} {...column} />
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
  )
}

Footer.displayName = 'Footer'
