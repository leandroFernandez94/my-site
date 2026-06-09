# Proposal: Fix Mobile Navbar Overflow & Timeline Alignment

## Intent

Fix horizontal scroll on iOS mobile viewports and timeline left-alignment imbalance. The fixed navbar overflows viewports ≤430px (~419px fixed content), and timeline items sit 33px right of the baseline set by other content sections due to asymmetric padding from the vertical line decoration.

## Scope

### In Scope
- Prevent horizontal scrollbar on viewports ≥320px
- Make navbar links adapt to narrow viewports without overflow
- Center timeline content visually balanced with the rest of the page
- Add `overflow-x: hidden` guard on `html, body`

### Out of Scope
- Hamburger/mobile menu (deferred complexity)
- Pagination or content carousels
- Changes to print stylesheet

## Capabilities

### Modified Capabilities
- `static-cv-page`: Navigation Bar (mobile overflow behavior), Content Structure (timeline alignment), Responsive Layout (overflow-x guard)
- `print-stylesheet`: None affected — navbar and timeline decor already hidden in print

## Approach

Three targeted fixes in index.html:

1. **Navbar overflow**: Shrink nav links font-size on mobile (`text-xs` below 360px), reduce gap, use responsive `text-sm sm:text-sm` → smaller text on tight viewports. Avoid wrapping or hamburger to keep single-line simplicity.

2. **Timeline alignment**: Replace `pl-8` on `<ol>` with symmetric `pl-8 pr-8` (or equivalent) and adjust the dot offset from `-left-[31px]` to be relative to the content edge + dot size, centering the timeline column within the section max-width.

3. **Overflow-x guard**: Add `overflow-x: hidden` to the existing `html, body` CSS rule.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` CSS block (line 139) | Modified | Add `overflow-x: hidden` |
| `index.html` nav links div (line 222) | Modified | Responsive sizing on mobile |
| `index.html` Education timeline (line 351) | Modified | Symmetric padding + adjusted dot offset |
| `index.html` Experience timeline (line 388) | Modified | Same timeline fix |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Shrunk nav text too small to tap/read | Low | Minimum `text-xs` (12px) is sufficient; test on 320px viewport |
| Timeline padding adjustment breaks print layout | Low | Print stylesheet already strips `.timeline` padding and decorations |
| Overflow-x hidden clips legitimate horizontal content | Low | Page is single-column with max-width; no legitimate horizontal overflow exists |

## Rollback Plan

Revert the three `index.html` changes via git revert. Single file, zero database, zero config.

## Dependencies

None. Pure CSS class changes in one HTML file.

## Success Criteria

- [ ] No horizontal scrollbar on any viewport between 320px and 1100px (Chrome + Safari iOS)
- [ ] Navbar links remain tap-accessible and readable at 320px viewport
- [ ] Timeline text left edge aligns with About Me section text left edge (±4px)
- [ ] Print layout unchanged (navbar and footer hidden, timeline simplified)
- [ ] `html, body` have `overflow-x: hidden` in computed styles
