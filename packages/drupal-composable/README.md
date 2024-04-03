# Drupal-Composable
The modern Drupal way to create content.

This project aims to create and manage content in a modular and reusable way. Instead of traditional monolithic content structures, where content is designed as a single, unchangeable entity, composable separates the content into smaller, reusable components that can be assembled and rearranged to create different types of content and layouts, making them more flexible and adaptable.

## Prerequisites

Make sure your Drupal site is used as CMS API first using GraphQL + GraphQL Composer or JSON:API (implementation TBD)

## Visual Editor 
Provide delightful editorial experiences for content editors within Drupal regardless of your FE implementation.

## Usage with Remix

### Adding your ComposableComponentContainer component

Create a file at `app/components/helpers/ComposableComponentContainer.tsx` and paste this content:

```typescript
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
```

### Using the new created React ComposableComponentContainer Component

At your component resolver file import the ComposableComponentContainer

```typescript
import ComposableComponentContainer from "~/components/helpers/ComposableComponentContainer";
```

Wrap your component using the imported `ComposableComponentContainer` component

```typescript
  // Wrap standard ParagraphComponent using ComposableComponentContainer wrapper
  if (environment === 'preview') {

    <ComposableComponentContainer
      action='edit'
      storage='paragraph'
      uuid={paragraph.id}
    >
      {ParagraphComponent}
    </ComposableComponentContainer>

  }
```

### Addign styles to component container

Create a file at `app/preview.css` and paste this content:

```css
[data-composable-component]:hover {
  border-color: purple; border-style: dashed;
  border-width: thin;
  overflow: hidden;
  cursor: pointer;
}
```

Import your recently created `app/preview.css` file at `app/root.tsx`

```typescript
import './preview.css'
```

For a fully functional example visit any of those repositories:
- GraphQL:
  - [Remix](https://github.com/octahedroid/drupal-remix/tree/main/examples/graphql)
  - [Drupal]()

- JSON:API (TBD)

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
