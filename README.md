# Drupal Decoupled

Using Drupal as a headless CMS with a Decoupled front-end implementation is a great way to get an enterprise-quality CMS, paired with a great modern development experience using Remix, Next.js, Astro and/or others.

Unlock the full potential of Drupal as an API-first CMS. Our quick-start guides and ready-to-use examples help you get started in no time!

## Explore Drupal Decoupled

Visit the [docs](https://drupal-decoupled.octahedroid.com/) to see how to use this project.


### Quickstart
- [Drupal](https://drupal-decoupled.octahedroid.com/docs/getting-started/quick-start/drupal/)
- [Remix](https://drupal-decoupled.octahedroid.com/docs/getting-started/quick-start/remix)
- [Next.js](https://drupal-decoupled.octahedroid.com/docs/getting-started/quick-start/next)

### Step by step
- [Drupal](https://drupal-decoupled.octahedroid.com/docs/getting-started/step-by-step/drupal/install/)
- [Remix](https://drupal-decoupled.octahedroid.com/docs/01-getting-started/02-step-by-step/02-starters/01-remix/)
- [Next.js](https://drupal-decoupled.octahedroid.com/docs/01-getting-started/02-step-by-step/02-starters/02-next/)

## Development Setup

This project is a monorepo managed with **pnpm** and **Turborepo**.

### Prerequisites

- Node.js >= 20.15.1
- pnpm >= 9.0.0

### Installation

```bash
# Install pnpm globally if you don't have it
npm install -g pnpm

# Install all dependencies
pnpm install

# Build all packages
pnpm build
```

### Development Commands

```bash
# Run all dev servers in parallel
pnpm dev

# Build with Turborepo caching
pnpm build

# Sync Storybook components to starters
pnpm copy:components

# Lint all packages
pnpm lint

# Type-check all packages
pnpm typecheck
```

### Project Structure

- `packages/` - Publishable npm packages
  - `drupal-decoupled` - Core utilities for Drupal integration
  - `drupal-auth-client` - OAuth2 authentication client
  - `create-drupal-decoupled` - CLI scaffolding tool
- `starters/` - Framework starters (templates)
  - `next/` - Next.js 15 with App Router
  - `react-router/` - React Router v7 SSR
  - `remix/` - Remix (deprecated)
  - `storybook/` - Component library (source of truth)

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
