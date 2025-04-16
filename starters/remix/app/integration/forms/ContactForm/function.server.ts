import { graphql } from '~/graphql/gql.tada'
import { getClient } from '~/utils/client.server'
import { ContactFormSchema } from './schema'
import { composable } from 'composable-functions'
import { AppLoadContext } from '@remix-run/cloudflare'

const contactMutation = graphql(`
  mutation SubmitContactForm($input: [KeyValueInput]) {
    submitWebform(id: "contact_form", data: $input) {
      confirmation {
        confirmation_title
        confirmation_message
      }
    }
  }
`)

async function submitContactForm(
  input: ContactFormSchema,
  context: AppLoadContext
) {
  const client = await getClient({
    url: context.cloudflare.env.DRUPAL_GRAPHQL_URI,
    auth: {
      uri: context.cloudflare.env.DRUPAL_AUTH_URI,
      clientId: context.cloudflare.env.DRUPAL_CLIENT_ID,
      clientSecret: context.cloudflare.env.DRUPAL_CLIENT_SECRET,
    },
  })

  const inputArray = Object.entries(input).map(([key, value]) => ({
    key,
    value,
  }))
  const result = await client.mutation(contactMutation, { input: inputArray })
  return result.data
}

export const submitContactFormFunction = composable(submitContactForm)
