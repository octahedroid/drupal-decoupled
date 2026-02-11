import type { ReactNode } from "react";
import { Link } from "~/components/primitives";
import { Button as ShadcnButton } from "~/components/ui/button";

type ShadcnButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnButton>;

export interface ButtonProps extends Omit<ShadcnButtonProps, "asChild"> {
  href: string;
  internal?: boolean;
  text: string;
  children?: ReactNode;
}

export const Button = ({
  href,
  text,
  internal,
  children,
  ...props
}: ButtonProps) => {
  const content = children ? (
    text ? (
      <>
        {text} {children}
      </>
    ) : (
      children
    )
  ) : (
    text && <>{text}</>
  );
  if (href) {
    return (
      <Link internal={internal} href={href}>
        <ShadcnButton {...props}>{content}</ShadcnButton>
      </Link>
    );
  }

  return <ShadcnButton {...props}>{content}</ShadcnButton>;
};
