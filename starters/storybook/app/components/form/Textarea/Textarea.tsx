import { FieldMetadata, getTextareaProps } from '@conform-to/react'
import { Textarea as TextareaShadcn } from '~/components/ui/textarea'
import { ComponentProps } from 'react'

export const Textarea = ({
  meta,
  ...props
}: {
  meta: FieldMetadata<string>
} & ComponentProps<typeof Textarea>) => {
  return <TextareaShadcn {...getTextareaProps(meta)} {...props} />
}
