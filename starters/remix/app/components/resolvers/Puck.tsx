import type { Config } from '@measured/puck'
import { Puck as PuckEditor, Render as PuckRender } from '@measured/puck'
import '@measured/puck/puck.css'
import { config } from '~/components/resolvers/Config'
import { Component, Field } from '~/components/resolvers/types'

type DataToUpdate = {
  [key: string]: [
    {
      originalFieldName: string
      replaceFieldName: string
    },
  ]
}

// @todo: Remove this once PuckEditor is updated to handle this automatically or when when could
//        pass the dataToUpdate to the transformProps function.
// data = transformProps(data, {
//   ParagraphFaq: ({ descriptionOptional, ...props }) => ({ description: descriptionOptional, ...props }),
// });
function transformProps(data: any, config: Config) {
  const dataToUpdate: DataToUpdate = {}
  Object.entries(config.components).forEach(([componentName, value]) => {
    const { fields } = value as Component
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

  const content = data.content.map((component: any, key: number) => {
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
const save = async (data: any) => {
  const transformedData = transformProps(data, config)
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
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-800">
      <PuckEditor config={config as Config} data={data} onPublish={save} />
    </div>
  )
}
