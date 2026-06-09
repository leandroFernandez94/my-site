# Tasks: Fix Mobile Navbar Overflow & Timeline Alignment

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~15 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | exception-ok |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Phase 1: Overflow Guard

- [x] 1.1 Add `overflow-x: hidden` to `html, body` CSS rule in `index.html` (line 139-142)

## Phase 2: Navbar Mobile Fix

- [x] 2.1 Shrink nav links font-size on viewports <400px using Tailwind breakpoints in `index.html` nav links div (line 222)
- [x] 2.2 Reduce flex `gap` on mobile in nav links div

## Phase 3: Timeline Alignment

- [x] 3.1 Add symmetric right padding to timeline `<ol>` tags — Education (line 351) and Experience (line 388)
- [x] 3.2 Adjust dot pseudo-element `-left` offset on `.timeline-item::before` to match new padding

## Phase 4: Verification

- [ ] 4.1 Verify no horizontal scrollbar at 320px, 375px, 414px viewports (Chrome DevTools)
- [ ] 4.2 Verify nav links remain readable and tap-accessible at 320px
- [ ] 4.3 Verify timeline text left edge aligns with About Me text (±4px) at 375px
- [ ] 4.4 Verify `overflow-x: hidden` present on html, body in computed styles
- [ ] 4.5 Verify print layout unchanged via print preview (navbar hidden, timeline simplified)
