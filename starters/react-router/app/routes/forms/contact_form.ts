import { parseWithZod } from "@conform-to/zod/v4";
import type { ActionFunctionArgs } from "react-router";
import { submitContactFormFunction } from "~/integration/forms/ContactForm/function.server";
import { contactFormSchema } from "~/integration/forms/ContactForm/schema";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: contactFormSchema });

  if (submission.status !== "success") {
    return {
      reply: submission.reply(),
      data: null,
    };
  }

  const result = await submitContactFormFunction(submission.value);

  if (!result.success) {
    return {
      reply: submission.reply({
        formErrors: [
          "There was an error submitting the form. Please try again later.",
        ],
      }),
      data: null,
    };
  }

  return {
    reply: submission.reply(),
    data: result.data,
  };
}
