import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenu as ShadcnNavigationMenu,
} from '~/components/ui/navigation-menu'

export interface NavigationMenuItemProps {
  label: string
  href?: string
  expanded?: boolean
  children?: NavigationMenuItemProps[]
}

export const NavigationMenu = ({
  navItems,
}: {
  navItems: NavigationMenuItemProps[]
}) => {
  return (
    <ShadcnNavigationMenu>
      <NavigationMenuList>
        {navItems?.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.children ? (
              <>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <NavigationMenuLink
                          href={child.href || '#'}
                          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none"
                        >
                          <div className="text-sm leading-none font-medium">
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
                href={item.href || '#'}
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </ShadcnNavigationMenu>
  )
}
