'use server'
import { parseWithZod } from '@conform-to/zod'
import { contactFormSchema } from './schema'
import { submitContactFormFunction } from '@/integration/forms/ContactForm/function'

export async function submitContactFormAction(
  _previousState: unknown,
  formData: FormData
) {
  const submission = parseWithZod(formData, {
    schema: contactFormSchema,
  })

  if (submission.status !== 'success') {
    return {
      reply: submission.reply(),
      data: null,
    }
  }

  const result = await submitContactFormFunction(submission.value)

  if (!result.success) {
    return {
      reply: submission.reply({
        formErrors: [
          'There was an error submitting the form. Please try again later.',
        ],
      }),
      data: null,
    }
  }

  return {
    reply: submission.reply(),
    data: result.data,
  }
}
