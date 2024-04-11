# Drupal Visual Editor

Provide delightful editorial experiences for content editors within Drupal regardless of your FE implementation.

## Usage with Remix

### Adding your VisualEditorComponentContainer component

Create a file at `app/components/helpers/VisualEditorComponentContainer.tsx` and paste this content:

```typescript
import type { VisualEditorComponentProps } from "drupal-visual-editor"
import { openVisualEditorComponent } from "drupal-visual-editor"

interface VisualEditorComponentContainerProps extends VisualEditorComponentProps {
  children?: React.ReactNode;
}

export default function VisualEditorComponentContainer(
  { action, storage, uuid, children }: VisualEditorComponentContainerProps
) {
  return (
    // eslint-disable-next-line
    <section
      id={`${storage}-${uuid}`}
      data-visual-editor-component={`${storage}-${uuid}`}
      onClick={() => openVisualEditorComponent({
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

### Using the new created React VisualEditorComponentContainer Component

At your component resolver file import the VisualEditorComponentContainer

```typescript
import VisualEditorComponentContainer from "~/components/helpers/VisualEditorComponentContainer";
```

Wrap your component using the imported `VisualEditorComponentContainer` component

```typescript
  // Wrap standard ParagraphComponent using VisualEditorComponentContainer wrapper
  if (environment === 'preview') {

    <VisualEditorComponentContainer
      action='edit'
      storage='paragraph'
      uuid={paragraph.id}
    >
      {ParagraphComponent}
    </VisualEditorComponentContainer>

  }
```

### Addign styles to component container

Create a file at `app/preview.css` and paste this content:

```css
[data-visual-editor-component]:hover {
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
  - [Drupal](https://github.com/octahedroid/drupal-graphql-example)

- JSON:API (TBD)

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
