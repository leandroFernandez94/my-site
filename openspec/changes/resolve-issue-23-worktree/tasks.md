# Tasks: resolve-issue-23-worktree

## Review Workload Forecast

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: stacked-to-main
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | CSS styling and E2E Tests | PR 1 | <100 lines total (CSS + Playwright) |

## Phase 1: Core Implementation

- [x] 1.1 Edit `index.html`: Locate the `<style>` block containing the `.experience-card` class definitions.
- [x] 1.2 Edit `index.html`: Add a `@media (max-width: 767px)` rule targeting `.experience-card`.
- [x] 1.3 Edit `index.html`: Inside the media query, set `border-width: 0 !important`, `border-radius: 0 !important`, `box-shadow: none !important`, and `padding: 0 !important` to ensure the override of Tailwind CDN classes.

## Phase 2: Testing / Verification

- [x] 2.1 Create Playwright test file (e.g., `tests/experience-card.spec.ts`) if it doesn't exist, or edit an existing relevant test suite.
- [x] 2.2 Add Test: Verify "Experience card renders with chrome on desktop" (viewport width ≥768px) and asserts computed properties.
- [x] 2.3 Add Test: Verify "Experience card flattens on mobile" (viewport width 375px) ensuring border 0, radius 0, shadow none, and padding 0.
- [x] 2.4 Add Test: Verify "Card chrome returns at breakpoint boundary" (resize viewport from 375px to 768px and assert properties return).
- [x] 2.5 Execute `npx playwright test` to verify changes align with the spec scenarios.
