# Drupal Decoupled Integrations: Next.js demo project

## Introduction

This is a starter project for a Next.js app that connects to a Drupal using GraphQL. Is a port of the features from our Remix Drupal demo project.

## Features

- [x] GraphQL API integration
- [x] Previews
- [x] View revisions
- [x] Support taxonomy terms
- [ ] Meta tags for SEO

## Get Started

### Clone Next.js demo project
```bash
npx create-next-app@latest --example "https://github.com/octahedroid/drupal-decoupled/tree/main/examples/next-graphql"
```

### Copy `.env.example`

```bash
cp .env.example .env
```

Update values read copied file for instructions

### Development

Run the dev server:

```bash
yarn dev
```

### Sync GraphQL Changes

Run the gql:sync script

```bash
yarn gql:sync
```

## Next.js docs
📖 See the [Next.js docs](https://nextjs.org/docs) for details on supported features.

