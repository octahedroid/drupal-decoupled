# Drupal-Decoupled

A list of utilities for a Decoupled integrations.

### Route Syncronization and comunication between FE and BE via the Iframe

Import the `syncDrupalPreviewRoutes` helper at `app/root.tsx`

```typescript
import { syncDrupalPreviewRoutes } from "drupal-decoupled";
```

Make sure your loader returns the current `environment` value

```typescript
export const loader = async ({ context }: LoaderFunctionArgs ) => {
  // Provide a variable to define the environment
  const environment = context.cloudflare.env.ENVIRONMENT
  return json(
    {
      environment,
    },
    { status: 200 }
  );
};
```

> NOTE: This example is using Cloudflare and taking advantage of Environemt Settings to define "environment" key/value, that is why we are using the `context.cloudflare.env.ENVIRONMENT` object to obtain the value and pass it from Server to Client.

Upate your `App` function

```typescript
export default function App() {
  // read environment from loader
  const { environment } = useLoaderData<typeof loader>();
  // use the useNavigation hook from @remix-run/react
  const navigation = useNavigation();

  // check if environment is preview and navigation.state is loading
  // to call syncDrupalPreviewRoutes
  if (environment === "preview" && navigation.state === "loading") {
    syncDrupalPreviewRoutes(navigation.location.pathname);
  }

  return (
    <>
      <Outlet />
    </>
  );
}
```

For a fully functional example visit any of those repositories:
- GraphQL:
  - [Remix](https://github.com/octahedroid/drupal-remix/tree/main/examples/graphql)
  - [Drupal]()

- JSON:API (TBD)

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
