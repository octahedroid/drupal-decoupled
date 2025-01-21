import { LucideIcon } from 'lucide-react'
import { Link } from '~/components/primitives'
import {
  Button as ShadcnButton,
  ButtonProps as ShadcnButtonProps,
} from '~/components/ui/button'

export interface ButtonProps extends Omit<ShadcnButtonProps, 'asChild'> {
  href: string
  internal?: boolean
  text: string
  icon?: LucideIcon
}

export const Button = ({ href, text, internal, ...props }: ButtonProps) => {
  const externalProps = internal
    ? {
        target: '_self' as const,
        rel: '' as const,
      }
    : {
        target: '_blank' as const,
        rel: 'noopener noreferrer' as const,
      }

  const content = (
    <>
      {text}
      {props.icon && <props.icon className="ml-2 h-4 w-4" />}
    </>
  )
  if (href) {
    return (
      <Link {...externalProps} href={href}>
        <ShadcnButton {...props}>{content}</ShadcnButton>
      </Link>
    )
  }

  return <ShadcnButton {...props}>{content}</ShadcnButton>
}
