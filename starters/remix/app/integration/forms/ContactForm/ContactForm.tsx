import { getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { CheckCircle2 } from 'lucide-react'
import { Input, Textarea } from '~/components/form'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import { contactFormSchema } from '~/integration/forms/ContactForm/schema'
import { useFetcher } from '@remix-run/react'
import { action } from '~/routes/contact_form'



// Define the ContactForm component
export const ContactForm = () => {
  const fetcher = useFetcher<typeof action>()

  console.log('fetcher', fetcher.formData)


  const [form, fields] = useForm({
    id: 'contact-form',
    lastResult: fetcher.data,
    constraint: getZodConstraint(contactFormSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactFormSchema })
    },
    shouldValidate: 'onBlur',
  })

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Fill out the form below to send us a message
        </CardDescription>
      </CardHeader>

      <CardContent>
        {fetcher.data?.status === 'success' ? (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="text-green-500" />
              <AlertTitle>Form submitted successfully!</AlertTitle>
              <AlertDescription>
                {JSON.stringify(fetcher.data?.fields)}
                {JSON.stringify(fetcher.data?.payload!)}
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <fetcher.Form
            {...getFormProps(form)}
            method="post"
            action="/contact_form"
            className="space-y-4"
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
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </CardFooter>
          </fetcher.Form>
        )}
      </CardContent>
    </Card>
  )
}
