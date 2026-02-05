import { graphql } from "@/graphql/gql.tada";
import { getClient } from "@/utils/client";
import { composable } from "composable-functions";
import { ContactFormSchema } from "@/integration/forms/ContactForm/schema";

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
  const client = await getClient({
    url: process.env.DRUPAL_GRAPHQL_URI!,
    auth: {
      uri: process.env.DRUPAL_AUTH_URI!,
      clientId: process.env.DRUPAL_CLIENT_ID!,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
    },
  });

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
