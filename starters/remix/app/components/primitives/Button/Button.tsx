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
  const content = (
    <>
      {text}
      {props.icon && <props.icon className="ml-2 h-4 w-4" />}
    </>
  )
  if (href) {
    return (
      <Link internal={internal} href={href}>
        <ShadcnButton {...props}>{content}</ShadcnButton>
      </Link>
    )
  }

  return <ShadcnButton {...props}>{content}</ShadcnButton>
}
