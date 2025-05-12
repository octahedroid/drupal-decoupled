# drupal-vite

> A Vite plugin that streamlines Drupal integration with your frontend projects.

## Features

- Simplified Drupal API connection setup
- OAuth authentication handling
- Preconfigured GraphQL client
- Flexible environment configuration options
- Custom GraphQL client extensions

## Installation

```bash
# Using npm
npm install drupal-vite

# Using yarn
yarn add drupal-vite

# Using pnpm
pnpm add drupal-vite

# Using bun
bun add drupal-vite
```

## Quick Start

Add the plugin to your Vite configuration:

```typescript
import { defineConfig } from "vite";
import { drupal } from "drupal-vite";

export default defineConfig({
  plugins: [
    drupal(),
    // other plugins...
  ],
});
```

## Configuration

The plugin offers several configuration approaches to suit your workflow:

### Using Environment Variables

Set these environment variables in your project:

```env
DRUPAL_URL=https://your-drupal-site.com
DRUPAL_CLIENT_ID=your-client-id
DRUPAL_CLIENT_SECRET=your-client-secret
```

### Using Custom Environment Variables

Reference your own environment variables:

```typescript
drupal({
  drupalUrl: "MY_DRUPAL_URL", // Will use process.env.MY_DRUPAL_URL
  simple_oauth: {
    clientID: "MY_CLIENT_ID", // Will use process.env.MY_CLIENT_ID
    clientSecret: "MY_CLIENT_SECRET", // Will use process.env.MY_CLIENT_SECRET
  },
});
```

### Direct Configuration

Configure options directly in your Vite config file:

```typescript
import { defineConfig } from "vite";
import { drupal } from "drupal-vite";

export default defineConfig({
  plugins: [
    drupal({
      // Drupal instance URL
      drupalUrl: "https://your-drupal-site.com",

      // OAuth credentials
      simple_oauth: {
        clientID: "your-client-id",
        clientSecret: "your-client-secret",
      },

      // GraphQL settings
      graphql: {
        endpoint: "/graphql", // Default: /graphql
      },
    }),
  ],
});
```

## Using the Client

After configuration, access the Drupal client in your code:

```typescript
import { getDrupalClient } from 'drupal-vite/client';

// Get a preconfigured GraphQL client
const client = await getDrupalClient();

const query = graphql(`
query route($path: String!) {
  route(path: $path, revision: "CURRENT") {
    __typename
  }
}`

// Execute GraphQL operations
const result = await client.query(query, { path: "/example" });
```

## Advanced Configuration

Create a `drupal-decoupled.config.ts` file in your project root to customize the [GraphQL urql client](https://nearform.com/open-source/urql):

```typescript
// drupal-decoupled.config.ts
import { fetchExchange, cacheExchange } from "@urql/core";

export default {
  exchanges: [cacheExchange, fetchExchange],
};
```

## Development

### Setup

```bash
# Install dependencies
bun install

# Build the package
bun run build:all
```

### Local Testing with yalc

Use [yalc](https://github.com/wclr/yalc) to test locally in another project:

1. Install yalc globally:

   ```bash
   npm install -g yalc
   # or
   bun install -g yalc
   ```

2. Build and publish to your local yalc store:

   ```bash
   bun run yalc:publish
   ```

3. Add the package to your test project:

   ```bash
   yalc add drupal-vite
   ```

4. Push updates after making changes:
   ```bash
   bun run yalc:publish --push
   ```
