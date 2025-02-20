import type { Config as PuckConfig, Field as PuckField, Data } from '@measured/puck'
import { WithOperationProps, WithPresetProps } from './parser'
import { Patch } from './config'

export type DataToUpdate = {
  [key: string]: [
    {
      originalFieldName: string
      replaceFieldName: string
    },
  ]
}

type FieldDefaultsBase = {
  type: 'string' | 'string_long' | 'text_long' | 'media' | 'viewfield' | 'link' | 'webform' | 'paragraph' | 'custom_field'
}

type FieldMediaBase = {
  media: {
    type: 'image' | 'video' | 'audio' | 'document'
    fieldName: string
  }
}

type FieldMedia = FieldDefaultsBase & FieldMediaBase

type FieldDefaults = FieldDefaultsBase | FieldMedia

export type FieldOverrides = {
  fieldName?: string
  mediaFieldName?: string
}

export type FieldPreset = {
  element: string
  type: 'mediaImage' | 'link' | 'richText'
  property?: string
}

export type FieldConfig = FieldDefaults & {
  fieldName?: string
  preset?: FieldPreset
  uiPropName?: string
}

export type FieldConfigExtends = Partial<FieldMediaBase> & {
  fieldName?: string
  preset?: Partial<FieldPreset> & { skipOnNull?: boolean }
  uiPropName?: string
}

export type Field = PuckField & {
  config: FieldConfig
}

export type FieldExtend = {
  type: Field
  config?: FieldConfigExtends
  transformers?: Patch[]
}

export type Config = Omit<PuckConfig, 'fields'> & {
  fields?: Record<string, Field>
}

export type Component = Omit<
  Pick<Config, 'components'>['components'][string],
  'fields'
> & {
  fields?: Record<string, Field>
}

export type { Data }
