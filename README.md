# My Site — Personal CV

A lightweight, performant personal CV website built with vanilla HTML5, Tailwind CSS, and Node.js scripting.

## Overview

This is a single-file static site (`index.html`) with a content template system. The CV displays professional experience, education, and background with a clean, print-friendly design.

**Live:** [leandrofernandez.dev](https://leandrofernandez.dev)

## Stack

- **Frontend**: Vanilla HTML5, Tailwind CSS (CDN)
- **Content**: Static JSON template system (`content.json`)
- **Build/Tooling**: Node.js scripts (build, watch, dev server)
- **Hosting**: Cloudflare Pages
- **Testing**: Playwright E2E (custom runner)

## Architecture

### Single-File Static Site
- **`index.html`** — The only page. All markup and styles are inline.
- **Tailwind CSS via CDN** — No build step for CSS. Config lives in `<script>` inside the HTML.
- **Print Stylesheet** — Optimized for PDF export (inline in `<style>`).

### Content Template System
- **`content.json`** — JSON file containing all text, links, and metadata.
- **`scripts/replace.js`** — Template replacement logic: finds `{{key.subkey}}` placeholders in HTML and replaces them with JSON values.
- **`scripts/build.js`** — Build script: reads `index.html` and `content.json`, runs replacement, outputs to `dist/index.html`.
- **`scripts/watch.js`** — File watcher: re-runs build on changes to `index.html` or `content.json`.
- **`scripts/server.js`** — Dev server: serves `dist/index.html` with hot-reload capability and file watching.

### Why This Approach?
- No framework overhead.
- Single source of truth for content (`content.json`).
- Easy to localize or A/B test by swapping content files.
- Simple, maintainable, and auditable.

## Project Structure

```
my-site/
├── index.html              # Main CV page (with template placeholders)
├── content.json            # All text, links, metadata
├── dist/                   # Build output (generated)
├── public/                 # Static assets (favicon)
├── scripts/
│   ├── build.js           # Build: index.html + content.json → dist/index.html
│   ├── watch.js           # Watch: re-run build on changes
│   ├── server.js          # Dev server: serve + live reload
│   ├── replace.js         # Template replacement logic
│   └── test-runner.js     # Playwright E2E test runner
├── tests/                  # E2E test files
├── openspec/              # SDD (Spec-Driven Development) docs
├── package.json           # Node.js dependencies
└── README.md              # This file
```

## Available Scripts

Run from the project root with `npm run <script>`:

### `npm run start`
Starts the dev server and watches for changes.
- Serves the site at `http://localhost:3000`
- Auto-rebuilds on changes to `index.html` or `content.json`
- Useful for development and content iteration

### `npm run build`
Builds `dist/index.html` from `index.html` and `content.json`.
- One-off build (no watch).
- Used by Cloudflare Pages for deployment.

### `npm run watch`
File watcher that re-runs build on changes.
- Does NOT start a dev server (just rebuilds files).
- Useful if you have another server or want to manually check output.

### `npm run test:e2e`
Runs Playwright E2E tests using a custom test runner.
- Tests visual rendering, links, metadata, print styles, etc.
- See `tests/` for test files.

## Deployment

### Cloudflare Pages

This site is deployed to Cloudflare Pages via GitHub integration.

**Build Configuration:**
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node.js Version**: 20.x (default)

**How It Works:**
1. Push to GitHub.
2. Cloudflare Pages detects the push.
3. Runs `npm run build`.
4. Uploads `dist/index.html` (the only file needed).
5. Serves at `leandrofernandez.dev`.

**Custom Domain:**
Configured via Cloudflare Dashboard to point to `leandrofernandez.dev`.

## Development Workflow

### Local Development
```bash
npm install
npm run start
# Opens http://localhost:3000
# Edit index.html or content.json → auto-rebuild + reload
```

### Add or Update Content
1. Edit `content.json` (JSON structure preserved).
2. Run `npm run start` or `npm run build`.
3. Check `dist/index.html` for rendered output.
4. Commit and push.
5. Cloudflare Pages auto-deploys.

### Testing
```bash
npm run test:e2e
```

Verifies:
- Page renders correctly
- All template placeholders are replaced
- Links are valid
- Print styles work (for PDF export)

## Configuration

All template placeholders and their values are defined in `content.json`:
- **Metadata**: title, description, OG tags, Twitter cards
- **Personal Info**: name, title, location, email, links
- **Content Sections**: about, education, experience, footer
- **Navigation**: labels and section links

Edit `content.json` to update any of these without touching HTML.

## SDD Workflow

This project uses **Spec-Driven Development (SDD)** for changes:

- **Proposal**: Intent, scope, and approach
- **Spec**: Requirements and scenarios
- **Design**: Architecture and implementation approach
- **Tasks**: Breakdown into work units
- **Apply**: Implement and commit
- **Verify**: Run tests and confirm
- **Archive**: Sync specs and record the change

See `openspec/` for all SDD documentation:
- `openspec/config.yaml` — Project configuration
- `openspec/specs/` — Source of truth for features
- `openspec/changes/` — In-flight and archived changes

## Recent PRs (Merged without SDD)

The following PRs were merged without going through the SDD process. Retrospective documentation has been added to `openspec/changes/archive/`:

- **#18**: `remove-motivations` — Redesign experience section with cards, add watch mode, remove motivation section
- **#17**: `add-axa-partners` — Add AXA Partners as current employer
- **#16**: `text-replacement-system` — Static text replacement system with content.json
- **#15**: `layout-adjustments` — Fix margin and header layout
- **#14**: `setup-cloudflare-pages-deploy` — wrangler.jsonc configuration
- **#13**: `setup-cloudflare-pages-deploy` — Build script for Cloudflare Pages

See `openspec/changes/archive/` for details on each change.

## License

ISC
