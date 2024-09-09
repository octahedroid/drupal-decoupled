export type LinkProps = {
  href: string | null
  internal?: boolean
  text?: string | null
  target?: string
  rel?: string
  className?: string
  id?: string
  ariaLabel?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export type ImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  className?: string
}

export type ButtonProps = {
  text: string | null
  href: string | null
  internal?: boolean
  variant?: string
  className?: string
  id?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type UserProps = {
  name: string
  avatar: ImageProps
}
