import { ComponentProps } from 'react'
import { Badge as ShadcnBadge } from '~/components/ui/badge'

export interface BadgeProps extends ComponentProps<typeof ShadcnBadge> {
  text: string
}

export const Badge = ({ text, ...props }: BadgeProps) => {
  return <ShadcnBadge {...props}>{text}</ShadcnBadge>
}
