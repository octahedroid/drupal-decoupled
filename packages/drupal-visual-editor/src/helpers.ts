enum VISUAL_EDITOR_COMPONENT_ACTION {
  'edit',
};

enum VISUAL_EDITOR_COMPONENT_STORAGE {
  'paragraph',
};

export interface VisualEditorComponentProps {
  action: keyof typeof VISUAL_EDITOR_COMPONENT_ACTION;
  storage: keyof typeof VISUAL_EDITOR_COMPONENT_STORAGE;
  uuid: string;
}

export const openVisualEditorComponent = ({action, storage, uuid}: VisualEditorComponentProps) => {
  window.parent.postMessage(
    {
      type: `VISUAL_EDITOR_COMPONENT`,
      action,
      storage,
      uuid,
    },
    "*"
  );
};
