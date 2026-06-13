# Retrospective: PR #18 - remove-motivations

**Status**: Merged without SDD (2026-06-13)  
**Commits**: 3 commits between `ddea189` and `b8d34dc`  
**GitHub PR**: #18

## Summary

Redesigned the experience section from a text-based timeline to a card-based layout. Removed the "Things I find motivating" section. Added file watcher mode for development workflow.

## What Changed

### Scope
- **Feature**: Experience section card redesign
- **Refactor**: Remove "motivations" section from UI and content.json
- **Tooling**: Add `npm run watch` command with file watcher

### Files Modified
- `index.html` — Experience section redesigned with card markup
- `content.json` — Removed `about.motivatingHeading` and `about.motivations`
- `scripts/watch.js` — New file watcher script (created)
- `package.json` — Added "watch" script

### Key Implementation Details
- Experience items now render as `.experience-card` div blocks with border and shadow
- Each card contains company name, role, period, and accomplishments
- Motivation section (`about.motivatingHeading` + `about.motivations` in content.json) removed entirely
- Watch mode: monitors changes to `index.html` and `content.json`, re-runs build on change

## Why This Wasn't SDD

This PR was merged quickly during active development to:
1. Test the card-based UX in production
2. Iterate on layout before documenting formal specs
3. Add tooling improvement (watch mode) alongside UI changes

## Learned

- **Card layout UX**: Card-based presentation is cleaner than timeline for experience
- **Watch mode value**: File watcher mode is essential for rapid iteration on content + HTML
- **Content structure**: Removing unused content sections from content.json simplifies the template (no dead code in JSON)
- **Batch changes**: UX redesign + tooling improvement + content refactor should have been broken into separate PRs/changes

## Recommendation

Document a formal spec for:
- Experience section card design (spacing, colors, responsive behavior)
- Watch mode expected behavior (file patterns, debouncing, rebuild logic)
- Content JSON structure rules (how to remove deprecated sections cleanly)

For next iteration, use SDD proposal → spec → design → apply → verify cycle to avoid surprises.
