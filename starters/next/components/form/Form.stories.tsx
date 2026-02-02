/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod/v4'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod/v4'
import { Input, Textarea } from '@/components/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

// Define the DemoForm component
const DemoForm = () => {
  // This is the main component that will be used as the default story
  const [submitted, setSubmitted] = useState(false)
  const [formValues, setFormValues] = useState<ContactFormValues | null>(null)

  const [form, fields] = useForm({
    id: 'contact-form',
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactFormSchema })
    },
    shouldValidate: 'onBlur',
    onSubmit(event, { submission }) {
      if (submission?.status === 'success') {
        setFormValues(submission.value)
        setSubmitted(true)
      }
    },
  })

  const handleReset = () => {
    setSubmitted(false)
    setFormValues(null)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto max-w-xl">
        {submitted ? (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="text-green-500" />
              <AlertTitle>Form submitted successfully!</AlertTitle>
              <AlertDescription>
                Thank you for your message. We&apos;ll get back to you soon.
              </AlertDescription>
            </Alert>

            {formValues && (
              <div className="rounded-md border p-4">
                <h4 className="mb-2 font-medium">Submitted Values:</h4>
                <pre className="text-xs whitespace-pre-wrap">
                  {JSON.stringify(formValues, null, 2)}
                </pre>
              </div>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              Reset Form
            </Button>
          </div>
        ) : (
          <form
            id={form.id}
            onSubmit={form.onSubmit}
            className="space-y-4"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor={fields.name.id}>Name</Label>
              <Input
                meta={fields.name}
                type="text"
                placeholder="Enter your name"
              />
              {fields.name.errors && (
                <p className="text-sm text-red-500">{fields.name.errors}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.email.id}>Email</Label>
              <Input
                meta={fields.email}
                type="email"
                placeholder="Enter your email"
              />
              {fields.email.errors && (
                <p className="text-sm text-red-500">{fields.email.errors}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.message.id}>Message</Label>
              <Textarea
                meta={fields.message}
                placeholder="Enter your message"
                className="min-h-[120px]"
              />
              {fields.message.errors ? (
                <p className="text-sm text-red-500">{fields.message.errors}</p>
              ) : (
                <p className="text-xs text-gray-500">
                  {fields.message.value?.length || 0}/20-500 characters
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

const meta = {
  title: 'Form/Form - Demo',
} satisfies Meta<typeof DemoForm>

export default meta

type Story = StoryObj<typeof DemoForm>

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(500, 'Message cannot exceed 500 characters'),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

// Define DemoForm as the default story
export const Default: Story = {
  render: () => <DemoForm />,
}
