'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react'
import { type ComponentPropsWithoutRef, useState } from 'react'
import {
  Button,
  type ButtonProps,
  type ImageProps,
  NavigationMenu,
  type NavigationMenuItemProps,
} from '@/components/primitives'
import { Button as MobileMenuButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const headerVariants = cva('w-full border-b border-border bg-white', {
  variants: {
    sticky: {
      true: 'sticky top-0 z-50',
      false: '',
    },
  },
  defaultVariants: {
    sticky: false,
  },
})

export interface HeaderProps
  extends ComponentPropsWithoutRef<'header'>,
    VariantProps<typeof headerVariants> {
  logo: ImageProps
  navItems: NavigationMenuItemProps[]
  actions: ButtonProps[]
}

const MobileNavItem = ({ item }: { item: NavigationMenuItemProps }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="w-full">
      {item.children ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {item.label}
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {isOpen && (
            <ul className="ml-4 border-l border-border">
              {item.children.map((child, index) => (
                <MobileNavItem key={index} item={child} />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <a
          href={item.href ?? undefined}
          className="block w-full px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          {item.label}
        </a>
      )}
    </li>
  )
}

export const Header = ({
  className,
  sticky,
  logo,
  navItems,
  actions,
  ...props
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className={cn(headerVariants({ sticky }), className)} {...props}>
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <a href="/">
            <img src={logo.src} alt={logo.alt} className="h-8 w-auto" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-4 md:flex">
          <NavigationMenu navItems={navItems} />
          {actions && actions.length > 0 && (
            <div className="flex items-center space-x-4">
              {actions.map(({ ...actionProps }, index) => (
                <Button key={index} {...actionProps} />
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <MobileMenuButton
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </MobileMenuButton>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <nav className="flex w-full flex-col">
            <ul className="flex w-full flex-col">
              {navItems?.map((item, index) => (
                <MobileNavItem key={index} item={item} />
              ))}
            </ul>
          </nav>
          {actions && actions.length > 0 && (
            <div className="flex flex-col space-y-2 p-4">
              {actions.map(({ ...actionProps }, index) => (
                <Button key={index} className="w-full" {...actionProps} />
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  )
}

Header.defaultProps = {
  logo: {
    src: '/placeholders/icons/drupal-decoupled.png',
    alt: 'Company Logo',
  },
  navItems: [
    { label: 'Link One', href: '#' },
    { label: 'Link Two', href: '#' },
    { label: 'Link Three', href: '#' },
    { label: 'Link Four', href: '#' },
  ],
  actions: [
    {
      text: 'Docs',
      href: 'https://drupal-decoupled.octahedroid.com/docs',
    },
    {
      text: 'Get started',
      href: 'https://drupal-decoupled.octahedroid.com/',
    },
  ],
} satisfies HeaderProps
