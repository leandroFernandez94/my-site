# Apply Progress — resolve-issue-23-worktree

## Metadata
- Mode: Standard
- Delivery strategy: ask-always
- Workload mode: single PR (budget risk: Low)
- Worktree: `/home/leandro/projects/my-site-issue-23`
- Branch: `fix/hide-card-mobile`

## Completed Tasks
- [x] 1.1 Edit `index.html`: Locate the `<style>` block containing the `.experience-card` class definitions.
- [x] 1.2 Edit `index.html`: Add a `@media (max-width: 767px)` rule targeting `.experience-card`.
- [x] 1.3 Edit `index.html`: Inside the media query, set `border-width: 0 !important`, `border-radius: 0 !important`, `box-shadow: none !important`, and `padding: 0 !important` to ensure override of Tailwind CDN classes.
- [x] 2.1 Create Playwright test file for experience card responsive behavior.
- [x] 2.2 Add desktop test (>=768px) asserting card chrome is present.
- [x] 2.3 Add mobile test (375px) asserting card chrome is flattened.
- [x] 2.4 Add breakpoint boundary test (375px -> 768px) asserting chrome returns.
- [x] 2.5 Execute `npx playwright test`.

## Files Changed
- `index.html` — added mobile media-query override for `.experience-card` with `!important` declarations.
- `tests/experience-card.spec.js` — added Playwright tests covering desktop, mobile flattening, and resize boundary behavior.
- `openspec/changes/resolve-issue-23-worktree/tasks.md` — marked all 8 tasks as completed.

## Verification
- Command: `npx playwright test tests/experience-card.spec.js`
  - Result: ✅ 3 passed
- Command: `npx playwright test`
  - Result: ✅ 3 passed

## Deviations
- None — implementation follows spec/proposal behavior for mobile flattening and desktop preservation.

## Remaining
- No remaining apply tasks.
- Ready for verify phase.
