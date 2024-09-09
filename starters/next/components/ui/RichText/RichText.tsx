import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/components/ui/utils'

const richTextVariants = cva('prose max-w-none', {
  variants: {},
  defaultVariants: {},
})

type RichTextProps = ComponentProps<'div'> &
  VariantProps<typeof richTextVariants> & {
    content: string
  }

export const RichText = ({ className, content, ...props }: RichTextProps) => {
  return (
    <div
      className={cn(richTextVariants(), className)}
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    />
  )
}

RichText.displayName = 'RichText'
