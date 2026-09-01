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