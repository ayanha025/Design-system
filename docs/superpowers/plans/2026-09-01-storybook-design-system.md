# TMT Design System Storybook 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Figma TMT Design System의 토큰과 컴포넌트를 React + Storybook으로 구현하여 브라우저에서 작동하는 디자인시스템 카탈로그를 만든다.

**Architecture:** Figma Variables를 JSON 토큰 파일로 정의하고, Node.js 변환 스크립트가 이를 CSS Variables로 자동 변환한다. React 컴포넌트는 CSS Variables를 사용하여 스타일링하며, Storybook에서 인터랙티브하게 확인할 수 있다.

**Tech Stack:** Vite, React 18, TypeScript, CSS Modules, Storybook 8, Node.js

**Spec:** `docs/superpowers/specs/2026-09-01-storybook-design-system-design.md`

## Global Constraints

- Node.js 18+
- 폰트: Pretendard (Google Fonts CDN)
- Figma 토큰 이름과 CSS Variable 이름이 1:1 대응해야 함
- 테스트 프레임워크 없음 — Storybook에서 시각적 검증
- CSS Modules 사용 (`.module.css`)
- 모든 컴포넌트는 CSS Variables(토큰)만 사용하여 스타일링

---

### Task 1: 프로젝트 초기 세팅 (Vite + React + TypeScript + Storybook)

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/vite-env.d.ts`
- Create: `.storybook/main.ts`
- Create: `.storybook/preview.ts`
- Create: `.gitignore`

**Interfaces:**
- Consumes: 없음 (첫 번째 태스크)
- Produces: 동작하는 Vite + React + Storybook 개발 환경

- [ ] **Step 1: Vite + React + TypeScript 프로젝트 생성**

```bash
cd "/Users/hunet/Desktop/스토리북 제작_ver2"
npm create vite@latest . -- --template react-ts
```

프롬프트가 나오면 현재 디렉토리에 설치 선택.

- [ ] **Step 2: 의존성 설치**

```bash
npm install
```

- [ ] **Step 3: Storybook 설치**

```bash
npx storybook@latest init --type react
```

자동으로 `.storybook/` 폴더와 기본 설정이 생성됨. 기본 예제 stories 폴더가 생기면 삭제.

- [ ] **Step 4: 기본 예제 파일 정리**

`src/stories/` 폴더가 생겼다면 삭제:

```bash
rm -rf src/stories
```

`src/App.css`의 기본 내용을 비우고, `src/App.tsx`를 최소 코드로 교체:

```tsx
// src/App.tsx
function App() {
  return <div>TMT Design System</div>
}
export default App
```

- [ ] **Step 5: .storybook/preview.ts에서 토큰 CSS를 전역 import하도록 준비**

```ts
// .storybook/preview.ts
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
```

- [ ] **Step 6: Storybook 실행하여 정상 동작 확인**

```bash
npm run storybook
```

브라우저에서 Storybook이 열리면 성공 (컴포넌트 없이 빈 상태).

- [ ] **Step 7: 커밋**

```bash
git init
git add .
git commit -m "chore: Vite + React + TypeScript + Storybook 초기 세팅"
```

---

### Task 2: 디자인 토큰 시스템 구축 (JSON → CSS Variables)

**Files:**
- Create: `src/tokens/color.json`
- Create: `src/tokens/typography.json`
- Create: `src/tokens/spacing.json`
- Create: `src/tokens/radius.json`
- Create: `src/tokens/shadow.json`
- Create: `src/scripts/build-tokens.js`
- Create: `src/styles/tokens.css`

**Interfaces:**
- Consumes: Task 1의 동작하는 프로젝트 환경
- Produces: `src/styles/tokens.css` (모든 컴포넌트가 사용할 CSS Variables), `npm run build-tokens` 명령어

- [ ] **Step 1: color.json 작성**

Figma TMT Design System의 Primitive + Semantic 컬러 토큰. 값은 Figma Color 페이지에서 확인한 실제 값:

```json
{
  "primitive": {
    "base": {
      "black": "#000000",
      "white": "#FFFFFF"
    },
    "neutral": {
      "50": "#FAFAFA",
      "100": "#F5F5F5",
      "200": "#E5E5E5",
      "300": "#D4D4D4",
      "400": "#A3A3A3",
      "500": "#737373",
      "600": "#525252",
      "700": "#404040",
      "800": "#262626",
      "900": "#171717"
    },
    "red": {
      "50": "#FEF2F2",
      "100": "#FEE2E2",
      "200": "#FECACA",
      "300": "#FCA5A5",
      "400": "#F87171",
      "500": "#EF4444",
      "600": "#DC2626",
      "700": "#B91C1C",
      "800": "#991B1B",
      "900": "#7F1D1D"
    },
    "orange": {
      "50": "#FFF7ED",
      "100": "#FFEDD5",
      "200": "#FED7AA",
      "300": "#FDBA74",
      "400": "#FB923C",
      "500": "#F97316",
      "600": "#EA580C",
      "700": "#C2410C",
      "800": "#9A3412",
      "900": "#7C2D12"
    },
    "yellow": {
      "50": "#FEFCE8",
      "100": "#FEF9C3",
      "200": "#FEF08A",
      "300": "#FDE047",
      "400": "#FACC15",
      "500": "#EAB308",
      "600": "#CA8A04",
      "700": "#A16207",
      "800": "#854D0E",
      "900": "#713F12"
    },
    "green": {
      "50": "#F0FDF4",
      "100": "#DCFCE7",
      "200": "#BBF7D0",
      "300": "#86EFAC",
      "400": "#4ADE80",
      "500": "#22C55E",
      "600": "#16A34A",
      "700": "#15803D",
      "800": "#166534",
      "900": "#14532D"
    },
    "blue": {
      "50": "#EFF6FF",
      "100": "#DBEAFE",
      "200": "#BFDBFE",
      "300": "#93C5FD",
      "400": "#60A5FA",
      "500": "#3B82F6",
      "600": "#2563EB",
      "700": "#1D4ED8",
      "800": "#1E40AF",
      "900": "#1E3A8A"
    }
  },
  "semantic": {
    "label": {
      "primary": "#171717",
      "secondary": "#404040",
      "tertiary": "#737373",
      "disabled": "#A3A3A3",
      "inverse": "#FFFFFF"
    },
    "state": {
      "info": "#3B82F6",
      "info-strong": "#1E40AF",
      "info-weak": "#EFF6FF",
      "warning": "#FAC515",
      "warning-strong": "#A16207",
      "warning-weak": "#FEFCE8",
      "success": "#22C55E",
      "success-strong": "#166534",
      "success-weak": "#F0FDF4",
      "error": "#EF4444",
      "error-strong": "#991B1B",
      "error-weak": "#FEF2F2"
    },
    "bg": {
      "primary": "#FFFFFF",
      "secondary": "#F5F5F5",
      "tertiary": "#E5E5E5",
      "disabled": "#D4D4D4",
      "selected": "#FEFEFE",
      "selected-hovered": "#F3E2E0",
      "selected-pressed": "#FBCBC7"
    },
    "primary": {
      "default": "#DC2626",
      "hovered": "#B91C1C",
      "pressed": "#991B1B"
    },
    "secondary": {
      "default": "#404040",
      "hovered": "#262626",
      "pressed": "#171717"
    },
    "tertiary": {
      "default": "#F5F5F5",
      "hovered": "#E5E5E5",
      "pressed": "#D4D4D4"
    },
    "border": {
      "primary": "#D4D4D4",
      "secondary": "#E5E5E5",
      "tertiary": "#F5F5F5",
      "disabled": "#A3A3A3",
      "interactive-primary": "#404040",
      "interactive-primary-hovered": "#A3A3A3",
      "interactive-primary-pressed": "#737373"
    }
  }
}
```

- [ ] **Step 2: typography.json 작성**

Figma Typography 페이지의 Pretendard 기반 타이포그래피 토큰:

```json
{
  "fontFamily": "Pretendard",
  "fontWeight": {
    "regular": 400,
    "medium": 500,
    "bold": 700
  },
  "fontSize": {
    "12": "12px",
    "14": "14px",
    "16": "16px",
    "18": "18px",
    "20": "20px",
    "24": "24px",
    "28": "28px"
  },
  "lineHeight": {
    "18": "18px",
    "20": "20px",
    "24": "24px",
    "26": "26px",
    "28": "28px",
    "34": "34px",
    "38": "38px"
  },
  "letterSpacing": "-0.2px",
  "styles": {
    "heading-xl": { "fontSize": "28px", "fontWeight": 700, "lineHeight": "38px" },
    "heading-lg": { "fontSize": "24px", "fontWeight": 700, "lineHeight": "34px" },
    "heading-md": { "fontSize": "20px", "fontWeight": 700, "lineHeight": "28px" },
    "heading-sm": { "fontSize": "18px", "fontWeight": 700, "lineHeight": "26px" },
    "body-lg-bold": { "fontSize": "16px", "fontWeight": 700, "lineHeight": "24px" },
    "body-lg-medium": { "fontSize": "16px", "fontWeight": 500, "lineHeight": "24px" },
    "body-lg-regular": { "fontSize": "16px", "fontWeight": 400, "lineHeight": "24px" },
    "body-md-bold": { "fontSize": "14px", "fontWeight": 700, "lineHeight": "20px" },
    "body-md-medium": { "fontSize": "14px", "fontWeight": 500, "lineHeight": "20px" },
    "body-md-regular": { "fontSize": "14px", "fontWeight": 400, "lineHeight": "20px" },
    "body-sm-bold": { "fontSize": "12px", "fontWeight": 700, "lineHeight": "18px" },
    "body-sm-medium": { "fontSize": "12px", "fontWeight": 500, "lineHeight": "18px" },
    "body-sm-regular": { "fontSize": "12px", "fontWeight": 400, "lineHeight": "18px" }
  }
}
```

- [ ] **Step 3: spacing.json 작성**

Figma Spacing 페이지의 Appearance/spacing 토큰:

```json
{
  "0": "0px",
  "1": "1px",
  "2": "2px",
  "4": "4px",
  "8": "8px",
  "12": "12px",
  "16": "16px",
  "20": "20px",
  "24": "24px",
  "32": "32px",
  "40": "40px",
  "48": "48px",
  "64": "64px"
}
```

- [ ] **Step 4: radius.json 작성**

Figma Radius 페이지의 Appearance/border/radius 토큰:

```json
{
  "xs": "4px",
  "sm": "8px",
  "md": "12px",
  "lg": "16px",
  "xl": "20px",
  "full": "9999px"
}
```

- [ ] **Step 5: shadow.json 작성**

Figma Elevation/Shadow 페이지의 그림자 토큰:

```json
{
  "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
}
```

- [ ] **Step 6: build-tokens.js 변환 스크립트 작성**

```js
// src/scripts/build-tokens.js
const fs = require('fs');
const path = require('path');

const tokensDir = path.join(__dirname, '..', 'tokens');
const outputPath = path.join(__dirname, '..', 'styles', 'tokens.css');

// JSON 파일 읽기
const color = JSON.parse(fs.readFileSync(path.join(tokensDir, 'color.json'), 'utf8'));
const typography = JSON.parse(fs.readFileSync(path.join(tokensDir, 'typography.json'), 'utf8'));
const spacing = JSON.parse(fs.readFileSync(path.join(tokensDir, 'spacing.json'), 'utf8'));
const radius = JSON.parse(fs.readFileSync(path.join(tokensDir, 'radius.json'), 'utf8'));
const shadow = JSON.parse(fs.readFileSync(path.join(tokensDir, 'shadow.json'), 'utf8'));

let css = '/* Auto-generated by build-tokens.js — DO NOT EDIT MANUALLY */\n';
css += '/* Figma TMT Design System tokens → CSS Variables */\n\n';

css += '@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");\n\n';

css += ':root {\n';

// Color - Primitive
css += '  /* Color - Primitive - Base */\n';
for (const [name, value] of Object.entries(color.primitive.base)) {
  css += `  --color-base-${name}: ${value};\n`;
}

css += '\n  /* Color - Primitive - Neutral */\n';
for (const [scale, value] of Object.entries(color.primitive.neutral)) {
  css += `  --color-neutral-${scale}: ${value};\n`;
}

const colorGroups = ['red', 'orange', 'yellow', 'green', 'blue'];
for (const group of colorGroups) {
  css += `\n  /* Color - Primitive - ${group.charAt(0).toUpperCase() + group.slice(1)} */\n`;
  for (const [scale, value] of Object.entries(color.primitive[group])) {
    css += `  --color-${group}-${scale}: ${value};\n`;
  }
}

// Color - Semantic
const semanticGroups = ['label', 'state', 'bg', 'primary', 'secondary', 'tertiary', 'border'];
for (const group of semanticGroups) {
  css += `\n  /* Color - Semantic - ${group.charAt(0).toUpperCase() + group.slice(1)} */\n`;
  for (const [name, value] of Object.entries(color.semantic[group])) {
    css += `  --color-${group}-${name}: ${value};\n`;
  }
}

// Typography
css += '\n  /* Typography */\n';
css += `  --font-family: '${typography.fontFamily}', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;\n`;
css += `  --font-weight-regular: ${typography.fontWeight.regular};\n`;
css += `  --font-weight-medium: ${typography.fontWeight.medium};\n`;
css += `  --font-weight-bold: ${typography.fontWeight.bold};\n`;
css += `  --letter-spacing: ${typography.letterSpacing};\n`;

css += '\n  /* Typography - Font Size */\n';
for (const [size, value] of Object.entries(typography.fontSize)) {
  css += `  --font-size-${size}: ${value};\n`;
}

css += '\n  /* Typography - Line Height */\n';
for (const [size, value] of Object.entries(typography.lineHeight)) {
  css += `  --line-height-${size}: ${value};\n`;
}

// Spacing
css += '\n  /* Spacing */\n';
for (const [size, value] of Object.entries(spacing)) {
  css += `  --spacing-${size}: ${value};\n`;
}

// Radius
css += '\n  /* Radius */\n';
for (const [size, value] of Object.entries(radius)) {
  css += `  --radius-${size}: ${value};\n`;
}

// Shadow
css += '\n  /* Shadow */\n';
for (const [size, value] of Object.entries(shadow)) {
  css += `  --shadow-${size}: ${value};\n`;
}

css += '}\n';

// Ensure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, css, 'utf8');
console.log(`✅ tokens.css generated at ${outputPath}`);
```

- [ ] **Step 7: package.json에 build-tokens 스크립트 추가**

`package.json`의 `"scripts"` 섹션에 추가:

```json
"build-tokens": "node src/scripts/build-tokens.js"
```

- [ ] **Step 8: 변환 스크립트 실행하여 tokens.css 생성**

```bash
npm run build-tokens
```

`src/styles/tokens.css`가 생성되었는지 확인하고, 내용이 올바른 CSS Variables인지 확인.

- [ ] **Step 9: Storybook과 앱에서 tokens.css 전역 import**

```ts
// .storybook/preview.ts
import '../src/styles/tokens.css'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
```

```tsx
// src/main.tsx
import './styles/tokens.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 10: Storybook 실행하여 토큰이 로드되는지 확인**

```bash
npm run storybook
```

브라우저 개발자 도구(F12) → Elements → `<html>` 태그에서 CSS Variables가 선언되어 있는지 확인.

- [ ] **Step 11: 커밋**

```bash
git add src/tokens/ src/scripts/ src/styles/ .storybook/preview.ts src/main.tsx package.json
git commit -m "feat: 디자인 토큰 시스템 구축 (JSON → CSS Variables 변환)"
```

---

### Task 3: Button 컴포넌트

**Files:**
- Create: `src/components/Button/Button.tsx`
- Create: `src/components/Button/Button.module.css`
- Create: `src/components/Button/Button.stories.tsx`
- Create: `src/components/Button/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css` (CSS Variables)
- Produces: `<Button>` 컴포넌트 — `variant`, `size`, `disabled`, `children` props

- [ ] **Step 1: Button.tsx 작성**

Figma Button 컴포넌트의 Variant를 Props로 매핑:
- Type(Primary/Secondary/Tertiary) → `variant` prop
- Size(Small/Medium/Large) → `size` prop
- State(Disabled) → `disabled` prop

```tsx
// src/components/Button/Button.tsx
import styles from './Button.module.css'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  const className = [
    styles.button,
    styles[variant],
    styles[size],
  ].join(' ')

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Button.module.css 작성**

CSS Variables(토큰)만 사용하여 스타일링:

```css
/* src/components/Button/Button.module.css */
.button {
  font-family: var(--font-family);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing);
  border: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color 0.15s ease, color 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

/* Variants */
.primary {
  background-color: var(--color-primary-default);
  color: var(--color-label-inverse);
}
.primary:hover:not(:disabled) {
  background-color: var(--color-primary-hovered);
}
.primary:active:not(:disabled) {
  background-color: var(--color-primary-pressed);
}

.secondary {
  background-color: var(--color-secondary-default);
  color: var(--color-label-inverse);
}
.secondary:hover:not(:disabled) {
  background-color: var(--color-secondary-hovered);
}
.secondary:active:not(:disabled) {
  background-color: var(--color-secondary-pressed);
}

.tertiary {
  background-color: var(--color-tertiary-default);
  color: var(--color-label-primary);
}
.tertiary:hover:not(:disabled) {
  background-color: var(--color-tertiary-hovered);
}
.tertiary:active:not(:disabled) {
  background-color: var(--color-tertiary-pressed);
}

/* Sizes */
.small {
  font-size: var(--font-size-12);
  line-height: var(--line-height-18);
  padding: var(--spacing-8) var(--spacing-12);
  min-height: 34px;
}

.medium {
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  padding: var(--spacing-8) var(--spacing-16);
  min-height: 40px;
}

.large {
  font-size: var(--font-size-16);
  line-height: var(--line-height-24);
  padding: var(--spacing-12) var(--spacing-24);
  min-height: 48px;
}
```

- [ ] **Step 3: index.ts barrel export 작성**

```ts
// src/components/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

- [ ] **Step 4: Button.stories.tsx 작성**

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    children: '버튼',
  },
}

export const Primary: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" size="small">Small</Button>
      <Button variant="primary" size="medium">Medium</Button>
      <Button variant="primary" size="large">Large</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
}

export const Secondary: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="secondary" size="small">Small</Button>
      <Button variant="secondary" size="medium">Medium</Button>
      <Button variant="secondary" size="large">Large</Button>
      <Button variant="secondary" disabled>Disabled</Button>
    </div>
  ),
}

export const Tertiary: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="tertiary" size="small">Small</Button>
      <Button variant="tertiary" size="medium">Medium</Button>
      <Button variant="tertiary" size="large">Large</Button>
      <Button variant="tertiary" disabled>Disabled</Button>
    </div>
  ),
}

export const AllVariants: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Primary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="medium">Medium</Button>
          <Button variant="primary" size="large">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Secondary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="secondary" size="small">Small</Button>
          <Button variant="secondary" size="medium">Medium</Button>
          <Button variant="secondary" size="large">Large</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Tertiary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="tertiary" size="small">Small</Button>
          <Button variant="tertiary" size="medium">Medium</Button>
          <Button variant="tertiary" size="large">Large</Button>
          <Button variant="tertiary" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
}
```

- [ ] **Step 5: Storybook에서 Button 확인**

```bash
npm run storybook
```

Components → Button에서 모든 Story가 올바르게 렌더링되는지 확인. Playground에서 variant, size, disabled를 바꿔보며 Figma 디자인과 비교.

- [ ] **Step 6: 커밋**

```bash
git add src/components/Button/
git commit -m "feat: Button 컴포넌트 구현 (Primary/Secondary/Tertiary, 3 sizes)"
```

---

### Task 4: TextField 컴포넌트

**Files:**
- Create: `src/components/TextField/TextField.tsx`
- Create: `src/components/TextField/TextField.module.css`
- Create: `src/components/TextField/TextField.stories.tsx`
- Create: `src/components/TextField/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`
- Produces: `<TextField>` — `label`, `placeholder`, `error`, `helperText`, `disabled`, `value`, `onChange` props

- [ ] **Step 1: TextField.tsx 작성**

```tsx
// src/components/TextField/TextField.tsx
import { useState } from 'react'
import styles from './TextField.module.css'

export interface TextFieldProps {
  label?: string
  placeholder?: string
  error?: boolean
  helperText?: string
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
}

export function TextField({
  label,
  placeholder,
  error = false,
  helperText,
  disabled = false,
  value,
  onChange,
}: TextFieldProps) {
  const [internalValue, setInternalValue] = useState(value ?? '')
  const [focused, setFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)
    onChange?.(newValue)
  }

  const inputClassName = [
    styles.input,
    error ? styles.error : '',
    focused ? styles.focused : '',
  ].join(' ')

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={inputClassName}
        placeholder={placeholder}
        disabled={disabled}
        value={internalValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {helperText && (
        <span className={error ? styles.helperError : styles.helper}>
          {helperText}
        </span>
      )}
    </div>
  )
}
```

- [ ] **Step 2: TextField.module.css 작성**

```css
/* src/components/TextField/TextField.module.css */
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  width: 100%;
}

.label {
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-20);
  color: var(--color-label-primary);
  letter-spacing: var(--letter-spacing);
}

.input {
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  letter-spacing: var(--letter-spacing);
  color: var(--color-label-primary);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-8) var(--spacing-12);
  outline: none;
  transition: border-color 0.15s ease;
}

.input::placeholder {
  color: var(--color-label-disabled);
}

.input:disabled {
  background-color: var(--color-bg-secondary);
  color: var(--color-label-disabled);
  cursor: not-allowed;
}

.focused {
  border-color: var(--color-border-interactive-primary);
}

.error {
  border-color: var(--color-state-error);
}

.helper {
  font-family: var(--font-family);
  font-size: var(--font-size-12);
  line-height: var(--line-height-18);
  color: var(--color-label-tertiary);
  letter-spacing: var(--letter-spacing);
}

.helperError {
  font-family: var(--font-family);
  font-size: var(--font-size-12);
  line-height: var(--line-height-18);
  color: var(--color-state-error);
  letter-spacing: var(--letter-spacing);
}
```

- [ ] **Step 3: index.ts barrel export 작성**

```ts
// src/components/TextField/index.ts
export { TextField } from './TextField'
export type { TextFieldProps } from './TextField'
```

- [ ] **Step 4: TextField.stories.tsx 작성**

```tsx
// src/components/TextField/TextField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from './TextField'

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof TextField>

export const Playground: Story = {
  args: {
    label: '라벨',
    placeholder: '텍스트를 입력하세요',
    helperText: '도움말 텍스트',
    error: false,
    disabled: false,
  },
}

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <TextField label="기본" placeholder="텍스트를 입력하세요" />
      <TextField label="도움말 포함" placeholder="텍스트를 입력하세요" helperText="도움말 텍스트입니다" />
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <TextField
        label="에러 상태"
        placeholder="텍스트를 입력하세요"
        error
        helperText="필수 입력 항목입니다"
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <TextField
        label="비활성화"
        placeholder="입력할 수 없습니다"
        disabled
      />
    </div>
  ),
}

export const AllStates: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <TextField label="기본" placeholder="텍스트를 입력하세요" />
      <TextField label="도움말" placeholder="텍스트를 입력하세요" helperText="도움말 텍스트" />
      <TextField label="에러" placeholder="텍스트를 입력하세요" error helperText="에러 메시지" />
      <TextField label="비활성화" placeholder="입력 불가" disabled />
    </div>
  ),
}
```

- [ ] **Step 5: Storybook에서 TextField 확인**

```bash
npm run storybook
```

Components → TextField에서 모든 상태가 올바르게 렌더링되는지 확인.

- [ ] **Step 6: 커밋**

```bash
git add src/components/TextField/
git commit -m "feat: TextField 컴포넌트 구현 (기본, 에러, 비활성화 상태)"
```

---

### Task 5: Checkbox 컴포넌트

**Files:**
- Create: `src/components/Checkbox/Checkbox.tsx`
- Create: `src/components/Checkbox/Checkbox.module.css`
- Create: `src/components/Checkbox/Checkbox.stories.tsx`
- Create: `src/components/Checkbox/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`
- Produces: `<Checkbox>` — `checked`, `disabled`, `label`, `onChange` props

- [ ] **Step 1: Checkbox.tsx 작성**

```tsx
// src/components/Checkbox/Checkbox.tsx
import styles from './Checkbox.module.css'

export interface CheckboxProps {
  checked?: boolean
  disabled?: boolean
  label?: string
  onChange?: (checked: boolean) => void
}

export function Checkbox({
  checked = false,
  disabled = false,
  label,
  onChange,
}: CheckboxProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange?.(!checked)
    }
  }

  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
      <div
        className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
        onClick={handleChange}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.hiddenInput}
      />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
```

- [ ] **Step 2: Checkbox.module.css 작성**

```css
/* src/components/Checkbox/Checkbox.module.css */
.wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-8);
  cursor: pointer;
}

.wrapper.disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.hiddenInput {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border-interactive-primary);
  border-radius: var(--radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.checkbox:hover {
  border-color: var(--color-border-interactive-primary-hovered);
}

.checked {
  background-color: var(--color-primary-default);
  border-color: var(--color-primary-default);
}

.checked:hover {
  background-color: var(--color-primary-hovered);
  border-color: var(--color-primary-hovered);
}

.label {
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-20);
  color: var(--color-label-primary);
  letter-spacing: var(--letter-spacing);
}
```

- [ ] **Step 3: index.ts barrel export 작성**

```ts
// src/components/Checkbox/index.ts
export { Checkbox } from './Checkbox'
export type { CheckboxProps } from './Checkbox'
```

- [ ] **Step 4: Checkbox.stories.tsx 작성**

```tsx
// src/components/Checkbox/Checkbox.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Playground: Story = {
  args: {
    checked: false,
    disabled: false,
    label: '체크박스 라벨',
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked)
    return <Checkbox {...args} checked={checked} onChange={setChecked} />
  },
}

export const AllStates: Story = {
  name: 'Overview',
  render: function Render() {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(true)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox label="미선택" checked={checked1} onChange={setChecked1} />
        <Checkbox label="선택됨" checked={checked2} onChange={setChecked2} />
        <Checkbox label="비활성화 (미선택)" disabled />
        <Checkbox label="비활성화 (선택됨)" checked disabled />
      </div>
    )
  },
}
```

- [ ] **Step 5: Storybook에서 Checkbox 확인 후 커밋**

```bash
npm run storybook
git add src/components/Checkbox/
git commit -m "feat: Checkbox 컴포넌트 구현 (체크, 미체크, 비활성화 상태)"
```

---

### Task 6: Radio 컴포넌트

**Files:**
- Create: `src/components/Radio/Radio.tsx`
- Create: `src/components/Radio/Radio.module.css`
- Create: `src/components/Radio/Radio.stories.tsx`
- Create: `src/components/Radio/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`
- Produces: `<Radio>` — `checked`, `disabled`, `label`, `name`, `value`, `onChange` props

- [ ] **Step 1: Radio.tsx 작성**

```tsx
// src/components/Radio/Radio.tsx
import styles from './Radio.module.css'

export interface RadioProps {
  checked?: boolean
  disabled?: boolean
  label?: string
  name?: string
  value?: string
  onChange?: (value: string) => void
}

export function Radio({
  checked = false,
  disabled = false,
  label,
  name,
  value = '',
  onChange,
}: RadioProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange?.(value)
    }
  }

  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
      <div
        className={`${styles.radio} ${checked ? styles.checked : ''}`}
        onClick={handleChange}
      >
        {checked && <div className={styles.dot} />}
      </div>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.hiddenInput}
      />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
```

- [ ] **Step 2: Radio.module.css 작성**

```css
/* src/components/Radio/Radio.module.css */
.wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-8);
  cursor: pointer;
}

.wrapper.disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.hiddenInput {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border-interactive-primary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s ease;
}

.radio:hover {
  border-color: var(--color-border-interactive-primary-hovered);
}

.checked {
  border-color: var(--color-primary-default);
}

.checked:hover {
  border-color: var(--color-primary-hovered);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary-default);
}

.label {
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-20);
  color: var(--color-label-primary);
  letter-spacing: var(--letter-spacing);
}
```

- [ ] **Step 3: index.ts barrel export 작성**

```ts
// src/components/Radio/index.ts
export { Radio } from './Radio'
export type { RadioProps } from './Radio'
```

- [ ] **Step 4: Radio.stories.tsx 작성**

```tsx
// src/components/Radio/Radio.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Radio>

export const Playground: Story = {
  args: {
    checked: false,
    disabled: false,
    label: '라디오 버튼',
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked)
    return <Radio {...args} checked={checked} onChange={() => setChecked(true)} />
  },
}

export const RadioGroup: Story = {
  name: 'Overview',
  render: function Render() {
    const [selected, setSelected] = useState('option1')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Radio
          label="옵션 1"
          name="group"
          value="option1"
          checked={selected === 'option1'}
          onChange={setSelected}
        />
        <Radio
          label="옵션 2"
          name="group"
          value="option2"
          checked={selected === 'option2'}
          onChange={setSelected}
        />
        <Radio
          label="옵션 3"
          name="group"
          value="option3"
          checked={selected === 'option3'}
          onChange={setSelected}
        />
        <Radio label="비활성화" disabled />
        <Radio label="비활성화 (선택됨)" checked disabled />
      </div>
    )
  },
}
```

- [ ] **Step 5: Storybook에서 Radio 확인 후 커밋**

```bash
npm run storybook
git add src/components/Radio/
git commit -m "feat: Radio 컴포넌트 구현 (선택, 미선택, 비활성화, 그룹)"
```

---

### Task 7: Chip 컴포넌트

**Files:**
- Create: `src/components/Chip/Chip.tsx`
- Create: `src/components/Chip/Chip.module.css`
- Create: `src/components/Chip/Chip.stories.tsx`
- Create: `src/components/Chip/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`
- Produces: `<Chip>` — `variant`, `selected`, `disabled`, `onClose`, `children` props

- [ ] **Step 1: Chip.tsx 작성**

```tsx
// src/components/Chip/Chip.tsx
import styles from './Chip.module.css'

export interface ChipProps {
  variant?: 'filled' | 'outlined'
  selected?: boolean
  disabled?: boolean
  onClose?: () => void
  onClick?: () => void
  children: React.ReactNode
}

export function Chip({
  variant = 'filled',
  selected = false,
  disabled = false,
  onClose,
  onClick,
  children,
}: ChipProps) {
  const className = [
    styles.chip,
    styles[variant],
    selected ? styles.selected : '',
  ].join(' ')

  return (
    <div
      className={className}
      onClick={disabled ? undefined : onClick}
      style={{ cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default', opacity: disabled ? 0.4 : 1 }}
    >
      <span className={styles.label}>{children}</span>
      {onClose && !disabled && (
        <button className={styles.closeButton} onClick={(e) => { e.stopPropagation(); onClose(); }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Chip.module.css 작성**

```css
/* src/components/Chip/Chip.module.css */
.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-4) var(--spacing-12);
  border-radius: var(--radius-full);
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.label {
  font-family: var(--font-family);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-18);
  letter-spacing: var(--letter-spacing);
}

.filled {
  background-color: var(--color-bg-secondary);
  color: var(--color-label-primary);
}

.filled:hover {
  background-color: var(--color-bg-tertiary);
}

.filled.selected {
  background-color: var(--color-primary-default);
  color: var(--color-label-inverse);
}

.outlined {
  background-color: transparent;
  border: 1px solid var(--color-border-primary);
  color: var(--color-label-primary);
}

.outlined:hover {
  background-color: var(--color-bg-secondary);
}

.outlined.selected {
  border-color: var(--color-primary-default);
  color: var(--color-primary-default);
}

.closeButton {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
}
```

- [ ] **Step 3: index.ts barrel export 작성**

```ts
// src/components/Chip/index.ts
export { Chip } from './Chip'
export type { ChipProps } from './Chip'
```

- [ ] **Step 4: Chip.stories.tsx 작성**

```tsx
// src/components/Chip/Chip.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Playground: Story = {
  args: {
    variant: 'filled',
    selected: false,
    disabled: false,
    children: '칩 라벨',
  },
}

export const AllVariants: Story = {
  name: 'Overview',
  render: function Render() {
    const [selected, setSelected] = useState<string[]>([])
    const toggle = (id: string) => {
      setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Filled</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip variant="filled" onClick={() => toggle('f1')} selected={selected.includes('f1')}>카테고리</Chip>
            <Chip variant="filled" onClick={() => toggle('f2')} selected={selected.includes('f2')}>태그</Chip>
            <Chip variant="filled" onClose={() => alert('닫기')}>삭제 가능</Chip>
            <Chip variant="filled" disabled>비활성화</Chip>
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Outlined</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip variant="outlined" onClick={() => toggle('o1')} selected={selected.includes('o1')}>카테고리</Chip>
            <Chip variant="outlined" onClick={() => toggle('o2')} selected={selected.includes('o2')}>태그</Chip>
            <Chip variant="outlined" onClose={() => alert('닫기')}>삭제 가능</Chip>
            <Chip variant="outlined" disabled>비활성화</Chip>
          </div>
        </div>
      </div>
    )
  },
}
```

- [ ] **Step 5: Storybook에서 Chip 확인 후 커밋**

```bash
npm run storybook
git add src/components/Chip/
git commit -m "feat: Chip 컴포넌트 구현 (Filled/Outlined, 선택, 삭제 가능)"
```

---

### Task 8: 2차 컴포넌트 — SelectField

**Files:**
- Create: `src/components/SelectField/SelectField.tsx`
- Create: `src/components/SelectField/SelectField.module.css`
- Create: `src/components/SelectField/SelectField.stories.tsx`
- Create: `src/components/SelectField/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`
- Produces: `<SelectField>` — `label`, `options`, `placeholder`, `disabled`, `error`, `value`, `onChange` props

- [ ] **Step 1: SelectField.tsx 작성**

```tsx
// src/components/SelectField/SelectField.tsx
import { useState, useRef, useEffect } from 'react'
import styles from './SelectField.module.css'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectFieldProps {
  label?: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  error?: boolean
  helperText?: string
  value?: string
  onChange?: (value: string) => void
}

export function SelectField({
  label,
  options,
  placeholder = '선택하세요',
  disabled = false,
  error = false,
  helperText,
  value,
  onChange,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value ?? '')
  const ref = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(o => o.value === selectedValue)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const triggerClassName = [
    styles.trigger,
    isOpen ? styles.focused : '',
    error ? styles.error : '',
  ].join(' ')

  return (
    <div className={styles.wrapper} ref={ref}>
      {label && <label className={styles.label}>{label}</label>}
      <button
        className={triggerClassName}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        type="button"
      >
        <span className={selectedOption ? styles.value : styles.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map(option => (
            <li
              key={option.value}
              className={`${styles.option} ${option.value === selectedValue ? styles.optionSelected : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {helperText && (
        <span className={error ? styles.helperError : styles.helper}>
          {helperText}
        </span>
      )}
    </div>
  )
}
```

- [ ] **Step 2: SelectField.module.css 작성**

```css
/* src/components/SelectField/SelectField.module.css */
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  position: relative;
  width: 100%;
}

.label {
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-20);
  color: var(--color-label-primary);
  letter-spacing: var(--letter-spacing);
}

.trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  letter-spacing: var(--letter-spacing);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-8) var(--spacing-12);
  cursor: pointer;
  outline: none;
  width: 100%;
  text-align: left;
}

.trigger:disabled {
  background-color: var(--color-bg-secondary);
  color: var(--color-label-disabled);
  cursor: not-allowed;
}

.focused {
  border-color: var(--color-border-interactive-primary);
}

.error {
  border-color: var(--color-state-error);
}

.value {
  color: var(--color-label-primary);
}

.placeholder {
  color: var(--color-label-disabled);
}

.arrow {
  color: var(--color-label-tertiary);
  transition: transform 0.15s ease;
  flex-shrink: 0;
}

.arrowOpen {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--spacing-4);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  list-style: none;
  padding: var(--spacing-4) 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.option {
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  letter-spacing: var(--letter-spacing);
  color: var(--color-label-primary);
  padding: var(--spacing-8) var(--spacing-12);
  cursor: pointer;
}

.option:hover {
  background-color: var(--color-bg-secondary);
}

.optionSelected {
  background-color: var(--color-bg-selected);
  color: var(--color-primary-default);
  font-weight: var(--font-weight-medium);
}

.helper {
  font-family: var(--font-family);
  font-size: var(--font-size-12);
  line-height: var(--line-height-18);
  color: var(--color-label-tertiary);
  letter-spacing: var(--letter-spacing);
}

.helperError {
  font-family: var(--font-family);
  font-size: var(--font-size-12);
  line-height: var(--line-height-18);
  color: var(--color-state-error);
  letter-spacing: var(--letter-spacing);
}
```

- [ ] **Step 3: index.ts + SelectField.stories.tsx 작성**

```ts
// src/components/SelectField/index.ts
export { SelectField } from './SelectField'
export type { SelectFieldProps, SelectOption } from './SelectField'
```

```tsx
// src/components/SelectField/SelectField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { SelectField } from './SelectField'

const sampleOptions = [
  { label: '옵션 1', value: 'opt1' },
  { label: '옵션 2', value: 'opt2' },
  { label: '옵션 3', value: 'opt3' },
  { label: '옵션 4', value: 'opt4' },
]

const meta: Meta<typeof SelectField> = {
  title: 'Components/SelectField',
  component: SelectField,
}

export default meta
type Story = StoryObj<typeof SelectField>

export const Playground: Story = {
  args: {
    label: '라벨',
    options: sampleOptions,
    placeholder: '선택하세요',
    disabled: false,
    error: false,
  },
}

export const AllStates: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <SelectField label="기본" options={sampleOptions} placeholder="선택하세요" />
      <SelectField label="에러" options={sampleOptions} error helperText="필수 선택 항목입니다" />
      <SelectField label="비활성화" options={sampleOptions} disabled />
    </div>
  ),
}
```

- [ ] **Step 4: Storybook에서 확인 후 커밋**

```bash
npm run storybook
git add src/components/SelectField/
git commit -m "feat: SelectField 컴포넌트 구현 (드롭다운, 에러, 비활성화)"
```

---

### Task 9: 2차 컴포넌트 — SearchField

**Files:**
- Create: `src/components/SearchField/SearchField.tsx`
- Create: `src/components/SearchField/SearchField.module.css`
- Create: `src/components/SearchField/SearchField.stories.tsx`
- Create: `src/components/SearchField/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`
- Produces: `<SearchField>` — `placeholder`, `disabled`, `value`, `onChange`, `onClear` props

- [ ] **Step 1: SearchField.tsx + CSS + Stories 작성**

```tsx
// src/components/SearchField/SearchField.tsx
import { useState } from 'react'
import styles from './SearchField.module.css'

export interface SearchFieldProps {
  placeholder?: string
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
}

export function SearchField({
  placeholder = '검색어를 입력하세요',
  disabled = false,
  value,
  onChange,
  onClear,
}: SearchFieldProps) {
  const [internalValue, setInternalValue] = useState(value ?? '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)
    onChange?.(newValue)
  }

  const handleClear = () => {
    setInternalValue('')
    onChange?.('')
    onClear?.()
  }

  return (
    <div className={styles.wrapper}>
      <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        value={internalValue}
        onChange={handleChange}
      />
      {internalValue && !disabled && (
        <button className={styles.clearButton} onClick={handleClear} type="button">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
```

```css
/* src/components/SearchField/SearchField.module.css */
.wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-8) var(--spacing-12);
  width: 100%;
}

.wrapper:focus-within {
  border-color: var(--color-border-interactive-primary);
}

.searchIcon {
  color: var(--color-label-tertiary);
  flex-shrink: 0;
}

.input {
  flex: 1;
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  letter-spacing: var(--letter-spacing);
  color: var(--color-label-primary);
  border: none;
  outline: none;
  background: transparent;
}

.input::placeholder {
  color: var(--color-label-disabled);
}

.input:disabled {
  color: var(--color-label-disabled);
  cursor: not-allowed;
}

.clearButton {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-label-tertiary);
}

.clearButton:hover {
  color: var(--color-label-primary);
}
```

```ts
// src/components/SearchField/index.ts
export { SearchField } from './SearchField'
export type { SearchFieldProps } from './SearchField'
```

```tsx
// src/components/SearchField/SearchField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { SearchField } from './SearchField'

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
}

export default meta
type Story = StoryObj<typeof SearchField>

export const Playground: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    disabled: false,
  },
}

export const AllStates: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <SearchField placeholder="검색어를 입력하세요" />
      <SearchField placeholder="비활성화" disabled />
    </div>
  ),
}
```

- [ ] **Step 2: Storybook에서 확인 후 커밋**

```bash
npm run storybook
git add src/components/SearchField/
git commit -m "feat: SearchField 컴포넌트 구현 (검색 아이콘, 클리어 버튼)"
```

---

### Task 10: 2차 컴포넌트 — ProgressBar

**Files:**
- Create: `src/components/ProgressBar/ProgressBar.tsx`
- Create: `src/components/ProgressBar/ProgressBar.module.css`
- Create: `src/components/ProgressBar/ProgressBar.stories.tsx`
- Create: `src/components/ProgressBar/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`
- Produces: `<ProgressBar>` — `value` (0-100), `showLabel` props

- [ ] **Step 1: ProgressBar 전체 작성**

```tsx
// src/components/ProgressBar/ProgressBar.tsx
import styles from './ProgressBar.module.css'

export interface ProgressBarProps {
  value: number
  showLabel?: boolean
}

export function ProgressBar({ value, showLabel = false }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>{clampedValue}%</span>
      )}
    </div>
  )
}
```

```css
/* src/components/ProgressBar/ProgressBar.module.css */
.wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  width: 100%;
}

.track {
  flex: 1;
  height: 8px;
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.fill {
  height: 100%;
  background-color: var(--color-primary-default);
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}

.label {
  font-family: var(--font-family);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-18);
  color: var(--color-label-secondary);
  letter-spacing: var(--letter-spacing);
  min-width: 36px;
  text-align: right;
}
```

```ts
// src/components/ProgressBar/index.ts
export { ProgressBar } from './ProgressBar'
export type { ProgressBarProps } from './ProgressBar'
```

```tsx
// src/components/ProgressBar/ProgressBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    showLabel: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Playground: Story = {
  args: { value: 60, showLabel: true },
}

export const AllStates: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <ProgressBar value={0} showLabel />
      <ProgressBar value={25} showLabel />
      <ProgressBar value={50} showLabel />
      <ProgressBar value={75} showLabel />
      <ProgressBar value={100} showLabel />
    </div>
  ),
}
```

- [ ] **Step 2: Storybook에서 확인 후 커밋**

```bash
npm run storybook
git add src/components/ProgressBar/
git commit -m "feat: ProgressBar 컴포넌트 구현 (퍼센트 표시, 애니메이션)"
```

---

### Task 11: 3차 컴포넌트 — Toast

**Files:**
- Create: `src/components/Toast/Toast.tsx`
- Create: `src/components/Toast/Toast.module.css`
- Create: `src/components/Toast/Toast.stories.tsx`
- Create: `src/components/Toast/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`
- Produces: `<Toast>` — `type`, `message`, `onClose` props

- [ ] **Step 1: Toast 전체 작성**

```tsx
// src/components/Toast/Toast.tsx
import styles from './Toast.module.css'

export interface ToastProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  message: string
  onClose?: () => void
}

export function Toast({ type = 'info', message, onClose }: ToastProps) {
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span className={styles.message}>{message}</span>
      {onClose && (
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
```

```css
/* src/components/Toast/Toast.module.css */
.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-8);
  padding: var(--spacing-12) var(--spacing-16);
  border-radius: var(--radius-sm);
  min-width: 280px;
  box-shadow: var(--shadow-md);
}

.success {
  background-color: var(--color-state-success);
  color: var(--color-label-inverse);
}

.error {
  background-color: var(--color-state-error);
  color: var(--color-label-inverse);
}

.warning {
  background-color: var(--color-state-warning);
  color: var(--color-label-primary);
}

.info {
  background-color: var(--color-state-info);
  color: var(--color-label-inverse);
}

.message {
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-20);
  letter-spacing: var(--letter-spacing);
}

.closeButton {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
  opacity: 0.8;
}

.closeButton:hover {
  opacity: 1;
}
```

```ts
// src/components/Toast/index.ts
export { Toast } from './Toast'
export type { ToastProps } from './Toast'
```

```tsx
// src/components/Toast/Toast.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    type: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
    message: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Playground: Story = {
  args: { type: 'success', message: '저장되었습니다.' },
}

export const AllTypes: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toast type="success" message="저장되었습니다." onClose={() => {}} />
      <Toast type="error" message="오류가 발생했습니다." onClose={() => {}} />
      <Toast type="warning" message="주의가 필요합니다." onClose={() => {}} />
      <Toast type="info" message="새로운 알림이 있습니다." onClose={() => {}} />
    </div>
  ),
}
```

- [ ] **Step 2: Storybook에서 확인 후 커밋**

```bash
npm run storybook
git add src/components/Toast/
git commit -m "feat: Toast 컴포넌트 구현 (Success/Error/Warning/Info)"
```

---

### Task 12: 3차 컴포넌트 — Modal

**Files:**
- Create: `src/components/Modal/Modal.tsx`
- Create: `src/components/Modal/Modal.module.css`
- Create: `src/components/Modal/Modal.stories.tsx`
- Create: `src/components/Modal/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`, `<Button>` 컴포넌트
- Produces: `<Modal>` — `isOpen`, `title`, `onClose`, `children`, `footer` props

- [ ] **Step 1: Modal 전체 작성**

```tsx
// src/components/Modal/Modal.tsx
import styles from './Modal.module.css'

export interface ModalProps {
  isOpen: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}

export function Modal({ isOpen, title, onClose, children, footer }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  )
}
```

```css
/* src/components/Modal/Modal.module.css */
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-20) var(--spacing-24) var(--spacing-12);
}

.title {
  font-family: var(--font-family);
  font-size: var(--font-size-18);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-26);
  color: var(--color-label-primary);
  letter-spacing: var(--letter-spacing);
  margin: 0;
}

.closeButton {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: var(--spacing-4);
  cursor: pointer;
  color: var(--color-label-tertiary);
  border-radius: var(--radius-xs);
}

.closeButton:hover {
  background-color: var(--color-bg-secondary);
  color: var(--color-label-primary);
}

.body {
  padding: var(--spacing-12) var(--spacing-24);
  overflow-y: auto;
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  color: var(--color-label-secondary);
  letter-spacing: var(--letter-spacing);
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-8);
  padding: var(--spacing-12) var(--spacing-24) var(--spacing-20);
}
```

```ts
// src/components/Modal/index.ts
export { Modal } from './Modal'
export type { ModalProps } from './Modal'
```

```tsx
// src/components/Modal/Modal.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { Button } from '../Button'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
        <Modal
          isOpen={isOpen}
          title="확인"
          onClose={() => setIsOpen(false)}
          footer={
            <>
              <Button variant="tertiary" onClick={() => setIsOpen(false)}>취소</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>확인</Button>
            </>
          }
        >
          <p>이 작업을 진행하시겠습니까?</p>
        </Modal>
      </>
    )
  },
}

export const WithLongContent: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>긴 내용 모달</Button>
        <Modal
          isOpen={isOpen}
          title="서비스 이용약관"
          onClose={() => setIsOpen(false)}
          footer={
            <Button variant="primary" onClick={() => setIsOpen(false)}>동의</Button>
          }
        >
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i}>이용약관 내용이 여기에 들어갑니다. 스크롤이 생기는 긴 내용의 모달입니다.</p>
          ))}
        </Modal>
      </>
    )
  },
}
```

- [ ] **Step 2: Storybook에서 확인 후 커밋**

```bash
npm run storybook
git add src/components/Modal/
git commit -m "feat: Modal 컴포넌트 구현 (오버레이, 헤더, 바디, 푸터)"
```

---

### Task 13: 3차 컴포넌트 — BottomSheet

**Files:**
- Create: `src/components/BottomSheet/BottomSheet.tsx`
- Create: `src/components/BottomSheet/BottomSheet.module.css`
- Create: `src/components/BottomSheet/BottomSheet.stories.tsx`
- Create: `src/components/BottomSheet/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`, `<Button>` 컴포넌트
- Produces: `<BottomSheet>` — `isOpen`, `title`, `onClose`, `children`, `footer` props

- [ ] **Step 1: BottomSheet 전체 작성**

```tsx
// src/components/BottomSheet/BottomSheet.tsx
import styles from './BottomSheet.module.css'

export interface BottomSheetProps {
  isOpen: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}

export function BottomSheet({ isOpen, title, onClose, children, footer }: BottomSheetProps) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.closeButton} onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  )
}
```

```css
/* src/components/BottomSheet/BottomSheet.module.css */
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 100;
}

.sheet {
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.handle {
  width: 36px;
  height: 4px;
  background-color: var(--color-border-primary);
  border-radius: var(--radius-full);
  margin: var(--spacing-8) auto var(--spacing-4);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-12) var(--spacing-20);
}

.title {
  font-family: var(--font-family);
  font-size: var(--font-size-18);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-26);
  color: var(--color-label-primary);
  letter-spacing: var(--letter-spacing);
  margin: 0;
}

.closeButton {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: var(--spacing-4);
  cursor: pointer;
  color: var(--color-label-tertiary);
  border-radius: var(--radius-xs);
}

.closeButton:hover {
  background-color: var(--color-bg-secondary);
}

.body {
  padding: var(--spacing-4) var(--spacing-20) var(--spacing-16);
  overflow-y: auto;
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  color: var(--color-label-secondary);
  letter-spacing: var(--letter-spacing);
}

.footer {
  display: flex;
  gap: var(--spacing-8);
  padding: var(--spacing-12) var(--spacing-20) var(--spacing-20);
}

.footer > * {
  flex: 1;
}
```

```ts
// src/components/BottomSheet/index.ts
export { BottomSheet } from './BottomSheet'
export type { BottomSheetProps } from './BottomSheet'
```

```tsx
// src/components/BottomSheet/BottomSheet.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BottomSheet } from './BottomSheet'
import { Button } from '../Button'

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
}

export default meta
type Story = StoryObj<typeof BottomSheet>

export const Default: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>바텀시트 열기</Button>
        <BottomSheet
          isOpen={isOpen}
          title="옵션 선택"
          onClose={() => setIsOpen(false)}
          footer={
            <>
              <Button variant="tertiary" onClick={() => setIsOpen(false)}>취소</Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>확인</Button>
            </>
          }
        >
          <p>바텀시트 내용이 여기에 들어갑니다.</p>
          <p>모바일 환경에서 주로 사용되는 컴포넌트입니다.</p>
        </BottomSheet>
      </>
    )
  },
}
```

- [ ] **Step 2: Storybook에서 확인 후 커밋**

```bash
npm run storybook
git add src/components/BottomSheet/
git commit -m "feat: BottomSheet 컴포넌트 구현 (핸들, 헤더, 바디, 푸터)"
```

---

### Task 14: 최종 확인 및 Figma 디자인 비교

**Files:**
- 수정 가능: 모든 컴포넌트 CSS 파일 (디자인 비교 후 미세 조정)

**Interfaces:**
- Consumes: 모든 이전 태스크의 결과물
- Produces: Figma 디자인과 일치하는 최종 Storybook

- [ ] **Step 1: 모든 컴포넌트 Storybook에서 일괄 확인**

```bash
npm run storybook
```

Storybook에서 모든 컴포넌트 페이지를 하나씩 열어보며 Figma 디자인과 비교. 색상, 간격, 폰트 크기, 라운딩 등이 일치하는지 확인.

- [ ] **Step 2: tokens.css의 토큰 값이 Figma Variables와 일치하는지 검증**

Figma에서 Variables 패널을 열고, tokens.css의 값과 하나씩 대조. 불일치하는 값이 있으면 해당 JSON 파일을 수정하고 `npm run build-tokens` 재실행.

- [ ] **Step 3: 미세 조정 후 최종 커밋**

```bash
git add -A
git commit -m "fix: Figma 디자인 대비 토큰/스타일 미세 조정"
```
