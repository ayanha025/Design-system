# Task 7 Report: Chip 컴포넌트

## Status
COMPLETE

## Commits
- `b969bbb` feat: Chip 컴포넌트 구현 (Filled/Outlined, 선택, 삭제 가능)

## Files Created
- `src/components/Chip/Chip.tsx` — component implementation
- `src/components/Chip/Chip.module.css` — CSS Modules styles using CSS Variables
- `src/components/Chip/Chip.stories.tsx` — Storybook stories (Playground + Overview)
- `src/components/Chip/index.ts` — barrel export

## Test Summary
- `npx tsc --noEmit`: PASS (zero errors, zero warnings)

## Concerns
None. All code matches the brief exactly. The component supports `filled` and `outlined` variants, `selected` state, `disabled` state with opacity and pointer suppression, and an optional close button that stops event propagation.
