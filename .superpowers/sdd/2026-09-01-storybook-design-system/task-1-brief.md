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
  return <div>eat-da Design System</div>
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