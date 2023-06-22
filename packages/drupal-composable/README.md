# Drupal-Composable

Provide delightful editorial experiences for content editors within Drupal regardless of your FE implementation.


## Prerequisites

Make sure your Drupal site is used as CMS API first.

## Usage

### Importing library

```typescript
import type { ComposableComponentProps} from "drupal-composable";
import { openComposableComponent } from "drupal-composable"
```

## Usage: React

### Creating your ComposableComponentContainer

```typescript

interface ComposableComponentContainerProps extends ComposableComponentProps {
  children?: React.ReactNode;
}

const ComposableComponentContainer = ({ action, storage, uuid, children }: ComposableComponentContainerProps) => (
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
```

### Using the new created React Component

```typescript
  <ComposableComponentContainer
    action='edit'
    storage='paragraph'
    uuid={component.id}
  >
    {reactComponent}
  </ComposableComponentContainer>
```

### Addign styles to component container
```css
[data-composable-component]:hover {
  border-color: purple; border-style: dashed;
  border-width: thin;
  overflow: hidden;
  cursor: pointer;
}
```

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
