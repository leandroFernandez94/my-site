# Tasks: Stitch Light Mode Redesign

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~250 lines |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-always |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Complete light-mode redesign | PR 1 | Atomic update to `index.html` (layout, fonts, print css) and SVG icons |

## Phase 1: Foundation (Head & Config)

- [x] 1.1 Update `index.html` `<head>`: Remove Nunito; add `preconnect` and `<link rel="preload" as="style">` for Geist (CDN), Hanken Grotesk, and JetBrains Mono. Preserve meta/favicon/JSON-LD verbatim.
- [x] 1.2 Update `index.html` Tailwind config `<script>`: Inject new `theme.extend` tokens (colors `#f7f9fb`, `#0051d5` etc., fontFamily, spacing, borderRadius) matching design.

## Phase 2: Core UI & Layout

- [x] 2.1 Update `index.html` top of `<body>`: Build fixed `<nav>` using glassmorphism (`backdrop-blur-md`, `bg-surface/80`) with section anchor links, "Download CV" button, and `.no-print` class.
- [x] 2.2 Update `index.html` `<header>`: Restructure into Hero layout (centered, `max-w-[1100px]`, `mx-auto`). Keep name, subtitle, bio verbatim. Remove the `<hr>` element completely.
- [x] 2.3 Modify `public/*.svg` (4 files): Replace `fill="#CF5C36"` with `fill="currentColor"`.
- [x] 2.4 Update `index.html` Hero links: Inline the updated SVGs so `currentColor` correctly applies text-color utilities on hover.

## Phase 3: Content Timelines & Footer

- [x] 3.1 Update `index.html` `#about`: Apply new spacing (`max-w-[1100px]`, `mx-auto`) and typography (`body-md/lg`). Preserve text verbatim.
- [x] 3.2 Update `index.html` `#education`: Apply CSS timeline wrappers (`border-l`, `relative`, `before:absolute` dots). Update lists to use numbered bullets.
- [x] 3.3 Update `index.html` `#experience`: Apply CSS timeline wrappers. Set the dot for the current role to use secondary color (`#0051d5`).
- [x] 3.4 Append `<footer>` before `</body>`: Add name, copyright, social links (using `#0051d5`), background `surface-container-low`, and `.no-print` class.

## Phase 4: Print Styles Verification

- [x] 4.1 Update `index.html` `<style media="print">`: Add `.no-print { display: none !important; }`. Force `white` background and `#000` text color. Add rules to simplify timeline visual decorations.
- [x] 4.2 Manual Verification: Render page in browser to verify mobile responsiveness (`max-w` clamping), print preview (nav/footer hidden, timelines simplified), and visual font load.