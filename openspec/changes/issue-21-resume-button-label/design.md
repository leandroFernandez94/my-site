# Design: issue-21-resume-button-label

## Technical Approach

The overall strategy is to modify the localized string values in `content.json` while retaining the existing JSON keys. The site uses a simple Node.js template replacement script (`scripts/replace.js`) to parse `content.json` and replace `{{nav.downloadCv}}` placeholders in `index.html`. By editing `content.json` on line 37 to have the value "Download Resume", the build step will automatically populate `index.html` with the new button label.

## Architecture Decisions

### Decision: Update JSON Value vs Adding New Key

**Choice**: Modify the value of the existing `nav.downloadCv` key to "Download Resume".
**Alternatives considered**: Add a new key `nav.downloadResume` to `content.json` and change the reference in `index.html` to `{{nav.downloadResume}}`.
**Rationale**: `downloadCv` acts as an internal identifier for the "download document" action within the site's data model. The label presented to the user is presentation data. Changing the key name adds unnecessary churn to both `content.json` and `index.html`. Changing only the value correctly updates the presentation without touching the template structure.

## Data Flow

Data flows from the JSON content file into the HTML template during the build step:

    content.json ("Download Resume") ──→ replace.js ──→ index.html (Output)

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `content.json` | Modify | Update `nav.downloadCv` from "Download CV" to "Download Resume" |

## Interfaces / Contracts

No new interfaces or API contracts are being introduced. The structure of `content.json` remains identical.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Manual | Build Output | Run the build script and verify the resulting HTML contains "Download Resume" in the navigation button. |
| Manual | Browser | Open the generated site in a browser and verify the button in the header visually reflects the new label and still triggers the `window.print()` action. |

## Migration / Rollout

No migration required. The change will be deployed alongside the next static build of the site.

## Open Questions

None
