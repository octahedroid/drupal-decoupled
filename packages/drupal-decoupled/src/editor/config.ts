import { isComposable, isReference, isReferenceRequired } from "./helpers";
import { Parser, Preset, WithPresetProps, WithOperationProps } from "./parser";
import type { Data, Field, FieldConfig, FieldConfigExtends, FieldExtend, FieldPreset } from "./types";

type CalculatePresetProps = {
  preset: FieldPreset
  config: FieldConfig & FieldConfigExtends
  uiPropName: string
}

const calculatePreset = ({ preset, config, uiPropName }: CalculatePresetProps): Preset => {
  const { type, property = '' } = preset
  let prop = property.replaceAll('{uiPropName}', uiPropName)
  let mediaFieldName = 'mediaImage'

  if (type === 'mediaImage') {
    if (config.media?.fieldName) {
      mediaFieldName = config.media?.fieldName;
    }
    prop = property.replaceAll('{mediaFieldName}', mediaFieldName)
  }

  if (!prop) {
    return { preset: type, skipOnNull: config.preset?.skipOnNull || false }
  }

  return {
    preset: type,
    property: prop,
    skipOnNull: config.preset?.skipOnNull || false,
  }
}

const getFields = (field: Field) => {
  if (field.type === 'array') {
    return field.arrayFields
  }

  if (field.type === 'object') {
    return field.objectFields
  }

  return {}
}

export type Patch = WithPresetProps | WithOperationProps;

type Config = {
  component: string
  fields: Record<string, FieldExtend>
  defaultProps: Record<string, unknown>
}

type Reference = {
  fieldName: string
  field: Field
}

export class Configurator {
  private static _instance: Configurator
  private config: Record<string, {
    component: string
    fields: Record<string, Field>
    defaultProps: Record<string, unknown>
    parser: Parser
    parserData: Parser
    references: Record<string, Reference>
    patches: Patch[]
  }>
  private components: string[]

  static getInstance(): Configurator {
    if (!this._instance) {
      this._instance = new Configurator();
    }

    return this._instance;
  }

  constructor() {
    this.components = []
    this.config = {}
  }

  set(props: Config) {
    const { component, fields, defaultProps } = props

    // Skip if the component configuration already exists.
    if (this.components.includes(component)) {
      return
    }

    const calculatedFields: Record<string, Field> = {}
    const patches: Patch[] = []
    const parser = new Parser();
    const parserData = new Parser();
    const references: Record<string, Reference> = {}

    Object.entries(fields).forEach(([key, { type, config, transformers }]) => {

      const fieldPreset = {
        ...type.config.preset || {},
        ...config?.preset || {},
      }

      const fieldConfig = {
        ...type.config,
        ...config,
      }

      if (fieldPreset && Object.keys(fieldPreset).length > 0) {
        fieldConfig.preset = fieldPreset as FieldPreset;
      }

      const field = {
        ...type,
        config: fieldConfig,
      } as Field

      const { fieldName = key, preset, uiPropName = key } = field.config

      field.label = uiPropName
      field.config.fieldName = fieldName
      field.config.uiPropName = uiPropName

      if (key !== fieldName) {
        parserData.with({
          element: '/', // @todo: calculate the element based on the field type.
          operations: [
            {
              operation: 'rename',
              source: key,
              destination: fieldName,
            },
          ],
        })
      }

      if (key !== uiPropName) {
        patches.push({
          element: '/',
          operations: [
            {
              operation: 'rename',
              source: key,
              destination: uiPropName,
            },
          ],
        })

        parser.with({
          element: '/', // @todo: calculate the element based on the field type.
          operations: [
            {
              operation: 'rename',
              source: key,
              destination: uiPropName,
            },
          ],
        })
      }

      if (preset) {
        const { element } = preset
        const patch = {
          element: element.replaceAll('{fieldName}', fieldName).replaceAll('{uiPropName}', uiPropName),
          preset: calculatePreset({
            preset,
            config: field.config,
            uiPropName,
          }),
        };
        parser.with(patch)
        patches.push(patch)
      }

      if (isReference(field.config) && isReferenceRequired(field.config)) {
        references[`${fieldName}`] = {
          fieldName: `${fieldName}`,
          field,
        }
      }

      if (isComposable(field.config)) {
        const fields = getFields(field)
        Object.entries(fields).forEach(([arrayKey, arrayField]) => {
          const { config } = arrayField as Field
          if (!config) {
            return
          }

          const { preset } = config
          if (!preset) {
            return
          }

          const { element } = preset
          const elementChildren = element.replaceAll('{fieldName}', arrayKey).replaceAll('{uiPropName}', arrayKey)
          const elementPath = `/${uiPropName}[*].${elementChildren.startsWith('/') ? elementChildren.slice(1) : elementChildren}`
          const patch = {
            element: elementPath,
            preset: calculatePreset({
              preset,
              config,
              uiPropName: arrayKey,
            }),
          }
          parser.with(patch)
          patches.push(patch)

          if (isReference(config) && isReferenceRequired(config)) {
            const isArray = field.type === 'array';
            const referenceTarget = isArray ? `${fieldName}[*].${arrayKey}` : `${fieldName}.${arrayKey}`;
            references[referenceTarget] = {
              fieldName: referenceTarget,
              field: arrayField as Field,
            }
          }
        })
      }

      calculatedFields[key] = field

      if (transformers) {
        transformers.forEach((transform) => {
          if ('operations' in transform) {
            const { element, operations } = transform
            parser.with({
              element: element.replaceAll('{fieldName}', fieldName).replaceAll('{uiPropName}', uiPropName),
              operations,
            })

            patches.push({
              element: element.replaceAll('{fieldName}', fieldName).replaceAll('{uiPropName}', uiPropName),
              operations,
            })
          }

          if ('preset' in transform) {
            const { element, preset } = transform
            const patch = {
              element: element.replaceAll('{fieldName}', fieldName).replaceAll('{uiPropName}', uiPropName),
              preset,
            }
            parser.with(patch)
            patches.push(patch)
          }
        })
      }

    })

    this.config[component] = {
      component,
      fields: calculatedFields,
      defaultProps,
      parser,
      parserData,
      references,
      patches,
    }

    this.components.push(component)
  }

  getComponents(): string[] {
    return this.components
  }

  getFields(component: string): Record<string, Field> {
    if (!this.config[component] || !this.config[component].fields) {
      return {}
    }

    return this.config[component].fields;
  }

  getReferences(component: string): Record<string, Reference> {
    return this.config[component]?.references;
  }

  parseDefaultProps(component: string): unknown {
    const { parser, defaultProps } = this.config[component] || {}

    if (!parser) {
      throw new Error(`Parser not found for component: ${component}`)
    }

    return parser.apply({
      data: defaultProps,
      mode: 'inverse',
    })
  }

  parseUIProps(component: string, props: Record<string, unknown>): unknown {
    const { parser } = this.config[component] || {}

    if (!parser) {
      throw new Error(`Parser not found for component: ${component}`)
    }

    return parser.apply({
      data: props,
      mode: 'default',
    })
  }

  parseDataProps(props: Data): Record<string, unknown> {
    const content = []
    for (const [index, value] of props.content.entries()) {
      const { props, type } = value

      const { parserData = null } = this.config[type] || {}
      if (!parserData || parserData.getOperations().length === 0) {
        content[index] = value
        continue
      }

      content[index] = {
        type,
        props: parserData.apply({
          data: props,
          mode: 'default',
        })
      }
    }

    return {
      ...props,
      content,
    }
  }
}

const getConfigurator = () => {
  return Configurator.getInstance()
}

export const config = getConfigurator();
