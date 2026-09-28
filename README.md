# TMT Design System

Figma에서 설계한 **TMT Design System**을 React 컴포넌트로 구현하고, Storybook으로 문서화한 프로젝트입니다.

> 디자이너가 디자인시스템의 코드 구현체까지 직접 관리하고 검증할 수 있다는 것을 보여주기 위해 만들었습니다.

**🔗 Storybook:** https://main--6a96866e6a4c3bada40f7c67.chromatic.com

---

## 목표

1. **Storybook 구축** — Figma 컴포넌트를 실제로 동작하는 코드로 구현하고, 인터랙티브 카탈로그로 문서화
2. **Figma ↔ Code 토큰 연동** — Figma Variables와 코드 토큰이 1:1로 대응하는 변환 파이프라인 구축

## 토큰 파이프라인

```
Figma Variables
   ↓  (JSON으로 옮김)
src/tokens/*.json
   ↓  npm run build-tokens
src/styles/tokens.css   ← CSS Variables
   ↓  var(--token)
React 컴포넌트 (CSS Modules)
   ↓
Storybook → Chromatic 배포
```

토큰 값은 **JSON 한 곳에서만** 수정합니다. `tokens.css`는 스크립트가 자동으로 생성하므로 직접 수정하지 않습니다.
컴포넌트 CSS는 색상·간격·폰트 값을 직접 쓰지 않고 모두 `var(--token)`으로 참조하므로, 토큰을 바꾸면 전체 컴포넌트에 한 번에 반영됩니다.

## 디자인 토큰

| 파일 | 내용 | CSS 변수 예시 |
|---|---|---|
| `color.json` | **Primitive**: neutral, red, orange, yellow, green, blue (50–900)<br>**Semantic**: label, bg, border, state, primary/secondary/tertiary, transparent(20·84) | `--color-orange-600`<br>`--color-primary-default` |
| `typography.json` | Pretendard / 굵기 400·500·700 / 크기 12–28px / 텍스트 스타일(heading, body) | `--font-size-16`<br>`--font-weight-bold` |
| `spacing.json` | 0–64px 스케일 | `--spacing-16` |
| `radius.json` | xs(4) · sm(8) · md(12) · lg(16) · xl(20) · full | `--radius-md` |
| `shadow.json` | sm · md · lg · toast | `--shadow-md` |

컬러는 **Primitive → Semantic** 2단계 구조입니다. 컴포넌트는 Semantic 토큰(`primary`, `label`, `bg` 등)만 사용하므로, 브랜드 컬러를 바꿀 때 Semantic 값만 수정하면 됩니다.

## 컴포넌트

| 컴포넌트 | 주요 옵션 |
|---|---|
| **Button** | `variant`: primary · secondary · tertiary / `size`: small · medium · large / `disabled` |
| **TextField** | `label`, `placeholder`, `error`, `helperText`, `disabled` |
| **SelectField** | `options`, `placeholder`, `error`, `helperText`, `disabled` |
| **SearchField** | `placeholder`, 클리어 버튼(`onClear`), `disabled` |
| **Checkbox** | `checked`, `label`, `disabled` |
| **Radio** | `checked`, `label`, `name`, `value`, `disabled` |
| **Chip** | `variant`: filled · outlined / `selected`, 삭제(`onClose`), `disabled` |
| **ProgressBar** | `value`(0–100), `showLabel` |
| **Toast** | `type`: success · warning · error / `message`, `description`(서브 텍스트), `icon` |
| **Modal** | `isOpen`, `title`, `footer`, `onClose` |
| **BottomSheet** | `isOpen`, `title`, `footer`, `onClose` |

## 기술 스택

- React 18 · TypeScript · Vite
- Storybook 8
- CSS Modules + CSS Variables
- Chromatic (Storybook 배포 · 비주얼 회귀 테스트)

## 폴더 구조

```
src/
├── tokens/              # 디자인 토큰 원본 (JSON)
├── scripts/
│   └── build-tokens.js  # JSON → CSS Variables 변환
├── styles/
│   └── tokens.css       # 자동 생성 (직접 수정 X)
└── components/
    └── Button/
        ├── Button.tsx
        ├── Button.module.css
        ├── Button.stories.tsx
        └── index.ts
```

## 실행 방법

```bash
npm install --legacy-peer-deps

npm run storybook      # 로컬 Storybook (http://localhost:6006)
npm run build-tokens   # 토큰 JSON 수정 후 tokens.css 재생성
npm run chromatic      # Chromatic 배포 (CHROMATIC_PROJECT_TOKEN 환경변수 필요)
```

## 작업 흐름 예시: 메인 컬러 변경

1. `src/tokens/color.json`에서 `semantic.primary` 값을 수정 (예: red-600 → orange-600)
2. `npm run build-tokens`로 `tokens.css` 재생성
3. `npm run chromatic`으로 배포
4. Chromatic에서 변경된 컴포넌트의 Before/After를 확인하고 **Accept**
