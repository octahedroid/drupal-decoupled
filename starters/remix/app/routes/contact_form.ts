import { ActionFunctionArgs } from '@remix-run/node'
import { parseWithZod } from '@conform-to/zod'
import { contactFormSchema } from '~/integration/forms/ContactForm/schema'
import { submitContactFormFunction } from '~/integration/forms/ContactForm/function.server'

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData()

  const submission = parseWithZod(formData, { schema: contactFormSchema })

  if (submission.status !== 'success') {
    return {
      reply: submission.reply(),
      data: undefined,
    }
  }

  const result = await submitContactFormFunction(submission.value, context)

  if (!result.success) {
    return {
      reply: submission.reply({
        formErrors: [
          'There was an error submitting the form. Please try again later.',
        ],
      }),
      data: undefined,
    }
  }

  console.log('Data being added to payload:', result.data) // <-- Add this log

  return {
    reply: submission.reply(),
    data: result.data,
  }
}
