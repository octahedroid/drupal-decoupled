import { Badge as ShadcnBadge } from "~/components/ui/badge";

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof ShadcnBadge> {
  text: string;
}

export const Badge = ({ text, ...props }: BadgeProps) => {
  return <ShadcnBadge {...props}>{text}</ShadcnBadge>;
};
