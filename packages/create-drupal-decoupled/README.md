# create-drupal-decoupled

> A CLI tool that scaffolds Drupal integration for decoupled frontend projects.

## Features

- Automatic detection of frontend frameworks (Next.js, React Router, Remix)
- Scaffolds GraphQL integration with type-safe queries
- Configures authentication and API connection
- Updates project configuration files
- Framework-specific template generation

## Installation

```bash
# Using npm
npx @octahedroid/create-drupal-decoupled

# Using yarn
yarn create @octahedroid/drupal-decoupled

# Using pnpm
pnpm create @octahedroid/drupal-decoupled

# Using bun
bunx @octahedroid/create-drupal-decoupled
```

## Quick Start

Navigate to your existing frontend project and run the scaffolding command:

```bash
# In your project directory
npx @octahedroid/create-drupal-decoupled . --frontend next

# Or specify a different directory
npx @octahedroid/create-drupal-decoupled my-project --frontend react-router
```

## Supported Frameworks

- **Next.js** (`next`) - React framework with server-side rendering
- **React Router** (`react-router`) - Modern React routing library
- **Remix** (`remix`) - Full-stack React framework

## Usage

```bash
create-drupal-decoupled [project-directory] [options]
```

### Arguments

- `project-directory` - Target directory for scaffolding (defaults to current directory)

### Options

- `-f, --frontend <framework>` - Frontend framework to use (required)
- `-v, --version` - Display version number
- `-h, --help` - Display help information

### Examples

```bash
# Scaffold Next.js integration in current directory
npx @octahedroid/create-drupal-decoupled . --frontend next

# Scaffold React Router integration in specific directory
npx @octahedroid/create-drupal-decoupled ./my-app --frontend react-router

# Scaffold Remix integration
npx @octahedroid/create-drupal-decoupled ./remix-app --frontend remix
```

## What Gets Generated

The CLI will add the following to your project:

- GraphQL configuration and type definitions
- Drupal client setup with authentication
- Framework-specific integration files
- Environment variable templates
- Updated `.gitignore` with Drupal-specific entries

## Requirements

- Node.js >= 20.15.1
- Existing frontend project with supported framework
- Package.json file in target directory

## Development

### Setup

```bash
# Install dependencies
yarn install

# Build the package
yarn build

# Development mode with file watching
yarn dev
```

### Local Testing

```bash
# Build the package
yarn build

# Test locally
node dist/index.js . --frontend next
```