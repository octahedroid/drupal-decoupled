import { ComponentPropsWithoutRef } from 'react'

export interface ImageProps extends ComponentPropsWithoutRef<'img'> {}

export const Image = ({ ...props }: ImageProps) => {
  return <img {...props}></img>
}
