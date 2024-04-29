# Drupal Decoupled Integrations

## Why Decoupled Drupal
Using Drupal as a headless CMS with a Decoupled front-end implementation is a great way to get an enterprise-quality CMS, paired with a great modern development experience using Remix, Next.js, Astro and/or others.

This repository will provide you with the building blocks to achive this in a simplified way.

### Components

- [Drupal sites](drupal/sites)
- [Drupal modules](drupal/modules)
- [Decoupled project examples](examples)
- [Npm packages](packages)

It only takes a few steps to use Drupal paired with a Decoupled front-end framework, follow these instructions below to get that running on your local machine.

## Get Started

### Drupal GraphQL demo site

```
git clone git@github.com:octahedroid/drupal-graphql-example.git
```

> Follow instructions reading [README.md](https://github.com/octahedroid/drupal-graphql-example) file on cloned project

### Remix demo project

```
npx create-remix@latest --template octahedroid/drupal-decoupled/examples/remix-graphql
```
> Follow instructions reading [README.md](examples/remix-graphql) file on cloned project

### Next.js demo project

```
npx create-next-app@latest --example "https://github.com/octahedroid/drupal-decoupled/tree/main/examples/next-graphql"
```
> Follow instructions reading [README.md](examples/next-graphql) file on cloned project

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
