import type { ComposableComponentProps} from "drupal-composable"
import { openComposableComponent } from "drupal-composable"

interface ComposableComponentContainerProps extends ComposableComponentProps {
  children?: React.ReactNode;
}

export default function ComposableComponentContainer(
  { action, storage, uuid, children }: ComposableComponentContainerProps
) {
  return (
    // eslint-disable-next-line
    <section
      id={`${storage}-${uuid}`}
      data-composable-component={`${storage}-${uuid}`}
      onClick={() => openComposableComponent({
        action,
        storage,
        uuid,
      })}
    >
      {children}
    </section>
  )
}
