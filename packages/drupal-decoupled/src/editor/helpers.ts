import jmespath from 'jmespath'

import { Configurator } from "./config"
import { Data, FieldConfig } from "./types"

export const isReference = ({ type }: FieldConfig) => {
  const referenceTypes = ['media', 'paragraph', 'viewfield', 'webform']

  return referenceTypes.includes(type)
}

export const isComposable = ({ type }: FieldConfig) => {
  const composableTypes = ['paragraph', 'media', 'custom_field']

  return composableTypes.includes(type)
}

export const isReferenceRequired = ({ type }: FieldConfig) => {
  const referenceTypes = ['media', 'viewfield', 'webform']

  return referenceTypes.includes(type)
}

export function validateData(config: Configurator, data: Data) {
  type Error = {
    message: string
    componentType: string
    fieldName: string
    index: number
  }
  const errorMessages: Error[] = []
  let index = 0;
  const parseData = config.parseDataProps(data) as Data
  parseData.content.forEach((component) => {
    const { type, props } = component
    const references = config.getReferences(type);
    Object.entries(references).forEach(([, reference]) => {
      const { fieldName, field } = reference
      const result = jmespath.search(props, `${fieldName}`)

      if (!Array.isArray(result) && !result.id) {
        errorMessages.push({
          message: `Reference field ${fieldName} at ${type}, requires a reference id.`,
          componentType: type,
          fieldName,
          index,
        })
      }

      let elementIndex = 0
      if (Array.isArray(result)) {
        result.forEach((element: any) => {
          if (!element || !element.id) {
            errorMessages.push({
              message: `Reference field ${fieldName.replaceAll('*', elementIndex.toString())} at ${type}, requires a reference id.`,
              componentType: type,
              fieldName,
              index,
            })
          }
          elementIndex++
        })
      }
    })

    index++
  })

  return {
    ...data,
    errorMessages,
  }
}
