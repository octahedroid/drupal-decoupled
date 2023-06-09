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

### Overriding values (optional)

You can override specific values in the meta tags by providing a metaTagOverrides object to the metaTags function. This object consists of three keys: MetaTagLink, MetaTagProperty, and MetaTagValue. Each key corresponds to a specific kind of meta tag.

MetaTagLink Overrides
To override the `<link>` tag with the canonical attribute, use the MetaTagLink key. For example:

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
    },
  });
};
```

In this example, the canonical attribute of the `<link>` tag will be overridden. The kind property determines the type of override to perform. The available options are:

"replace": Replaces a specific pattern within the value with the provided replacement.
"override": Fully replaces the value with the provided replacement.
MetaTagProperty Overrides
To override a `<meta>` tag with the property attribute, use the MetaTagProperty key. For example:

```typescript
export const meta: V2_MetaFunction = ({
  data,
}: {
  data: { node: { metatag } };
}) => {
  return metaTags({
    tags: data.node.metatag,
    metaTagOverrides: {
      MetaTagProperty: {
        "og:url": {
          kind: "replace",
          pattern: "drupal-api-url.pantheonsite.io",
          replacement: "drupal-site.pages.dev",
        },
      },
    },
  });
};
```

In this example, the `<meta>` tag with the property attribute set to "og:url" will be overridden. The kind property determines the type of override to perform.

MetaTagValue Overrides
To override a `<meta>` tag with the name attribute, use the MetaTagValue key. For example:

```typescript
export const meta: V2_MetaFunction = ({
  data,
}: {
  data: { node: { metatag } };
}) => {
  return metaTags({
    tags: data.node.metatag,
    metaTagOverrides: {
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

In this example, the `<meta>` tag with the name attribute set to "twitter:url" will be overridden. The kind property determines the type of override to perform.

The available kind options for MetaTagProperty and MetaTagValue are the same as mentioned earlier: "replace" and "override".

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

> Note: This example is using the GenQL CLI, make sure you install it to generate types and client from the GraphQL API your Drupal site is exposing.

## Usage: Inline Preview

In order to implement you will need to edit your `app/root.tsx` file

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
export default function App() {
  const { environment } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  if (environment === "preview" && navigation.state === "loading") {
    syncDrupalPreviewRoutes(navigation.location.pathname);
  }

  return (
    <html lang="en">
      ...
    </html>
  );

}

```

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
