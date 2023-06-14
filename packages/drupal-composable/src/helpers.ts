enum COMPOSABLE_COMPONENT_ACTION {
  'edit',
};

enum COMPOSABLE_COMPONENT_STORAGE {
  'paragraph',
};

export interface ComposableComponentProps {
  action: keyof typeof COMPOSABLE_COMPONENT_ACTION;
  storage: keyof typeof COMPOSABLE_COMPONENT_STORAGE;
  uuid: string;
}

export const openComposableComponent = ({action, storage, uuid}: ComposableComponentProps) => {
  window.parent.postMessage(
    {
      type: `DRUPAL_COMPOSABLE_COMPONENT`,
      action,
      storage,
      uuid,
    },
    "*"
  );
};
