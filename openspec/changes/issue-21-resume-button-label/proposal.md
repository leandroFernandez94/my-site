# Proposal: Issue 21 — Change CV download button label to 'Resume'

## Intent

The navbar button currently reads "Download CV" but should read "Download Resume". This aligns the label with industry-standard terminology ("Resume" over "CV") as requested in Issue 21.

## Scope

### In Scope
- Change `content.json:37` — `"downloadCv": "Download CV"` → `"downloadCv": "Download Resume"`
- Update delta spec for `static-cv-page` to correct 2 "Download CV" references (lines 11, 29) to "Download Resume"
- Work in an isolated git worktree: `fix/issue-21-resume-button-label` from `main`

### Out of Scope
- Renaming the JSON key `downloadCv` (internal identifier, no user impact)
- Changing other "CV" occurrences in `content.json` (browser title, OG, Twitter card)
- Changing the button's `window.print()` behavior
- Adding automated test coverage for the label text

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `static-cv-page`: Navigation Bar requirement changes the button label from "Download CV" to "Download Resume". The 320px viewport scenario references the button by name and MUST be updated to match.

## Approach

Single-line text edit in `content.json`. The JSON key name `downloadCv` stays unchanged — it's an internal identifier consumed by `{{nav.downloadCv}}` in `index.html`. The build-time replacement (`scripts/replace.js`) resolves the key via dot notation, so only the value matters. No HTML, script, or structural changes required. A delta spec updates the two "Download CV" references in the Navigation Bar requirement to "Download Resume".

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `content.json:37` | Modified | Button label value `"Download CV"` → `"Download Resume"` |
| `openspec/specs/static-cv-page/spec.md` | Modified (delta) | 2 references to "Download CV" updated to "Download Resume" |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Spec drift — main spec still says "Download CV" after deploy | High | Delta spec in this change corrects both references |
| Key/value semantic mismatch (`downloadCv` key holds "Resume" value) | Low | Internal identifier, no user impact; rename deferred |
| No test validates the label text | Low | One-word text change; E2E test framework exists if needed later |

## Rollback Plan

Revert `content.json:37` back to `"downloadCv": "Download CV"` with `git revert` or `git checkout main -- content.json`. The delta spec is reverted independently since it lives in the change folder.

## Dependencies

- Git worktree at `/home/leandro/projects/my-site-issue-21` branched from `main`

## Success Criteria

- [ ] Navbar button renders "Download Resume" in the browser after build
- [ ] No `{{placeholder}}` strings remain in `dist/index.html`
- [ ] Delta spec for `static-cv-page` references "Download Resume" (not "Download CV")
- [ ] `npm run build` succeeds without errors
