import { Config as PuckConfig, Field as PuckField } from '@measured/puck'

export type DataToUpdate = {
  [key: string]: [
    {
      originalFieldName: string
      replaceFieldName: string
    },
  ]
}

type FieldExtend = {
  config?: {
    fieldName?: string
    // @todo: add drupal field types
    // type: string 
  }
}

export type Field = PuckField & FieldExtend

export type Config = Omit<PuckConfig, 'fields'> & {
  fields?: Record<string, Field>
}

export type Component = Omit<
  Pick<Config, 'components'>['components'][string],
  'fields'
> & {
  fields?: Record<string, Field>
}
