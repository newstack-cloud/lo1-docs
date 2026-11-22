# lo1 Docs

The lo1 documentation site at lo1.dev: a Next.js and Fumadocs site, exported statically and
deployed to GitHub Pages. It documents installing, configuring and running lo1, its CLI and its
plugins, and has a blog and the NewStack newsletter signup.

## Workspace

This repo is one of NewStack's. NewStack's maintainers develop it alongside the others in a
shared workspace, using the NewStack Claude Code plugin for how work is planned, reviewed,
committed and coordinated across repos. The plugin isn't public, and nothing here depends on it:
this file and the repo's own docs cover what a contribution needs.

## Layout

| Path | Holds |
|---|---|
| `content/docs/` | The docs, in MDX, ordered by `meta.json`: getting started, guides, and the CLI and plugin reference |
| `content/blog/` | Blog posts (the `blogPosts` collection in `source.config.ts`; the directory doesn't exist until the first post). `author` must be a key in `src/lib/authors.ts` or the build fails; `draft: true` posts show only in `yarn dev` |
| `src/app/` | The site: home page, privacy page, blog, docs, plus the `static.json` search export, `llms` routes and sitemap |
| `src/components/`, `src/lib/` | Components (search, newsletter signup, copy command), metadata, analytics events |
| `public/schemas/lo1.v1.schema.json` | A copy of the lo1 SDK's `lo1.yaml` JSON Schema, served at the URL its `$id` names |
| `scripts/` | Build steps: link checks, search index sync |

## Checks

- **Tools:** Node 22 (the deploy workflow's) with Yarn 4 through corepack (`packageManager`).
  `yarn install --immutable` first, which also runs `fumadocs-mdx`.
- **Checks,** before a change reaches `main`: `yarn lint`, `yarn check-links`, then
  `yarn next build`, which type-checks, lints and fails on MDX errors. `yarn check-links` catches
  broken links to non-docs routes only: every `/docs/...` link passes, so after moving or
  renaming a page, grep `content/` for the old path. It never checks links in `src/` (landing,
  footer, privacy page).
- **`yarn build`** runs `check-links`, `next build` and `post-build`, then `sync-content`, which
  replaces the production Algolia search index when Algolia credentials are available from the
  environment or `.env`, and skips itself when they aren't.
- **Gates:** no git hooks, no commitlint, and no build on pull requests. `deploy.yml` runs on
  pushes to `main`. `schema-sync.yml` fails when the schema copy differs, byte for byte, from
  lo1's `main`: on pushes to `main` and pull requests that change `public/schemas/`, and every
  Monday.

## Running locally

`yarn dev` serves the site on port 3000. Search is switched off unless all three
`NEXT_PUBLIC_ALGOLIA_*` variables are set (`src/provider.tsx`), and they're read when `next dev`
starts. Don't copy `.env.example` to `.env` for local work: its placeholders switch search on
and make `sync-content` try to run. Dev and build fetch the Inter font from Google Fonts, and
Plausible's script loads on every page. The newsletter form posts to Buttondown, so a local
signup sends a real confirmation email. Page dates and the sitemap come from git history, so a
shallow clone drops them.

## Compatibility

- **lo1:** the CLI, configuration and plugin pages document lo1's `@lo1/cli`, the `lo1.yaml`
  schema and its plugins (no plugin-authoring guide yet). The landing showcase and quick start
  mirror lo1's `examples/shop` and its CLI output ([README.md](README.md)). A change in lo1
  updates the pages here once it's on lo1's `main`. The Celerity plugin page describes a plugin
  that isn't usable yet, and says so.
- **`lo1.yaml` schema:** copied unchanged from lo1's `packages/sdk/schemas/`, never edited
  here; `schema-sync.yml` checks it. Its `$id`, `https://lo1.dev/schemas/lo1.v1.schema.json`, is
  the URL the SDK's README tells users to point their editors at, so that path never moves.
- **URLs:** `lo1 doctor` prints `https://lo1.dev/docs/troubleshooting`, and lo1's README links the
  site. Nothing can redirect (static export on GitHub Pages), so moving a page breaks its inbound
  links unless a stub page stays at the old path.
- **Analytics and newsletter:** Plausible custom events need a matching goal in the Plausible
  dashboard (`src/lib/analytics.ts`). The signup form posts to the NewStack Buttondown list, and
  its `source` names the event. The privacy page describes both, so a change to what's
  collected updates it and its `UPDATED` date.
- **Persisted state:** none.

## Conventions

- Commits: plain lowercase imperative subjects without a conventional-commit type (`add
  troubleshooting guide`); nothing checks them, and there are no releases.

## Safety

- **A push to `main` deploys.** `deploy.yml` builds the site, syncs the Algolia index if
  configured and publishes to GitHub Pages at lo1.dev, and nothing checks a pull request first,
  so run the checks above before a change reaches `main`.
- While Algolia credentials are available, from `.env`, the shell environment or CI, don't run
  `yarn build` or `yarn sync-content` unless asked: they overwrite the production search
  index.
- Don't submit the newsletter form or trigger analytics events from automated runs.

## Known mistakes

<!-- One line per mistake an agent has made here, phrased as the rule that prevents it. -->
