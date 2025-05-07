# drupal-vite

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

Make sure your environment variables are configured properly.

```env
DRUPAL_AUTH_URI=https://your-drupal-site.com
DRUPAL_CLIENT_ID=your-client-id
DRUPAL_CLIENT_SECRET=your-client-secret
```

Add the plugin to your Vite configuration:

```typescript
import { defineConfig } from 'vite';
import { drupal } from 'drupal-vite';

export default defineConfig({
  plugins: [
    drupal(),
    // other plugins...
  ],
});
```

## Configuration

### Environment Variables (Recommended)

The simplest way to configure the plugin is through environment variables:

```env
DRUPAL_AUTH_URI=https://your-drupal-site.com
DRUPAL_CLIENT_ID=your-client-id
DRUPAL_CLIENT_SECRET=your-client-secret
```

### Direct Configuration

For more control, you can pass options directly to the plugin:

```typescript
import { defineConfig } from 'vite';
import { drupal } from 'drupal-vite';

export default defineConfig({
  plugins: [
    drupal({
      // Drupal instance URL
      drupalUrl: 'https://your-drupal-site.com',
      
      // OAuth credentials
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret',
      
      // Advanced options
      graphqlEndpoint: '/api/graphql', // Default: /graphql
      outputDir: '.custom-drupal-output', // Default: .drupal
    }),
  ],
});
```

### Custom Environment Variable Keys

You can also customize the environment variable keys:

```typescript
drupal({
  drupalUrlKey: 'CUSTOM_DRUPAL_AUTH_URI_ENV_VAR',
  clientIDKey: 'CUSTOM_DRUPAL_CLIENT_ID_ENV_VAR',
  clientSecretKey: 'CUSTOM_DRUPAL_CLIENT_SECRET_ENV_VAR',
})
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

[yalc](https://github.com/wclr/yalc) allows you to test this package locally in another project:

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

---

This project uses [Bun](https://bun.sh) as its build tool and runtime.