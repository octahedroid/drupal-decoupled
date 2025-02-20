import '@measured/puck/puck.css'
import { Puck as PuckEditor, Render as PuckRender } from '@measured/puck'

import { Config } from 'drupal-decoupled/editor'

import { puckConfig } from '~/integration/editor/Config'
import { publishData } from '~/integration/editor/helpers'

export function Render({ data }: { data: object }) {
  return <PuckRender config={puckConfig as Config} data={data} />
}

export function Editor({ data }: { data: object }) {
  return (
    <div>
      <PuckEditor
        config={puckConfig as Config}
        data={data}
        onPublish={publishData}
      />
    </div>
  )
}
