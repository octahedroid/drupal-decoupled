import { FieldMetadata, getTextareaProps } from '@conform-to/react'
import { ComponentProps } from 'react'
import { Textarea as TextareaShadcn } from '~/components/ui/textarea'

export const Textarea = ({
  meta,
  ...props
}: {
  meta: FieldMetadata<string>
} & ComponentProps<typeof TextareaShadcn>) => {
  return <TextareaShadcn {...getTextareaProps(meta)} {...props} />
}
