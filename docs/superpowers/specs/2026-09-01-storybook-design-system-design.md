# Storybook 디자인시스템 구축 설계 문서

## 목적

Figma에서 구축한 디자인시스템(TMT Design System)을 코드로 옮겨서:
1. **A) Storybook 구축** - 디자인 컴포넌트를 실제 작동하는 코드로 구현하고 인터랙티브 카탈로그로 문서화
2. **B) Figma-Code 토큰 연동** - Figma 토큰과 코드 토큰이 1:1 매칭되는 변환 시스템 구축

포트폴리오 메시지: "디자이너가 디자인시스템의 코드 구현체까지 관리/검증할 수 있다"

## Figma 원본

- 파일: TMT Design System (Copy)
- Foundation 토큰: Color, Typography, Layout Grid, Spacing, Radius, Elevation/Shadow
- 컴포넌트: Button, Radio, Check, TextField, SelectField, SearchField, Option, Chip, ProgressBar, Toast, Modal, BottomSheet (12개)

## 전체 흐름

```
Figma Variables → JSON 토큰 파일 → (변환 스크립트) → CSS Variables → React 컴포넌트 → Storybook
```

## 1. 프로젝트 구조

```
스토리북 제작_ver2/
├── .storybook/               # Storybook 설정
│   ├── main.ts
│   └── preview.ts
├── src/
│   ├── tokens/
│   │   ├── color.json        # 컬러 토큰 (Primitive + Semantic)
│   │   ├── typography.json   # 타이포그래피 토큰
│   │   ├── spacing.json      # 스페이싱 토큰
│   │   ├── radius.json       # 라디우스 토큰
│   │   └── shadow.json       # 그림자 토큰
│   │
│   ├── styles/
│   │   └── tokens.css        # JSON에서 자동 변환된 CSS Variables
│   │
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── Button.stories.tsx
│   │   ├── TextField/
│   │   ├── Checkbox/
│   │   ├── Radio/
│   │   ├── Chip/
│   │   ├── SelectField/
│   │   ├── SearchField/
│   │   ├── Option/
│   │   ├── ProgressBar/
│   │   ├── Toast/
│   │   ├── Modal/
│   │   └── BottomSheet/
│   │
│   └── scripts/
│       └── build-tokens.js   # JSON → CSS Variables 변환 스크립트
│
├── package.json
└── README.md
```

## 2. 토큰 시스템

### 2.1 Color 토큰 (color.json)

2단계 구조: Primitive(원색) → Semantic(용도별)

```json
{
  "primitive": {
    "red": { "50": "#FFEBEE", "100": "#FFCDD2", "500": "#E53935", "900": "#B71C1C" },
    "gray": { "50": "#FAFAFA", "100": "#F5F5F5", "500": "#9E9E9E", "900": "#212121" }
  },
  "semantic": {
    "color-primary": "primitive.red.500",
    "color-background": "primitive.gray.50",
    "color-text": "primitive.gray.900",
    "color-error": "primitive.red.500"
  }
}
```

실제 토큰 값은 Figma Variables에서 추출하여 정확한 값으로 채움.

### 2.2 Typography 토큰 (typography.json)

```json
{
  "heading-xl": { "size": "28px", "weight": "700", "lineHeight": "36px" },
  "heading-lg": { "size": "24px", "weight": "700", "lineHeight": "32px" },
  "body-md": { "size": "16px", "weight": "400", "lineHeight": "24px" },
  "body-sm": { "size": "14px", "weight": "400", "lineHeight": "20px" }
}
```

### 2.3 Spacing 토큰 (spacing.json)

```json
{
  "xs": "4px",
  "sm": "8px",
  "md": "16px",
  "lg": "24px",
  "xl": "32px"
}
```

### 2.4 Radius 토큰 (radius.json)

```json
{
  "xs": "4px",
  "sm": "8px",
  "md": "12px",
  "lg": "16px",
  "full": "9999px"
}
```

### 2.5 Shadow 토큰 (shadow.json)

```json
{
  "sm": "0 1px 2px rgba(0,0,0,0.1)",
  "md": "0 4px 8px rgba(0,0,0,0.12)"
}
```

### 2.6 변환 스크립트 (build-tokens.js)

JSON 파일들을 읽어서 `src/styles/tokens.css` 파일을 자동 생성.

변환 결과 예시:
```css
:root {
  /* Color - Primitive */
  --red-50: #FFEBEE;
  --red-500: #E53935;
  --gray-50: #FAFAFA;
  --gray-900: #212121;

  /* Color - Semantic */
  --color-primary: var(--red-500);
  --color-background: var(--gray-50);
  --color-text: var(--gray-900);

  /* Typography */
  --heading-xl-size: 28px;
  --heading-xl-weight: 700;
  --heading-xl-line-height: 36px;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;

  /* Radius */
  --radius-xs: 4px;
  --radius-sm: 8px;

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.12);
}
```

## 3. 컴포넌트 구현

### 3.1 구현 우선순위

**1차 (핵심 5개):** Button, TextField, Checkbox, Radio, Chip
**2차 (입력 확장 4개):** SelectField, SearchField, Option, ProgressBar
**3차 (오버레이 3개):** Toast, Modal, BottomSheet

### 3.2 컴포넌트 구현 패턴

모든 컴포넌트가 동일한 패턴을 따름:

1. **Props 정의** - Figma Variant 속성을 그대로 Props로 매핑
2. **CSS Modules** - CSS Variables(토큰)를 사용하여 스타일링
3. **Stories** - Overview, 각 Variant별 Story, Playground

예시 (Button):

Props (= Figma Variant):
- variant: "primary" | "secondary" | "tertiary"
- size: "small" | "medium" | "large"
- disabled: boolean
- children: 버튼 텍스트

### 3.3 Storybook Stories 구성

각 컴포넌트마다:
- **Overview** - 모든 variant를 한눈에 보여주는 Story
- **개별 Variant** - 각 타입별 상태를 보여주는 Story
- **Playground** - Storybook Controls로 속성을 직접 바꿔볼 수 있는 Story

## 4. 기술 스택

| 도구 | 버전 | 역할 |
|------|------|------|
| Vite | 최신 | 프로젝트 빌드 |
| React | 18+ | 컴포넌트 개발 |
| TypeScript | 5+ | 타입 안정성 |
| CSS Modules | (내장) | 스타일링 |
| Storybook | 8 | 컴포넌트 카탈로그 |
| Node.js | 18+ | 토큰 변환 스크립트 실행 |

의도적으로 제외한 것: Tailwind CSS, Styled Components, Style Dictionary, 테스트 프레임워크

## 5. 토큰 업데이트 워크플로우

Figma에서 토큰 값이 변경되었을 때:

1. Figma Variables에서 변경된 값 확인
2. 해당 JSON 파일(예: color.json)의 값 수정
3. `npm run build-tokens` 실행 → tokens.css 자동 재생성
4. Storybook에서 변경 결과 확인

## 6. 컴포넌트 추가 워크플로우

새 컴포넌트를 추가할 때:

1. Figma에서 컴포넌트 디자인 완료
2. `src/components/새컴포넌트/` 폴더 생성
3. `.tsx`, `.module.css`, `.stories.tsx` 3개 파일 작성
4. CSS Variables(토큰)를 사용하여 스타일 작성
5. Storybook에서 확인
