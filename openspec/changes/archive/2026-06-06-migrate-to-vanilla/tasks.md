# Tasks: Migrate to Vanilla HTML + Tailwind

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1500 (mostly deletions) + ~250 additions |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (Cleanup) → PR 2 (Implementation) |
| Delivery strategy | ask-always |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Cleanup Old Stack | PR 1 | Base branch: main. Deletes all Next.js code, tooling, configs, and unused assets. Size exception possible due to mass deletions. |
| 2 | Vanilla Implementation | PR 2 | Base branch: PR 1. Adds `index.html` with Tailwind, Print CSS, and migrated content. |

## Phase 1: Cleanup

- [x] 1.1 Delete `pages/`, `components/`, `hooks/`, and `styles/` directories.
- [x] 1.2 Delete configuration and package files: `package.json`, `yarn.lock`, `node_modules/`, `next.config.js`, `tsconfig.json`, `next-env.d.ts`, `.eslintrc.json`, `opencode.json`, and `README.md`.
- [x] 1.3 Delete landing-page assets from `public/` (all except `favicon.ico`, `email.svg`, `github.svg`, `linkedinIcon.svg`, `location-pointer.svg`).
- [x] 1.4 Update `.gitignore` for a vanilla static project (remove Node.js and Next.js specific ignores).

## Phase 2: Core Implementation

- [x] 2.1 Create `index.html` skeleton with Tailwind CDN script, custom color/font config, Google Fonts preconnect/preload, SEO meta tags, and JSON-LD Person schema.
- [x] 2.2 Add `<style>` block for `@media print` rules (margins, link expansion, colors, and avoid page breaks).
- [x] 2.3 Migrate CV "Header" (with icons) and "About Me" sections from original code into `index.html` using semantic HTML5 and Tailwind utility classes.
- [x] 2.4 Migrate CV "Education" and "Experience" sections from original code into `index.html` using Tailwind spacing and typography classes.

## Phase 3: Verification

- [x] 3.1 Validate HTML5 structure and JSON-LD schema correctness.
- [x] 3.2 Open `index.html` in browser to verify responsive layout, typography, and image loading.
- [x] 3.3 Verify print layout via browser print preview (Ctrl+P) to ensure margins, URL expansion, and grayscale readability match the print spec.
