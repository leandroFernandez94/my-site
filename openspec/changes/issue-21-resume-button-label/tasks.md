# Tasks: quiero que resuelvas el issue 21 en un worktree

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | < 10 lines |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | single PR |
| Delivery strategy | ask-always |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Update resume button label | PR 1 | Single PR targeting main |

## Phase 1: Setup

- [x] 1.1 Create worktree using command: `git worktree add /home/leandro/projects/my-site-issue-21 -b fix/issue-21-resume-button-label main`
- [x] 1.2 Navigate to the newly created worktree directory.

## Phase 2: Core

- [x] 2.1 Modify `content.json` to change the value of the `downloadCv` key from "Download CV" to "Download Resume" (or equivalent instances mentioned in the spec).

## Phase 3: Verification

- [x] 3.1 Run build or serve locally to verify there are no errors.
- [x] 3.2 Visually confirm in the browser that the download button displays "Download Resume".

## Phase 4: Delivery

- [x] 4.1 Stage and commit `content.json` using conventional commits (e.g. `feat: change CV download button label to 'Resume'`).
- [x] 4.2 Push branch and create a Pull Request against `main`.
