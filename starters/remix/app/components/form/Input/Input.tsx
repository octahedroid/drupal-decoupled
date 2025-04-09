import { type FieldMetadata, getInputProps } from '@conform-to/react'
import type { ComponentProps } from 'react'
import { Input as InputShadcn } from '~/components/ui/input'

export const Input = ({
  meta,
  type,
  id,
  key,
  ...props
}: {
  meta: FieldMetadata<string>
  type: Parameters<typeof getInputProps>[1]['type']
} & ComponentProps<typeof Input>) => {
  return (
    <InputShadcn
      {...getInputProps(meta, { type, ariaAttributes: true })}
      {...props}
      id={id}
      key={key}
    />
  )
}
