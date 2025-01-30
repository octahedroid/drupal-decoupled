import { Data, Puck as PuckEditor, Render as PuckRender } from '@measured/puck'
import '@measured/puck/puck.css'
import { config } from '~/components/editor/Config'
import { DataToUpdate, Field, Config } from '~/components/editor/types'

// @todo: Remove this once PuckEditor can handle this automatically.
//        This is a temporary solution to handle the renaming of fields in the data,
//        so that the data can be saved correctly based on the core transformProps function.
// data = transformProps(data, {
//   ParagraphFaq: ({ descriptionOptional, ...props }) => ({ description: descriptionOptional, ...props }),
// });

// @todo: validate fields based on field config and data
// - mediaImage
// - link
// - webform
// - other references 
function transformProps(data: Data, config: Config) {
  const dataToUpdate: DataToUpdate = {}
  Object.entries(config.components).forEach(([componentName, value]) => {
    const { fields } = value
    Object.entries(fields!).map(([key, value]) => {
      const { config } = value as Field
      if (config?.fieldName) {
        const { fieldName } = config
        dataToUpdate[componentName] = dataToUpdate[componentName] || []
        dataToUpdate[componentName].push({
          originalFieldName: key,
          replaceFieldName: fieldName,
        })
      }
    })
  })

  const content = data.content.map((component) => {
    const { type, props } = component
    if (type in dataToUpdate) {
      dataToUpdate[type as keyof typeof dataToUpdate].forEach(
        ({ originalFieldName, replaceFieldName }) => {
          props[replaceFieldName] = props[originalFieldName]
          delete props[originalFieldName]
        }
      )

      component['props'] = props
    }

    return component
  })

  return {
    ...data,
    content,
  }
}

// @todo: Use a GraphQL mutation to save the data if possible
const save = async (data: Data) => {
  const transformedData = transformProps(data, config)
  console.log('Saving data:', transformedData)
  const url = `http://drupal-decoupled.ddev.site/visual_editor/node/${data.root.props.id}/update`
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(transformedData),
  })
}

export function Render({ data }: { data: object }) {
  return <PuckRender config={config as Config} data={data} />
}

export function Editor({ data }: { data: object }) {
  return (
    <div>
      <PuckEditor config={config as Config} data={data} onPublish={save} />
    </div>
  )
}
