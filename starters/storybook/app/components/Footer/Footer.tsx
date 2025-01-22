import { cva, type VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'
import { ImageProps, Link, LinkProps } from '~/components/primitives'
import { cn } from '~/lib/utils'

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
          link && (
            <li key={index}>
              <Link {...link}>{link.children}</Link>
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
        <div className="mt-12 flex flex-col items-center justify-between border-t border-border pt-8 md:flex-row">
          <div className="mb-4 md:mb-0">
            <img src={logo.src} alt={logo.alt} className="h-8 w-auto" />
          </div>
          <div className="text-sm text-muted-foreground">{copyrightText}</div>
        </div>
      </div>
    </footer>
  )
}

Footer.defaultProps = {
  columns: [
    {
      title: 'Column One',
      links: [
        { children: 'Link One', href: '#' },
        { children: 'Link Two', href: '#' },
        { children: 'Link Three', href: '#' },
        { children: 'Link Four', href: '#' },
        { children: 'Link Five', href: '#' },
      ],
    },
    {
      title: 'Column Two',
      links: [
        { children: 'Link Six', href: '#' },
        { children: 'Link Seven', href: '#' },
        { children: 'Link Eight', href: '#' },
        { children: 'Link Nine', href: '#' },
        { children: 'Link Ten', href: '#' },
      ],
    },
  ],
  logo: {
    src: '/placeholders/icons/doc-tahedroid.png',
    alt: 'Company Logo',
  },
  copyrightText: '© 2023 Drupal Decoupled. All rights reserved.',
}
