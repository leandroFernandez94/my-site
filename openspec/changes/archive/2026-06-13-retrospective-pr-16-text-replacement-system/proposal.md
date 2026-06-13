# Retrospective: PR #16 - text-replacement-system

**Status**: Merged without SDD (2026-06-13)  
**Commits**: 2 commits (`3d86e43` and `e7f1aca`)  
**GitHub PR**: #16

## Summary

Implemented a static text replacement system to decouple content from HTML markup. Created `content.json` as the single source of truth for all text, links, and metadata. Added `scripts/replace.js` to handle template substitution.

## What Changed

### Scope
- **Architecture**: Implement content template system
- **Framework**: No framework — vanilla JS replacement logic
- **Content**: Extract all hardcoded text from HTML into `content.json`
- **Build Process**: Integrate replacement into build script

### Files Created
- `content.json` — JSON structure containing all text, links, metadata
- `scripts/replace.js` — Template replacement logic (finds `{{key.subkey}}` and replaces with JSON values)

### Files Modified
- `index.html` — Converted hardcoded text to `{{placeholder}}` syntax
- `scripts/build.js` — Updated to call `replace.js` during build

### How It Works
1. `scripts/replace.js` exports a function that:
   - Reads HTML string
   - Finds all `{{path.to.value}}` placeholders
   - Retrieves value from content.json using dot notation
   - Replaces placeholder with value
2. `scripts/build.js` calls this function and writes output to `dist/index.html`
3. Deploy only `dist/index.html` to Cloudflare Pages

### Benefits Realized
- **Single source of truth**: All text lives in one JSON file
- **Easy localization**: Swap content.json for different language/variant
- **A/B testing**: Support multiple content.json files without HTML changes
- **Maintainability**: Content updates don't require editing HTML
- **No runtime overhead**: Replacement happens at build time, not in browser

## Why This Wasn't SDD

This was a foundational architecture decision made quickly to unblock subsequent content updates (PRs #17, #18). The team needed:
1. A way to separate content from HTML
2. A simple, no-framework solution
3. Immediate deployment capability

Doing full SDD would have delayed the feature. However, this is EXACTLY the kind of architectural decision that SHOULD be captured in SDD retrospectively.

## Learned

- **Vanilla JS > Framework**: A simple find-and-replace function (15 lines of code) was faster and simpler than pulling in a templating library
- **Dot notation lookup**: JavaScript's ability to traverse objects with dot-notation strings (`"about.paragraph1"`) is powerful for nested JSON
- **Build-time processing**: Doing replacement at build time (not runtime) is much more efficient
- **Content versioning**: Having JSON as versioned artifacts makes it easy to track content changes in git history

## Technical Details

### Template Syntax
```
HTML: <p>{{about.heading}}</p>
JSON: { "about": { "heading": "About Me" } }
Output: <p>About Me</p>
```

### Implementation
```javascript
// From scripts/replace.js
function replaceTemplates(html, content) {
  return html.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], content);
    return value !== undefined ? value : match;
  });
}
```

## Recommendation

Document a formal spec for content.json schema:
- Required top-level keys (title, person, nav, header, sections)
- Required nested structure for each section
- Validation rules (no empty strings, required links, etc.)
- Process for deprecating unused keys (like motivations)

This template system is the foundation for all content updates and deserves formal specification.
