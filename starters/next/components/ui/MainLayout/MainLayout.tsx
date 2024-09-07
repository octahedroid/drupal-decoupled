type Props = {
  children: React.ReactNode
}

export type MainLayoutProps = Props

export const MainLayout = ({ children }: MainLayoutProps) => {
  return <>{children}</>
}

MainLayout.displayName = 'MainLayout'
