# Drupal Decoupled: React Router

## Getting Started

Visit the docs to see how to use this [React Router](https://drupal-decoupled.octahedroid.com/docs/getting-started/quick-start/react-router) starter.

## AI prototyping toolbar

This starter includes an env-gated AI prototyping flow for CMS-rendered pages.

With prototyping enabled, producers can:

- open a floating AI toolbar on a rendered page
- request layout/content variations in plain language
- get a shareable prototype at `/prototypes/:id`
- watch the prototype stream live while the spec is generated
- copy the rendered HTML or the generated spec JSON
- restore previous versions through append-only history

### Enable the feature

Add the following to `.env`:

```env
PROTOTYPING_ENABLED=true
ANTHROPIC_API_KEY=your_key_here
```

If your Anthropic account needs a specific model, you can also add:

```env
ANTHROPIC_MODEL=claude-sonnet-4-6
```

### Security caveat

This is a demo-oriented feature and should only be enabled in protected environments.

Current limitations:

- no auth yet
- no rate limiting yet
- no token-based sharing protections yet

The toolbar being hidden in the UI is **not** the only guard. The create/generate/restore routes also check `PROTOTYPING_ENABLED` server-side.

### Demo script

1. Start the starter with `pnpm dev`
2. Open a CMS-rendered page such as `/home` or `/about`
3. Open the AI toolbar and submit a request such as:
   - `Move the CTA above the hero`
   - `Add a pricing section with 3 plans`
4. Confirm you are redirected to `/prototypes/:id`
5. Watch the prototype stream live
6. Open the details drawer and preview version history
7. Restore an earlier version to confirm append-only undo
8. Use **Copy HTML** and **Copy spec** to export the current result

### Operational notes

- Prototype records are stored under `.prototypes/`
- Stored prototypes are CMS-independent snapshots
- Existing Drupal image URLs are reused when possible
- New generated sections fall back to remote placeholder images via `https://placehold.co`

### Deferred items

- auth / tokenized sharing
- remote storage provider
- blog / article / Google Docs prototyping flows
- AI editing of theme/token system
- rate limiting

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
