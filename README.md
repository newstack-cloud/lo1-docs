# lo1 Docs

The website for [lo1](https://github.com/newstack-cloud/lo1): a landing page and documentation, served at https://lo1.dev.

Built with Next.js and [Fumadocs](https://fumadocs.dev), using the same setup as the Celerity and Bluelink docs sites, and exported as a static site to GitHub Pages.

## Development

```bash
yarn install
yarn dev
```

Open http://localhost:3000.

## Layout

| Path                     | Contents                                                        |
| ------------------------ | --------------------------------------------------------------- |
| `src/app/(home)`         | Landing page and its layout.                                    |
| `src/components`         | Landing page sections: hero, showcase, features, ecosystem, …   |
| `content/docs`           | Documentation pages (MDX). Navigation order is in `meta.json`.  |
| `src/lib/layout.shared.tsx` | Nav links shared by the landing page and docs.               |

The landing page showcase (`src/components/showcase.tsx`) and the quick start are built from the lo1 repo's `examples/shop` workspace. The terminal output mirrors what `lo1 up` prints for it: the `[lo1]` phase and service lines from `packages/cli/src/orchestrator/start.ts` (formatted by `packages/cli/src/output/format.ts`) and the ready summary from `packages/cli/src/cli/commands/up.ts`. When the example or that output changes, update them together.

## Search

Search uses Algolia. It is switched off until `NEXT_PUBLIC_ALGOLIA_APP_ID`, `NEXT_PUBLIC_ALGOLIA_API_KEY` and `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` are set (see `.env.example`). The build syncs the index when `ALGOLIA_SECRET_API_KEY` is also set.

## Validating links

```bash
yarn check-links
```
