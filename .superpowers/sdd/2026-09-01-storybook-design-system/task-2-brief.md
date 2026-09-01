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