# Retrospective: PR #13 - setup-cloudflare-pages-deploy (build script)

**Status**: Merged without SDD (2026-06-13)  
**Commits**: 1 commit (`7cf8b79`)  
**GitHub PR**: #13

## Summary

Created the initial build script (`scripts/build.js`) to support Cloudflare Pages static deployment. This was the foundation for the text replacement system.

## What Changed

### Scope
- **Build Process**: Add Node.js script to prepare static output
- **Output Directory**: Generate `dist/index.html` for Cloudflare Pages
- **Deployment**: Enable CI/CD integration with Cloudflare Pages

### Files Created
- `scripts/build.js` — Build script that reads `index.html` and produces `dist/index.html`

### How It Works
1. Reads `index.html`
2. (Later enhanced with text replacement in PR #16)
3. Writes output to `dist/index.html`
4. Cloudflare Pages serves from `dist/` directory

### Integration with Cloudflare Pages
- Build Command: `npm run build`
- Publish Directory: `dist`
- On every push to GitHub, Cloudflare Pages runs this script

## Why This Wasn't SDD

This was infrastructure setup work to enable the deployment pipeline. At the time:
- The team was establishing the deployment strategy
- The script was minimal (copying file from one location to another)
- Formal specs seemed unnecessary for tooling scaffolding

In retrospect, this SHOULD have been part of the initial SDD cycle because it establishes the build contract.

## Learned

- **Build output directory**: Separating `dist/` from source improves project organization
- **Deployment contract**: Having a clear build command and output directory makes CI/CD setup trivial
- **Script growth**: This simple script later became the foundation for text replacement (PR #16)
- **npm scripts**: Using `"build"` as a standard npm script is convention that every tool understands

## Implementation Details

### Original build.js (PR #13)
```javascript
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index.html');
const distDir = path.join(__dirname, '../dist');
const html = fs.readFileSync(htmlPath, 'utf-8');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

fs.writeFileSync(path.join(distDir, 'index.html'), html);
console.log('Build complete: dist/index.html');
```

### Later Enhanced (PR #16)
Added text replacement logic to this script via `scripts/replace.js`.

## Recommendation

Document the build process in README.md (now done) and establish:
- Build command signature: `npm run build` produces output in `dist/`
- Build output expectations: Only `dist/index.html` is deployed (no CSS, JS files needed)
- Build integrity: Verify that all template replacements occur and no placeholders remain
- Local verification: How to inspect `dist/index.html` before committing

The build system is the backbone of this project and deserves clear specification.
