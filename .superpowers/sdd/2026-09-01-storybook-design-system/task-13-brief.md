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