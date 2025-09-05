import type { ComponentPropsWithoutRef } from 'react'

export interface LinkProps
  extends Omit<ComponentPropsWithoutRef<'a'>, 'target' | 'rel'> {
  href: string
  internal?: boolean
}

export const Link = ({ href, internal, ...props }: LinkProps) => {
  const externalProps = internal
    ? {
        target: '_self' as const,
        rel: '' as const,
      }
    : {
        target: '_blank' as const,
        rel: 'noopener noreferrer' as const,
      }

  return (
    <a href={href} {...externalProps} {...props}>
      {props.children}
    </a>
  )
}
