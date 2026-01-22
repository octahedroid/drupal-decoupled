# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Drupal Decoupled is a monorepo that provides tools and starters for building decoupled Drupal frontends using modern JavaScript frameworks (Next.js, Remix, React Router). The project enables using Drupal as a headless CMS with GraphQL APIs.

Documentation: https://drupal-decoupled.octahedroid.com/

## Repository Structure

### Key Directories

```
packages/
├── drupal-decoupled/          # Core utilities for Drupal integration
├── drupal-auth-client/        # Authentication client for Drupal OAuth
└── create-drupal-decoupled/   # CLI scaffolding tool

starters/
├── next/                      # Next.js starter with GraphQL
├── remix/                     # Remix starter with GraphQL (Cloudflare Pages)
├── react-router/              # React Router starter with GraphQL
└── storybook/                 # Shared component library (source of truth)
```

### Component Syncing System

The `starters/storybook/` directory is the **source of truth** for all UI components. Components are synced to other starters via `scripts/copy-components.ts`:

- Storybook components → Remix/React Router (no modifications)
- Storybook components → Next.js (with `'use client'` directives and path alias updates)
- Path aliases: `~/` (Remix/React Router) → `@/` (Next.js)

## Monorepo Tooling

### Package Manager: pnpm

The repository uses **pnpm** with a single lock file at the root. All packages and starters are part of the pnpm workspace defined in `pnpm-workspace.yaml`.

**Installation:**
```bash
pnpm install
```

**Key pnpm features:**
- Single `pnpm-lock.yaml` at root (no individual lock files)
- Content-addressed storage saves disk space
- Strict dependency resolution prevents phantom dependencies

### Build System: Turborepo

**Turborepo** handles all build orchestration with intelligent caching and parallel execution.

**Common commands:**
```bash
pnpm build              # Build all packages and starters (cached)
pnpm dev                # Run all dev servers in parallel
pnpm lint               # Lint all packages
pnpm typecheck          # Type-check all packages
pnpm copy:components    # Sync storybook components to starters
```

**Turborepo features:**
- Automatic build ordering based on dependencies (packages build before starters)
- Local caching in `.turbo/cache/` for instant rebuilds
- Parallel execution when possible
- Incremental builds

### Workspace Protocol

Starters use `workspace:*` to reference internal packages during development:

```json
{
  "dependencies": {
    "drupal-decoupled": "workspace:*",
    "drupal-auth-client": "workspace:*"
  }
}
```

This ensures starters always test against the local package code. When packages are published to npm, these resolve to actual version ranges.

**Important distinction:**
- **Packages** (publishable): `drupal-decoupled`, `drupal-auth-client`, `create-drupal-decoupled`
- **Starters** (scaffoldable): Private templates for project scaffolding

## Architecture Highlights

### GraphQL Integration

All starters use:
- **gql.tada** for type-safe GraphQL with TypeScript
- **@urql/core** for GraphQL client
- Fragment-based queries in `graphql/fragments/`
- Route-based data fetching via Drupal's GraphQL API

### Authentication Flow

Starters implement OAuth2 authentication with Drupal:
1. `drupal-auth-client` handles token management
2. Client initialization in `utils/client.server.ts` or `utils/client.ts`
3. Credentials from environment variables (CLIENT_ID, CLIENT_SECRET, AUTH_URI)

### Dynamic Routing Pattern

All starters use catch-all routes:
- Next.js: `app/[[...slug]]/page.tsx`
- Remix/React Router: Dynamic route files

The pattern:
1. Extract path from params
2. Query Drupal's `route(path: $path)` endpoint
3. Return appropriate component based on entity type (`NodePage`, `NodeArticle`, `TermTags`, etc.)

### Preview/Draft Mode

The `drupal-decoupled` package exports `syncDrupalPreviewRoutes` for handling draft content previews via `@measured/puck` integration.

## Development Workflow

### Working with Components

1. **Always edit components in `starters/storybook/app/components/`**
2. Components are synced to other starters via `scripts/copy-components.ts`
3. Next.js adaptations (client directives) are applied automatically during sync

### Environment Variables

Starters require these environment variables:
- `DRUPAL_GRAPHQL_URI` - GraphQL endpoint URL
- `DRUPAL_AUTH_URI` - Drupal base URL for authentication
- `DRUPAL_CLIENT_ID` - OAuth2 client ID
- `DRUPAL_CLIENT_SECRET` - OAuth2 client secret
- `ENVIRONMENT` - Environment identifier (dev/prod)

See `.env.example` files in each starter for complete requirements.

## Key Dependencies

- **gql.tada**: Type-safe GraphQL queries
- **@urql/core**: GraphQL client
- **@measured/puck**: Visual editor/preview integration
- **drupal-auth-client**: OAuth2 authentication
- **Tailwind CSS v4**: Styling (all starters)
- **Radix UI**: Accessible component primitives
- **composable-functions**: Utility for composable business logic
- **conform**: Form validation (with Zod)

## Repository Maintenance

Main branch: `main`
