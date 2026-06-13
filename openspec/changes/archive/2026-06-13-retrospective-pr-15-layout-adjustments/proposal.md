# Retrospective: PR #15 - layout-adjustments

**Status**: Merged without SDD (2026-06-13)  
**Commits**: 1 commit (`597d3ea`)  
**GitHub PR**: #15

## Summary

Fixed margin and header layout issues discovered during visual testing. Adjusted spacing and alignment to improve visual hierarchy.

## What Changed

### Scope
- **Bug Fix**: Margin inconsistencies in header and section spacing
- **Alignment**: Fix header layout for mobile and desktop
- **Whitespace**: Improve section gap and element padding

### Files Modified
- `index.html` — CSS class adjustments and spacing tweaks

### Specific Changes
- Adjusted header margin-bottom (`mb-8 md:mb-12 lg:mb-16`)
- Fixed section margins and gaps
- Ensured responsive spacing works correctly on mobile

## Why This Wasn't SDD

This was a quick layout fix during design iteration. The changes were:
- Visual only (no HTML structure changes)
- Low risk (margins and spacing)
- Immediately verifiable (screenshot comparison)
- Part of rapid design iteration cycle

## Learned

- **Responsive spacing**: Tailwind's responsive modifiers (md:, lg:) are essential for layout consistency
- **Section spacing**: 8rem for section-gap in desktop, reduced on mobile improves readability
- **Print styles**: Layout fixes need to account for print stylesheet rules

## Recommendation

For future layout fixes:
1. Create visual specs in design.md (exact spacing values, breakpoints)
2. Document the "before/after" layouts
3. Include test cases (how to verify the fix visually)

Minor spacing tweaks can be bundled as "layout adjustment" tasks in a larger change, rather than standalone PRs.
