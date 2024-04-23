# Drupal-Remix

A list of utilities to help you integrate your Drupal site with Remix.

## Prerequisites

Make sure your Drupal site is using the [Metatag](https://www.drupal.org/project/metatag), [GraphQL Compose](https://www.drupal.org/project/graphql_compose) and [Remix](https://www.drupal.org/project/remix) modules.

## Usage of Metatags helper

### Importing library

```typescript
import { metaTags } from "drupal-remix";
```

### Using the metaTags helper

```typescript
export const meta: MetaFunction = ({
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
export const meta: MetaFunction = ({
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

- "replace": Replaces a specific pattern within the value with the provided replacement.
- "override": Fully replaces the value with the provided replacement.

MetaTagProperty Overrides
To override a `<meta>` tag with the property attribute, use the MetaTagProperty key. For example:

```typescript
export const meta: MetaFunction = ({
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
export const meta: MetaFunction = ({
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
export const loader = async ({ params, context, request }: LoaderFunctionArgs) => {
  const path = calculatePath({path: params["*"], url: request.url});
  const client = await getClient({
    url: context.cloudflare.env.DRUPAL_GRAPHQL_URI,
    auth: {
      uri: context.cloudflare.env.DRUPAL_AUTH_URI,
      clientId: context.cloudflare.env.DRUPAL_CLIENT_ID,
      clientSecret: context.cloudflare.env.DRUPAL_CLIENT_SECRET,
    },
  });
  
  const nodeRouteQuery = graphql(`
    query route ($path: String!){
      route(path: $path) {
        __typename
        ... on RouteInternal {
          entity {
            __typename
            ... on NodePage {
             title
             metatag {
              __typename
              ... on MetaTagLink {
                attributes {
                  rel
                  href
                }
              }
              ... on MetaTagValue {
                attributes {
                  name
                  content
                }
              }
              ... on MetaTagProperty {
                attributes {
                  property
                  content
                }
              }
            }
          }
        }
      }
    }
  }`)

  const { data, error } = await client.query(
    nodeRouteQuery,
    {
      path,
    }
  );

  if (error) {
    throw error;
  }

  if (!data || !data?.route || data?.route.__typename !== "RouteInternal" || !data.route.entity) {
    return redirect("/404");
  }

  return json({
    type: data.route.entity.__typename,
    node: data.route.entity,
    environment: context.cloudflare.env.ENVIRONMENT,
  })
}
```

> NOTE: This example is using Cloudflare and taking advantage of Environemt Settings to define "environment" key/value, that is why we are using the `context.cloudflare.env.ENVIRONMENT` object to obtain the value and pass it from Server to Client.

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
