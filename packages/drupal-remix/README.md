# Drupal-Remix

A list of utilities to help you integrate your Drupal site with Remix.

## Prerequisites

Make sure your Drupal site is using the [Metatag](https://www.drupal.org/project/metatag), and [GraphQL Compose](https://www.drupal.org/project/graphql_compose) modules.

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

You can override specific values in the meta tags by providing a metaTagOverrides object to the metaTags function. This object consists of three keys: MetaTagLink, MetaTagProperty, and MetaTagValue. Each key corresponds to a specific kind of meta tag and you can set the overrides for each key as needed.

```typescript
return metaTags({
  tags: data.node.metatag,
  metaTagOverrides: {
    MetaTagLink: {
      ...
    },
    MetaTagProperty: {
      ...
    },
    MetaTagValue: {
      ...
    },
  },
});
```

There is two ways to override the values, one is fully overriding the value with the provided replacement, and the other is searching and replacing a specific pattern within the value.

#### Override

To fully override the value with a desired value, you can pass the desired value as string to the replacement key. For example, to override the `canonical` attribute of the `<link>` tag, use the MetaTagLink key.

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
        canonical: "https://your-site-url.com",
      },
    },
  });
};
```

It will produce the following output in the HTML:

```html
<head>
  <!-- Other meta tags -->
  <link rel="canonical" href="https://your-site-url.com" />
  <!-- Other meta tags -->
</head>
```

Ignoring the original value of the `canonical` attribute.

#### Search and Replace

To search and replace a specific pattern within the value, you can pass an array of objects that contains the `pattern` and `replacement` keys. It allows you to add multiple search and replace operations to the same value. For example, replace the domain name in the `canonical` attribute of the `<link>` tag.

It is useful when you want to replace the Drupal site URL with the Remix site URL.

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
        canonical: [
          {
            pattern: "drupal-site-url.com",
            replacement: "your-site-url.com",
          },
        ],
      },
    },
  });
};
```

It will produce the following output in the HTML:

```html
<head>
  <!-- Other meta tags -->
  <link rel="canonical" href="https://your-site-url.com" />
  <!-- Other meta tags -->
</head>
```

and will respect the original path. For example, if the original path was `https://drupal-site-url.com/path/to/page`, it will be replaced with `https://your-site-url.com/path/to/page`.

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
