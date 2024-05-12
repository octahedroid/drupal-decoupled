# Drupal Decoupled Integrations: Remix demo project

## Get Started

### Clone Remix demo project
```bash
npx create-remix@latest --template octahedroid/drupal-decoupled/examples/remix-graphql
```

### Copy `.dev.vars.example`

```bash
cp .dev.vars.example .dev.vars
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

<details>
  <summary>Remix docs</summary>

  📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

  ## Typegen

  Generate types for your Cloudflare bindings in `wrangler.toml`:

  ```sh
  npm run typegen
  ```

  You will need to rerun typegen whenever you make changes to `wrangler.toml`.

  ## Development

  Run the Vite dev server:

  ```sh
  npm run dev
  ```

  To run Wrangler:

  ```sh
  npm run build
  npm run start
  ```

  ## Deployment

  > [!WARNING]
  > Cloudflare does _not_ use `wrangler.toml` to configure deployment bindings.
  > You **MUST** [configure deployment bindings manually in the Cloudflare dashboard][bindings].

  First, build your app for production:

  ```sh
  npm run build
  ```

  Then, deploy your app to Cloudflare Pages:

  ```sh
  npm run deploy
  ```

  [bindings]: https://developers.cloudflare.com/pages/functions/bindings/
</details>
