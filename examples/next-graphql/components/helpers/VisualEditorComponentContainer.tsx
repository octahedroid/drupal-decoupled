'use client';
import type { VisualEditorComponentProps } from "drupal-visual-editor";
import { openVisualEditorComponent } from "drupal-visual-editor";

interface VisualEditorComponentContainerProps
  extends VisualEditorComponentProps {
  children?: React.ReactNode;
}

export default function VisualEditorComponentContainer({
  action,
  storage,
  uuid,
  children,
}: VisualEditorComponentContainerProps) {
  return (
    <section
      id={`${storage}-${uuid}`}
      data-visual-editor-component={`${storage}-${uuid}`}
      onClick={() =>
        openVisualEditorComponent({
          action,
          storage,
          uuid,
        })
      }
    >
      {children}
    </section>
  );
}
