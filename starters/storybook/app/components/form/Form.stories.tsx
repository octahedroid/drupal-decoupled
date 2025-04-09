import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { z } from 'zod'
import { Input } from '~/components/form'
import { Textarea } from '~/components/form'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '~/components/ui/card'

const meta: Meta = {
  title: 'Form/Form - Contact Form',
  parameters: {
    layout: 'centered',
  },

}

export default meta

type Story = StoryObj

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

export const Default: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState(false)
    const [formValues, setFormValues] = useState<ContactFormValues | null>(null)

    const [form, fields] = useForm({
      id: 'contact-form',
      onValidate({ formData }) {
        return parseWithZod(formData, { schema: contactFormSchema })
      },
      shouldValidate: 'onBlur',
      onSubmit(event, { submission }) {
        if (submission.status === 'success') {
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
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Fill out the form below to send us a message
          </CardDescription>
        </CardHeader>

        <CardContent>
          {submitted ? (
            <div className="space-y-4">
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Form submitted successfully!
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Thank you for your message. We'll get back to you soon.</p>
                    </div>
                  </div>
                </div>
              </div>

              {formValues && (
                <div className="rounded-md border p-4">
                  <h4 className="mb-2 font-medium">Submitted Values:</h4>
                  <pre className="whitespace-pre-wrap text-xs">
                    {JSON.stringify(formValues, null, 2)}
                  </pre>
                </div>
              )}

              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
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

            <CardFooter className="flex justify-end px-0 pt-4">
              <Button type="submit">
                Submit
              </Button>
            </CardFooter>
          </form>
        )}
        </CardContent>
      </Card>
    )
  },
}
