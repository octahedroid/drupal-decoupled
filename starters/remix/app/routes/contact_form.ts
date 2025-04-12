import { ActionFunctionArgs } from "@remix-run/node";
import { parseWithZod } from "@conform-to/zod";
import { contactFormSchema } from "~/integration/forms/ContactForm/schema";
import { submitContactFormFunction } from "~/integration/forms/ContactForm/function.server";

export async function action({request, context}: ActionFunctionArgs ) {
  const formData = await request.formData()

  const submission = parseWithZod(formData, { schema: contactFormSchema })

  if (submission.status !== 'success') {
    return submission.reply()
  }


  const result = await submitContactFormFunction(submission.value, context)

  if (!result.success) {
    throw new Error("Failed to submit contact form")

    // return submission.reply({
    //   formErrors: ["Failed to submit contact form"],
    // })
  }

  console.log("Data being added to payload:", result.data); // <-- Add this log

  return submission.reply()

}
  