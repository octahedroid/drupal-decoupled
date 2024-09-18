'use client'

import { ComponentProps, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/components/ui/utils'
import {
  Button,
  ButtonProps,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  ImageProps,
} from '@/components/ui'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'

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

type NavItem = {
  label: string
  href?: string | null
  expanded?: boolean
  children?: NavItem[]
}

type Props = {
  logo: ImageProps
  navItems: NavItem[]
  actions: ButtonProps[]
}

export type HeaderProps = ComponentProps<'header'> &
  VariantProps<typeof headerVariants> &
  Props

const MobileNavItem = ({ item }: { item: NavItem }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="w-full">
      {item.children ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-between px-4 py-2 text-sm font-medium"
          >
            {item.label}
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {isOpen && (
            <ul className="border-border ml-4 border-l">
              {item.children.map((child, index) => (
                <MobileNavItem key={index} item={child} />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <a
          href={item.href ?? undefined}
          className="text-foreground hover:bg-accent hover:text-accent-foreground block w-full px-4 py-2 text-sm font-medium"
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
          <NavigationMenu>
            <NavigationMenuList>
              {navItems?.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger>
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.children.map((child, childIndex) => (
                            <li key={childIndex}>
                              <NavigationMenuLink
                                href={child.href ?? undefined}
                                className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {child.label}
                                </div>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={item.href ?? undefined}
                      className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {actions && actions.length > 0 && (
            <div className="flex items-center space-x-4">
              {actions.map(
                ({ text, href, internal, variant, ...actionProps }, index) =>
                  href && (
                    <Button
                      key={index}
                      variant={variant || 'default'}
                      asChild
                      {...actionProps}
                    >
                      <a
                        href={href}
                        target={internal ? '_self' : '_blank'}
                        rel="noreferrer"
                      >
                        {text}
                      </a>
                    </Button>
                  )
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
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
              {actions.map(
                ({ text, href, internal, variant, ...actionProps }, index) =>
                  href && (
                    <Button
                      key={index}
                      variant={variant || 'default'}
                      className="w-full"
                      asChild
                      {...actionProps}
                    >
                      <a
                        href={href}
                        target={internal ? '_self' : '_blank'}
                        rel="noreferrer"
                      >
                        {text}
                      </a>
                    </Button>
                  )
              )}
            </div>
          )}
        </div>
      )}
    </header>
  )
}

Header.displayName = 'Header'
