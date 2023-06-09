# Drupal-Remix

A list of utilities to help you integrate your Drupal site with Remix.

## Prerequisites

Make sure your Drupal site is using the [Metatag](https://www.drupal.org/project/metatag) [GraphQL Compose](https://www.drupal.org/project/graphql_compose) and [Remix](https://www.drupal.org/project/remix) modules.

## Usage: SEO

### Importing library

```typescript
import { metaTags } from "drupal-remix";
```

### Using the metaTags helper

```typescript
export const meta: V2_MetaFunction = ({
  data,
}: {
  data: { node: { metatag } };
}) => {
  return metaTags({
    tags: data.node.metatag
  );
};
```

### Overriding values

```typescript
export const meta: V2_MetaFunction = ({
  data,
}: {
  data: { node: { metatag } };
}) => {
  return metaTags({
    tags: data.node.metatag,
    metaTagOverrides: {
      MetaTagLink: {
        canonical: {
          kind: "replace",
          pattern: "drupal-api-url.pantheonsite.io",
          replacement: "drupal-site.pages.dev",
        },
      },
      MetaTagProperty: {
        "og:url": {
          kind: "replace",
          pattern: "drupal-api-url.pantheonsite.io",
          replacement: "drupal-site.pages.dev",
        },
      },
      MetaTagValue: {
        "twitter:url": {
          kind: "replace",
          pattern: "drupal-api-url.pantheonsite.io",
          replacement: "drupal-site.pages.dev",
        },
      },
    },
  });
};
```

## Fetching data form Drupal using GraphQL

```typescript
export const loader = async ({ params, context }: LoaderArgs) => {
  const drupalClient = getClient(token, context);
  const { route } = await drupalClient.query({
    route: {
      __args: {
        path: path,
      },
      __typename: true,
      on_RouteInternal: {
        entity: {
          __typename: true,
          on_NodePage: {
            title: true,
            metatag: {
              __typename: true,
              on_MetaTagLink: {
                attributes: {
                  rel: true,
                  href: true,
                },
              },
              on_MetaTagValue: {
                attributes: {
                  name: true,
                  content: true,
                },
              },
              on_MetaTagProperty: {
                attributes: {
                  property: true,
                  content: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!route || route.__typename !== "RouteInternal") {
    return redirect("/404");
  }

  return json({ node: route.entity }, { status: 200 });
};
```

> Note: This example is using the GenQL CLI, make you install it and generate types and client from the GraphQL API your Drupal site is exposing.

## Usage: Inline Preview

### Importing library

```typescript
import { syncDrupalPreviewRoutes } from "drupal-remix";
```

### Server Side Code

```typescript
export const loader = async ({ context }: LoaderArgs) => {
  return json(
    {
      environment: context.ENVIRONMENT,
    },
    { status: 200 }
  );
};
```

> NOTE: This example is using Cloudflare and taking advantage of Environemt Settings to define "environment" key/value, that is why we are using the context object to obtain the value and pass it from Server to Client.

### Client Side Code

```typescript
  const { environment } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  if (environment === "preview" && navigation.state === "loading") {
    syncDrupalPreviewRoutes(navigation.location.pathname);
  }
```

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
