'use client'

import type { VisualEditorComponentProps } from 'drupal-visual-editor'
import { openVisualEditorComponent } from 'drupal-visual-editor'

interface VisualEditorComponentContainerProps
  extends VisualEditorComponentProps {
  children?: React.ReactNode
}

function VisualEditorComponentContainer({
  action,
  storage,
  uuid,
  children,
}: VisualEditorComponentContainerProps) {
  return (
    <section
      id={`${storage}-${uuid}`}
      data-visual-editor-component={`${storage}-${uuid}`}
      onDoubleClick={() =>
        openVisualEditorComponent({
          action,
          storage,
          uuid,
        })
      }
    >
      {children}
    </section>
  )
}

type VisualEditorProps = {
  components: Array<JSX.Element>
}

export function VisualEditor({ components }: VisualEditorProps) {
  return (
    <>
      {components.map((component) => {
        const id = component.props.id
        return (
          <VisualEditorComponentContainer
            storage="paragraph"
            uuid={id}
            action="edit"
            key={id}
          >
            {component}
          </VisualEditorComponentContainer>
        )
      })}
    </>
  )
}
