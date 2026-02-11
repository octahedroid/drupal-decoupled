import { composable } from "composable-functions";
import { getDrupalClient } from "drupal-vite/client";
import { graphql } from "~/graphql/gql.tada";
import type { ContactFormSchema } from "./schema";

const contactMutation = graphql(`
  mutation SubmitContactForm($input: [KeyValueInput]) {
    submitWebform(id: "contact_form", data: $input) {
      confirmation {
        confirmation_title
        confirmation_message
      }
    }
  }
`);

async function submitContactForm(input: ContactFormSchema) {
  const client = await getDrupalClient();

  const inputArray = Object.entries(input).map(([key, value]) => ({
    key,
    value,
  }));
  const result = await client.mutation(contactMutation, { input: inputArray });

  if (!result.data?.submitWebform?.confirmation) {
    throw new Error("Error submitting contact form");
  }

  return result.data.submitWebform.confirmation;
}

export const submitContactFormFunction = composable(submitContactForm);
