export type LinkProps = {
  href: string
  text?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
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
