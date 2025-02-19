import type { Data } from 'drupal-decoupled/editor'
import { config, validateData } from 'drupal-decoupled/editor'

// @todo: Use a GraphQL mutation to save the data if possible
export const publishData = async (data: Data) => {
  const validatedData = validateData(config, data)
  if (validatedData.errorMessages.length > 0) {
    console.log({ validatedData })
    return
  }

  const url = `http://drupal-decoupled-broken.ddev.site/visual_editor/node/${data.root.props.id}/update`
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(validatedData),
  })
}
