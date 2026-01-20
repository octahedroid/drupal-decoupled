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
