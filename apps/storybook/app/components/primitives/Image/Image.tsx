import type { ComponentPropsWithoutRef } from "react";

export interface ImageProps extends ComponentPropsWithoutRef<"img"> {}

export const Image = ({ alt, ...props }: ImageProps) => {
  return <img alt={alt} {...props} />;
};
