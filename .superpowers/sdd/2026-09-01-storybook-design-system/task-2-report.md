# Task 2 Report: Design Token System

## Status
COMPLETE

## Commits
- `aad66d1` — feat: add design token system (Task 2)
  - 10 files changed, 472 insertions(+), 1 deletion(-)

## What Was Done

### Files Created
- `src/tokens/color.json` — primitive colors (base, neutral, red, orange, yellow, green, blue) + semantic colors (label, state, bg, primary, secondary, tertiary, border)
- `src/tokens/typography.json` — font family, weights, sizes, line heights, letter spacing, named text styles
- `src/tokens/spacing.json` — 13 spacing steps (0px–64px)
- `src/tokens/radius.json` — 6 radius values (xs–full)
- `src/tokens/shadow.json` — 3 shadow levels (sm, md, lg)
- `src/scripts/build-tokens.js` — Node.js ESM script that reads all JSON token files and generates tokens.css
- `src/styles/tokens.css` — generated CSS with 159 lines including Pretendard CDN import and all CSS custom properties

### Files Modified
- `package.json` — added `"build-tokens": "node src/scripts/build-tokens.js"` to scripts
- `.storybook/preview.ts` — added `import '../src/styles/tokens.css'` at top
- `src/main.tsx` — added `import './styles/tokens.css'` at top

## Test Summary

- `npm run build-tokens` ran successfully and generated `src/styles/tokens.css`
- tokens.css verified: 159 lines, contains Pretendard CDN @import, all 5 token groups with correct CSS variable naming convention
- Color naming: `--color-{group}-{name}` (e.g., `--color-neutral-50`, `--color-primary-default`)
- Typography naming: `--font-size-{n}`, `--font-weight-{name}`, `--line-height-{n}`
- Spacing naming: `--spacing-{n}`
- Radius naming: `--radius-{name}`
- Shadow naming: `--shadow-{name}`
- All semantic color values output as resolved hex values (no var() references)

## Concerns
- None. All token values match the brief exactly. The build script uses ESM (import/export) consistent with the project's `"type": "module"` in package.json.
