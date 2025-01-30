import '@measured/puck/puck.css'
import { Puck as PuckEditor, Render as PuckRender } from '@measured/puck'
import { config } from '~/integration/editor/Config'
import { Config } from '~/integration/editor/types'
import { postEditorData } from '~/integration/editor/helpers'

export function Render({ data }: { data: object }) {
  return <PuckRender config={config as Config} data={data} />
}

export function Editor({ data }: { data: object }) {
  return (
    <div>
      <PuckEditor
        config={config as Config}
        data={data}
        onPublish={postEditorData}
      />
    </div>
  )
}
