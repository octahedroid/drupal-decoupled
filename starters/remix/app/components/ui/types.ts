export type ActionsProps = {
  href: string | null
  internal?: boolean
  text?: string | null
}

export type LinkProps = ActionsProps & {
  rel?: string
  className?: string
  id?: string
  ariaLabel?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export type ButtonProps = ActionsProps & {
  variant?: ButtonVariant
  className?: string
  id?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type ButtonVariant =
  | 'link'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | null
  | undefined

export type ImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  className?: string
}

export type UserProps = {
  name: string
  avatar: ImageProps
}
