import {
  Badge as ShadcnBadge,
  BadgeProps as ShadcnBadgeProps,
} from '@/components/ui/badge'

export interface BadgeProps extends ShadcnBadgeProps {
  text: string
}

export const Badge = ({ text, ...props }: BadgeProps) => {
  return <ShadcnBadge {...props}>{text}</ShadcnBadge>
}
