---
title: "feat: AI prototyping toolbar for producers (react-router starter)"
type: feat
status: active
date: 2026-07-02
---

# feat: AI prototyping toolbar for producers (react-router starter)

## Overview

Add an env-gated, AI-powered prototyping flow to `starters/react-router`. Producers open any CMS-rendered page, type a request into a floating toolbar ("move the CTA above the hero", "add a pricing section with 3 plans"), and get a shareable, CMS-independent prototype at `/prototypes/:id` that renders live as the spec streams in. Prototypes are json-render `Spec` snapshots stored through a pluggable `PrototypeStore`, iterated over an append-only version history.

## Problem Frame

Producers currently need Figma and/or Drupal edits to explore page variations. The starter already resolves Drupal content into json-render specs rendered through a brand-native component registry, which means a page variation is *just data*. This feature closes the loop: let an LLM rewrite that data under catalog constraints, so prototypes are faithful to the design system by construction and demonstrably buildable in Drupal afterwards.

Design was settled in a grilling session (2026-07-02); decisions carried forward below. This plan targets the **demo milestone** only.

## Requirements Trace

**Producer UX**
- R1. Producer can create a prototype from any existing `NodePage` via a floating toolbar (chat input), gated by a server env flag.
- R3. The prototype renders live (streaming) at `/prototypes/:id` while the spec is generated.

**AI Generation Behavior**
- R2. Generation is hybrid: existing catalog blocks first; novel sections are composed from design-system primitives inside the spec (no free-form HTML, no code-gen).
- R5. Edits preserve real CMS content (text, images) unless the user asks to change it; new sections reuse image URLs from the base spec, falling back to bundled placeholders.

**Data Model**
- R4. Prototypes are iterative sessions: append-only version history `{spec, message, timestamp}` + `sourcePath`, with undo/restore.
- R6. Prototypes are CMS-independent snapshots (frozen content; image URLs hotlink to Drupal — accepted trade-off).

**Infrastructure**
- R7. Storage goes through a `PrototypeStore` interface with swappable providers; demo ships filesystem, deploy target is Node.

**Security & Gating**
- R8. The generation endpoint is disabled unless server env `PROTOTYPING_ENABLED` is set (structural safety even though full auth is out of scope).

## Scope Boundaries

- Only `starters/react-router`. No next-starter parity, no extraction to `packages/`.
- No auth/tokens (direction decided: token + unguessable IDs — deferred post-demo).
- No remote storage provider implementation (interface must allow it).
- No blog/`NodeArticle` prototyping, no Google Docs extraction (long-term goal; do not design anything that assumes spec root is `NodePage`).
- No design-system (token/theme) editing by the AI.
- No media-library image pool (post-demo enhancement).
- No rate limiting (noted as risk).

## Context & Research

### Relevant Code and Patterns

- `starters/react-router/app/integration/resolvers/catalog.ts` — `defineCatalog(schema, { components })` with zod props + descriptions for all 8 blocks. This is the contract the LLM must satisfy; new primitives extend it.
- `starters/react-router/app/integration/resolvers/resolver.ts` — GraphQL → `Spec` resolution (currently `NodePage` only).
- `starters/react-router/app/integration/resolvers/registry.tsx` — `defineRegistry(catalog, { components })` mapping types → React components.
- `starters/react-router/app/integration/layout/SpecRenderer.tsx` — `JSONUIProvider` + `Renderer`; reuse for prototype pages.
- `starters/react-router/app/routes/$.tsx` — catch-all loader: Drupal query → `resolve()` → spec. The spec-resolution portion must be extracted for reuse by the generation endpoint.
- `starters/react-router/app/routes.ts` — explicit `RouteConfig`; `routes/forms/contact_form.ts` is the existing resource-route pattern to mirror.
- `starters/react-router/app/components/primitives/` — `Button`, `Image`, `SimpleCard`, etc. exist as React components but are not in the catalog; layout primitives (`Section`, `Grid`, `Stack`, `Heading`, `Text`) do not exist yet.
- `starters/react-router/app/static/placeholders/` — bundled placeholder images; use as image fallback for generated sections.
- Env pattern: server-only `process.env.*` read in loaders (`$.tsx`); client gets values via loader data. Follow this for the toolbar flag — no `VITE_*` var needed.
- Stack: react-router 7.12 (framework mode, Node server via `@react-router/serve`), zod 4.4, `@json-render/*` 0.19; no unit-test infra in the repo, though the starter ships Storybook 10 (`storybook`/`build-storybook` scripts).

### External References

- json-render docs (vercel-labs/json-render): the library ships a native AI pipeline —
  - `catalog.prompt({ customRules })` generates the system prompt (component defs + props schemas).
  - Server: AI SDK `streamText` returning `toTextStreamResponse()`; the model emits **JSONL spec patches** (SpecStream format).
  - Client: `useUIStream({ api }).send(prompt, context)` progressively builds the spec; render with `<Renderer spec={spec} loading={isStreaming} />`.
  - `catalog.validate(spec)` / `catalog.zodSchema()` for final validation; `createSpecStreamCompiler` (core) compiles streamed JSONL patches into a `Spec` server-side.
  - Editing supported by injecting "current UI state" JSON into the system prompt.
- AI SDK (`ai` + `@ai-sdk/anthropic`), model `claude-sonnet-4-6` (upgrade to `claude-opus-4-8` if composition quality disappoints).

## Key Technical Decisions

- **Use json-render's native SpecStream pipeline instead of `streamObject`**: `catalog.prompt()` + `streamText` (JSONL patches) + `useUIStream` is purpose-built for this exact flow, ships with the already-adopted library, and avoids hand-rolling partial-object rendering. This supersedes the earlier `streamObject` idea from the design session.
- **Full-spec generation, not diff ops (v1)**: the model re-emits the whole spec as patches; marketing-page specs are small. Patch-based editing is a later optimization; stored artifact (final spec) doesn't change.
- **Server re-resolves the base spec from Drupal**: the generation endpoint receives `sourcePath` (or prototype id) and rebuilds the base spec server-side. Client-supplied specs are never trusted.
- **Validate-on-finish, no silent retry during streaming**: streaming and retry loops conflict (bad content already rendered). The stream is optimistic; `onFinish` validates with `catalog.validate()` and only persists valid specs. On failure the client shows an error with a retry affordance. (The grilling session's "retry with validation feedback" moves to a non-streaming fallback only if this proves unreliable — deferred.)
- **Design-system respect by construction**: new primitives expose only semantic variants (`variant: "muted" | ...`, spacing enums) in their zod props — never arbitrary class strings. The LLM literally cannot emit off-brand styling. This constraint applies to **all** catalog entries, not just the new primitives: catalog-facing prop schemas never expose `className`/style passthrough. The existing `imageSchema`/`buttonSchema` include `className`, so Button and Image get catalog-scoped schemas that omit it (internal schemas keep it for resolver use).
- **Content preservation & images via `customRules`**: catalog prompt rules instruct: preserve untouched content verbatim; reuse image URLs present in the base spec for new sections; fall back to bundled placeholder paths.
- **Toolbar gating via root loader data from `PROTOTYPING_ENABLED`**: one server-authoritative env var; the resource routes check it independently (403 when unset), so hiding the UI is never the only lock.
- **`PrototypeStore` interface with filesystem provider**: `get/list/create/appendVersion`; records under `.prototypes/*.json` (gitignored). Node `fs` is fine for the Node deploy target; remote providers implement the same interface later.
- **Undo = append, never rewrite**: restoring version N appends a new version with N's spec, preserving append-only history.

## Open Questions

### Resolved During Planning

- Streaming transport: json-render SpecStream (JSONL patches over `streamText`) — native library support, no custom protocol.
- How the prompt knows the catalog: `catalog.prompt()` — generated from the same zod schemas that validate the output.
- Client env exposure for the toolbar flag: root loader data, not `VITE_*`.
- Placeholder images: reuse `app/static/placeholders/` assets.
- Base spec + history transport: the endpoint loads everything server-side from the prototype record / `getPageSpec`; `useUIStream`'s `context` param carries no spec data, and the `currentSpec` field it POSTs is discarded (trust decision).

### Deferred to Implementation

- Exact `customRules` prompt wording (content preservation, image reuse, primitive-composition guidance): needs iteration against real model output.
- Version-history UI granularity (inline list vs. drawer) — visual call during implementation.
- Model choice final call (`claude-sonnet-4-6` vs `claude-opus-4-8`) — judge on real composition quality.

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification.*

```text
Source page (/about)                     Prototype page (/prototypes/:id)
┌──────────────────────┐                 ┌──────────────────────────────┐
│ $.tsx loader         │                 │ loader: store.get(id)        │
│  └─ getPageSpec(path)│──── spec ──►    │  └─ latest version spec      │
│ <Toolbar/> (flag on) │                 │ <SpecRenderer/> + <Toolbar/> │
└──────────┬───────────┘                 └──────────┬───────────────────┘
           │ POST /api/prototypes/create            │ useUIStream.send(message)
           │ {sourcePath, message}                  ▼
           ▼                              POST /api/prototypes/:id/generate
   store.create(...) ──► redirect ──►      ├─ check PROTOTYPING_ENABLED
                                           ├─ base spec = latest version │ getPageSpec(sourcePath)
                                           ├─ system = catalog.prompt({customRules})
                                           │          + base spec + message history
                                           ├─ streamText(anthropic) → JSONL patches → client renders live
                                            └─ onFinish: catalog.validate → store.appendVersion (valid only)
```

## Execution Task Breakdown

This plan is intentionally split at two levels:

- **Execution tasks** = the work slices we should actually pick up and track.
- **Implementation units** = the deeper technical detail for each slice.

The execution tasks below group the detailed units into chunks that are independent enough to work in parallel when useful, but still large enough to deliver meaningful progress without creating issue-management chaos.

### Recommended build order

1. Task 1 — Primitives + catalog surface
2. Task 2 — Prototype persistence + test harness
3. Task 3 — Reusable page-spec resolution
4. Task 4 — AI prompt + generation endpoint
5. Task 5 — Prototype viewer routes
6. Task 6 — Toolbar + create flow + env gating
7. Task 7 — Version history + restore + docs + demo pass

### Task 1 — Primitives + catalog surface

**Purpose:** Create the design-system-constrained building blocks the model can compose.

**Includes:**
- Unit 1: Layout/text primitives in components, catalog, and registry
- Primitive verification work from Unit 1

**Deliverables:**
- New `Section`, `Grid`, `Stack`, `Heading`, and `Text` primitives
- Catalog-safe `Button` and `Image` entries with no arbitrary `className` passthrough
- Registry updated to render all new entries
- Storybook/manual rendering proof that nested primitive specs render correctly

**Done when:**
- The catalog typechecks
- Registry and catalog stay in sync
- A hand-written spec using the new primitives renders correctly through `SpecRenderer`

### Task 2 — Prototype persistence + test harness

**Purpose:** Establish versioned storage behind a swappable interface before touching AI flows.

**Includes:**
- Unit 2: `PrototypeStore` interface + filesystem provider (+ minimal vitest setup)

**Deliverables:**
- Vitest configured in `starters/react-router`
- `PrototypeStore` contract and filesystem implementation
- `.prototypes/` gitignored
- Tests covering append-only behavior and path/UUID safety

**Done when:**
- `pnpm test` passes for the new store tests
- Manually exercising the store creates a valid prototype JSON record under `.prototypes/`

### Task 3 — Reusable page-spec resolution

**Purpose:** Extract the server-side page-to-spec pipeline into a reusable helper so the AI endpoint does not duplicate loader logic.

**Includes:**
- Unit 3: Extract reusable page-spec resolution from `$.tsx`

**Deliverables:**
- `getPageSpec(...)` server helper
- `$.tsx` refactored to consume it without behavior changes

**Done when:**
- `pnpm typecheck` passes
- Existing page rendering is unchanged against the local Drupal instance

### Task 4 — AI prompt + generation endpoint

**Purpose:** Build the actual server-side AI generation path with structural safety and validate-on-finish persistence.

**Includes:**
- Unit 4: Generation resource route with streaming + validate-on-finish

**Deliverables:**
- Prototyping env/config gate helper
- Pure prompt assembly module + tests
- Streaming generation endpoint using json-render SpecStream + Anthropic
- Final-spec compilation, validation, and conditional persistence

**Done when:**
- Disabled env returns 403 with no model call
- Enabled env streams JSONL patches
- Valid outputs append a version; invalid outputs do not touch persisted history

### Task 5 — Prototype viewer routes

**Purpose:** Make prototypes shareable artifacts with live streaming takeover during generation.

**Includes:**
- Unit 5: Prototype routes — viewer with live streaming

**Deliverables:**
- `/prototypes` listing route
- `/prototypes/:id` viewer route
- Saved-spec rendering with live streamed spec takeover
- Revalidation/handover back to persisted state after completion

**Done when:**
- Visiting an existing prototype renders without an AI call
- A generation in flight visibly streams and persists cleanly

### Task 6 — Toolbar + create flow + env gating

**Purpose:** Add the producer-facing entry point on source pages and prototype pages.

**Includes:**
- Unit 6: Floating toolbar + create flow + env gating

**Deliverables:**
- Floating toolbar UI and state machine
- Root loader exposure of `PROTOTYPING_ENABLED`
- Create-prototype route with strict `sourcePath` validation
- Redirect-to-prototype bootstrap flow using `pendingMessage`

**Done when:**
- Toolbar is present only when enabled
- Create flow works from a CMS-rendered page to a new prototype viewer
- Direct endpoint access is still rejected when the feature is disabled

### Task 7 — Version history + restore + docs + demo pass

**Purpose:** Add iteration safety and make the feature demoable twice in a row without chaos goblin energy.

**Includes:**
- Unit 7: Version history + undo, env docs, demo pass

**Deliverables:**
- Version history UI
- Restore endpoint with append-only semantics
- `.env.example` and README updates
- Repeatable end-to-end demo verification

**Done when:**
- History shows prior generations clearly
- Restoring a version appends a new version rather than mutating history
- The documented demo script runs end-to-end without manual cleanup

## Detailed Implementation Units

- [ ] **Unit 1: Layout/text primitives in components, catalog, and registry**

**Goal:** Give the LLM composable, design-system-constrained building blocks for sections that no existing block covers (R2).

**Requirements:** R2

**Dependencies:** None

**Files:**
- Create: `starters/react-router/app/components/primitives/Section/Section.tsx`, `Grid/Grid.tsx`, `Stack/Stack.tsx`, `Heading/Heading.tsx`, `Text/Text.tsx`
- Modify: `starters/react-router/app/components/primitives/index.ts`, `app/integration/resolvers/catalog.ts`, `app/integration/resolvers/registry.tsx`

**Approach:**
- Each primitive exposes only semantic props: e.g. `Section` (background: `default|muted|primary`, padding scale), `Grid` (columns 1–4, gap scale), `Stack` (direction, gap, align), `Heading` (level 1–4, size scale), `Text` (size, tone). No className/style passthrough in catalog props.
- Register existing `Button` and `Image` components as catalog entries. Do **not** promote `buttonSchema`/`imageSchema` verbatim: both expose `className`, which violates the no-arbitrary-class-strings constraint — define catalog-scoped schemas without `className` (semantic props only), keeping the internal schemas for resolver use.
- Container primitives (`Section`, `Grid`, `Stack`) declare `children` slots so the LLM can nest; write catalog `description` strings deliberately — they are LLM-facing documentation.
- Style with existing Tailwind semantic tokens (`bg-muted`, `text-primary`, etc.), mirroring current primitives' conventions (CVA where variants exist).

**Patterns to follow:** existing primitives (`Button`, `SimpleCard`) for file layout and CVA usage; existing catalog entries for schema+description style.

**Test scenarios:**
- Happy path: each primitive renders in Storybook with each variant (visual check; starter has Storybook, no unit-test infra for components).
- Edge case: `catalog.validate()` rejects a spec using a primitive with an out-of-enum variant value (covered by Unit 4 tests).

**Verification:** primitives render correctly via Storybook stories; catalog typechecks; a hand-written spec composing Section→Grid→SimpleCard renders through `SpecRenderer`.

---

- [ ] **Unit 2: `PrototypeStore` interface + filesystem provider (+ minimal vitest setup)**

**Goal:** Persist prototypes as append-only versioned records behind a swappable interface (R4, R6, R7).

**Requirements:** R4, R6, R7

**Dependencies:** None

**Files:**
- Create: `starters/react-router/app/prototyping/store/types.ts` (interface + record types), `store/filesystem.ts`, `store/index.ts` (provider selection)
- Create: `starters/react-router/app/prototyping/store/filesystem.test.ts`
- Create: `starters/react-router/vitest.config.ts` (vite-tsconfig-paths plugin so `~/` aliases resolve; node test environment)
- Modify: `starters/react-router/package.json` (add `vitest`, `test` script), `.gitignore` (`.prototypes/`)

**Approach:**
- `PrototypeRecord`: `{ id, sourcePath, createdAt, pendingMessage?, versions: Array<{ spec, message, timestamp }> }`. `pendingMessage` persists the first instruction captured at creation so the prototype page can auto-start the stream (ignored once `versions` is non-empty). `id` via `crypto.randomUUID()` (unguessable-by-default, aligns with deferred auth direction).
- Interface: `create({sourcePath, message?}) / get(id) / list() / appendVersion(id, {spec, message})`. All async.
- Filesystem provider writes one JSON file per prototype under `.prototypes/` (configurable base dir for tests). It validates that `id` is a UUID before building any path and resolves the final path asserting it stays inside the base dir — read/update paths receive ids from clients.
- Server-only module (uses `node:fs/promises`); never imported from client bundles.

**Test scenarios:**
- Happy path: `create` returns record with id + sourcePath + `pendingMessage`; `get` round-trips it; `appendVersion` grows `versions` and preserves prior entries; `list` returns created records.
- Edge case: `get` of unknown id returns null (not throw); `appendVersion` on unknown id throws a descriptive error.
- Error path: `get()` with a path-traversal id string (`../../x`) → rejected without touching the filesystem.
- Edge case: versions preserve insertion order and timestamps.
- Error path: corrupt JSON file → `get` surfaces a descriptive error (or null + warning; pick one and test it).

**Verification:** `pnpm test` passes in the starter; a prototype file appears under `.prototypes/` when exercised manually.

---

- [ ] **Unit 3: Extract reusable page-spec resolution from `$.tsx`**

**Goal:** Let the generation endpoint rebuild a page's base spec server-side without duplicating the loader (R5, R6, and the trust decision).

**Requirements:** R5, R6

**Dependencies:** None

**Files:**
- Create: `starters/react-router/app/prototyping/getPageSpec.server.ts` (or `app/integration/helpers/` — match repo taste)
- Modify: `starters/react-router/app/routes/$.tsx` (consume the helper)

**Approach:**
- Extract the query + `resolveEntity` + `resolve()` path into `getPageSpec(path): Promise<Spec | null>` returning the spec for `NodePage` routes (null otherwise — do **not** hardcode `NodePage` beyond what `resolve()` already does, per the no-`NodePage`-assumption boundary).
- `$.tsx` keeps its menu/header/footer/meta concerns; only spec resolution moves.
- Pure refactor: `$.tsx` behavior must not change.

**Patterns to follow:** existing `getDrupalClient()` usage and fragment handling in `$.tsx`.

**Test scenarios:**
- Integration (manual, needs live Drupal): existing pages render identically after the refactor (spot-check `/home` and one article).

**Verification:** `pnpm typecheck` passes; site renders unchanged against the dev Drupal instance.

---

- [ ] **Unit 4: Generation resource route with streaming + validate-on-finish**

**Goal:** The AI core: turn `{prototype, message}` into a streamed spec, persisting only validated results (R2, R3, R5, R8).

**Requirements:** R2, R3, R5, R8

**Dependencies:** Units 1 (catalog), 2 (store), 3 (base spec)

**Files:**
- Create: `starters/react-router/app/routes/api/prototypes.generate.ts` (resource route), `app/prototyping/prompt.server.ts` (prompt assembly), `app/prototyping/config.server.ts` (env gate helper)
- Create: `starters/react-router/app/prototyping/prompt.server.test.ts`
- Modify: `starters/react-router/app/routes.ts` (register route), `package.json` (add `ai`, `@ai-sdk/anthropic`)

**Approach:**
- `POST /api/prototypes/:id/generate` with `{ message }`. Server loads the prototype record; base spec = latest version's spec, or `getPageSpec(sourcePath)` for the first generation. Nothing spec-shaped is accepted from the client — note that `useUIStream` POSTs `{ prompt, context, currentSpec }`, and the endpoint must discard `currentSpec` entirely.
- Gate first: return 403/404 unless `PROTOTYPING_ENABLED=true` and `ANTHROPIC_API_KEY` present.
- System prompt via `catalog.prompt({ mode: "standalone", customRules })` — set the mode explicitly rather than relying on the undocumented default (verify the exact option against the installed version) — + serialized base spec + prior `{message}` history (conversational context for "no, above the hero"). Custom rules cover: preserve untouched content verbatim; reuse base-spec image URLs for new sections, else placeholder paths from `app/static/placeholders/`; compose novel sections from primitives; never invent component types.
- `streamText` with `@ai-sdk/anthropic` (`claude-sonnet-4-6`), return `toTextStreamResponse()` (JSONL SpecStream patches).
- `onFinish`: compile the final spec from the streamed JSONL with `createSpecStreamCompiler` from `@json-render/core` (push the full text, `getResult()`), then `catalog.validate()`; valid → `store.appendVersion(id, { spec, message })`; invalid → log and do not persist (client handles via Unit 5's error state).

**Execution note:** build `prompt.server.ts` as a pure function (inputs → string) so it is testable without network.

**Test scenarios:**
- Happy path: prompt assembly includes catalog prompt output, base spec JSON, all prior messages in order, and the custom rules block.
- Edge case: first generation (no versions) uses source-page spec; later generations use latest version's spec.
- Error path: request with `PROTOTYPING_ENABLED` unset → 403 and no model call (test the gate helper).
- Error path: invalid final spec → `appendVersion` not called (unit-test the `onFinish` handler with a stubbed store and an invalid spec).
- Integration (manual): end-to-end stream against real Anthropic renders progressively in the browser.

**Verification:** curl of the endpoint with the flag off returns 403; with the flag on, a real request streams JSONL and a new version lands in the store file.

---

- [ ] **Unit 5: Prototype routes — viewer with live streaming**

**Goal:** Shareable `/prototypes/:id` page that renders the saved spec, streams updates live, and lists existing prototypes (R3, R4, R6).

**Requirements:** R3, R4, R6

**Dependencies:** Units 2, 4

**Files:**
- Create: `starters/react-router/app/routes/prototypes.$id.tsx`, `app/routes/prototypes._index.tsx` (simple list)
- Modify: `starters/react-router/app/routes.ts`

**Approach:**
- Loader: `store.get(id)` → latest version spec + version metadata + `sourcePath`; 404 when missing. Also expose the enabled-flag for toolbar mounting.
- Component: `SpecRenderer` with the saved spec; when a generation is in flight, `useUIStream` output takes over rendering (`Renderer` with `loading={isStreaming}`), falling back to persisted spec otherwise. Revalidate after `onComplete` so the persisted version becomes source of truth.
- The record's `pendingMessage` (set by the toolbar flow, Unit 6) auto-triggers `send(pendingMessage)` on mount when `versions` is empty — this is the "redirect immediately, watch it build" moment.
- Keep page chrome minimal (no site Header/Footer, or a slim "Prototype" banner showing sourcePath + created date) — it's an artifact viewer, not the site.

**Patterns to follow:** `$.tsx` loader conventions; `SpecRenderer` usage in `integration/layout/NodePage.tsx`.

**Test scenarios (manual — UI):**
- Happy path: visiting a stored prototype renders its latest version without any AI call.
- Happy path: iterating from the toolbar streams visibly section-by-section, and a reload shows the persisted result.
- Error path: unknown id → 404 page.
- Error path: generation ends invalid → persisted spec remains, error affordance with retry appears.

**Verification:** demo flow works: create → watch stream → reload → share URL in another browser renders identically.

---

- [ ] **Unit 6: Floating toolbar + create flow + env gating**

**Goal:** The producer-facing entry point on source pages and prototype pages (R1, R8).

**Requirements:** R1, R5, R8

**Dependencies:** Units 2, 5 (routes to land on), 4 (endpoint)

**Files:**
- Create: `starters/react-router/app/prototyping/Toolbar.tsx` (floating button + chat panel), `app/routes/api/prototypes.create.ts` (resource route: create record → redirect)
- Modify: `starters/react-router/app/root.tsx` (root loader exposes `prototypingEnabled`; mount toolbar), `app/routes.ts`, `.env.example`

**Approach:**
- Root loader reads `process.env.PROTOTYPING_ENABLED`; toolbar mounts only when true (server-authoritative flag; resource routes re-check independently).
- On a source page: submit → `POST /api/prototypes/create` with `{ sourcePath: currentPath, message }` → creates record (message stored as `pendingMessage`) → redirect to `/prototypes/:id`, which auto-starts the stream (Unit 5). The action validates `sourcePath` server-side before any use: relative path only (leading `/`, no protocol/host, no `..` segments), 400 otherwise — it drives a server-side Drupal request and must never become an SSRF/path-traversal vector.
- On a prototype page: the same toolbar posts the message through `useUIStream.send()` (no new record).
- Toolbar states: idle / input open / streaming (disabled input + progress hint) / error (retry keeps the message).
- Styling: existing primitives + semantic tokens; it overlays fixed bottom-right above page content.

**Patterns to follow:** `conform`/form patterns from `routes/forms/` for the create action; existing component conventions.

**Test scenarios (manual — UI):**
- Happy path: flag on → toolbar visible on `/home`; flag off → absent, and direct POST to create/generate endpoints returns 403.
- Happy path: submitting from `/about` lands on a new prototype seeded from `/about`'s content with real text/images preserved.
- Edge case: submitting an empty message is blocked client-side.
- Error path: create with an absolute URL or `..` segments in `sourcePath` → 400, no record created.

**Verification:** full create-from-page flow works locally with `PROTOTYPING_ENABLED=true`; endpoints reject when disabled.

---

- [ ] **Unit 7: Version history + undo, env docs, demo pass**

**Goal:** Round out iteration safety and make the demo repeatable (R4 + demo script).

**Requirements:** R4

**Dependencies:** Units 5, 6

**Files:**
- Create: `starters/react-router/app/prototyping/VersionHistory.tsx`, `app/routes/api/prototypes.restore.ts` (action: restore version N by appending)
- Modify: `starters/react-router/app/prototyping/Toolbar.tsx` (history entry point), `.env.example` (document `PROTOTYPING_ENABLED`, `ANTHROPIC_API_KEY`), starter `README.md` (feature section + demo script)

**Approach:**
- History UI lists versions (message + timestamp, newest first); selecting one previews it; "Restore" appends a copy as a new version (append-only invariant). Restore is `POST /api/prototypes/:id/restore` with `{ versionIndex }`, registered in `routes.ts`, and re-checks the `PROTOTYPING_ENABLED` gate via the Unit 4 `config.server.ts` helper (403 when disabled).
- README documents: enabling the feature, the security caveat (only enable in protected environments; auth deferred), the CMS-hotlink image trade-off, and the demo script from the design session (edit live → out-of-catalog pricing section → undo → show JSON snapshot).

**Test scenarios:**
- Happy path: after 3 generations, history shows 3 entries; restoring v1 creates v4 with v1's spec and the renderer shows it.
- Edge case: restore action on invalid version index → 400, history unchanged (test at store/action level with vitest).
- Error path: restore with `PROTOTYPING_ENABLED` unset → 403, store unchanged.

**Verification:** the full demo script runs end-to-end twice in a row without manual cleanup.

## System-Wide Impact

- **Interaction graph:** `$.tsx` is refactored (Unit 3) — the highest-traffic route; must be behavior-identical. `root.tsx` gains loader data (affects every route's revalidation payload trivially). `routes.ts` gains 5 routes.
- **Catalog surface:** new primitives extend `catalog.ts`, which is shared with the existing CMS rendering path — additions are backwards-compatible (new keys only), but registry and catalog must stay in sync or `defineRegistry` typechecking fails (that failure is the safety net).
- **Error propagation:** stream failures must surface in the toolbar, not crash the prototype page; invalid final specs must never reach the store (single write path through validated `onFinish`).
- **State lifecycle risks:** concurrent generations on one prototype could interleave `appendVersion` writes; demo-acceptable, but the filesystem provider should write atomically (write-temp-then-rename) to avoid corrupt records.
- **API surface parity:** none — next starter intentionally untouched; note in README that parity is deferred.
- **Unchanged invariants:** CMS rendering path (`$.tsx` → `resolve()` → `SpecRenderer`) behaves identically with the feature disabled; the feature is purely additive behind `PROTOTYPING_ENABLED`.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Model emits malformed JSONL/invalid specs, degrading the live-stream demo moment | `catalog.prompt()` is purpose-built for this; validate-on-finish keeps the store clean; iterate `customRules`; Opus fallback if Sonnet composes poorly |
| Endpoint burns API credits if exposed (no auth in demo) | `PROTOTYPING_ENABLED` server gate; README caveat: protected environments only; token auth is the decided next step |
| Prompt size: catalog prompt + full base spec + history may get large on content-heavy pages | Specs are small in practice; history sends messages only (not per-version specs); monitor token use during implementation |
| `useUIStream` interplay with react-router revalidation (double-render or spec flicker post-completion) | Explicit handover: stream spec wins while `isStreaming`, revalidated loader spec after `onComplete`; verify during Unit 5 |
| No component test infra; UI regressions rely on manual checks | Vitest covers pure logic (store, prompt, gate); Storybook stories for primitives; demo script doubles as regression script |
| Hotlinked Drupal images break if media is deleted | Accepted trade-off, documented in README (design decision) |

## Documentation / Operational Notes

- `.env.example`: `PROTOTYPING_ENABLED`, `ANTHROPIC_API_KEY` with security caveat comments.
- Starter README: feature overview, enablement, demo script, deferred items (auth, remote store, blogs/Google Docs pipeline).
- `.prototypes/` gitignored; no infra provisioning needed for the demo.

## Sources & References

- Origin: grilling session 2026-07-02 (decisions recorded in project memory `prototyping-feature-design`); no `docs/brainstorms/` document exists.
- Related code: `starters/react-router/app/integration/resolvers/`, `app/routes/$.tsx`, `app/components/primitives/`
- Related commits: `f89bf2a`, `b63e937`, `3f2db5a`, `736310f` (json-render resolver adoption)
- External docs: vercel-labs/json-render (catalog.prompt, SpecStream/JSONL, useUIStream, validate), AI SDK Anthropic provider
