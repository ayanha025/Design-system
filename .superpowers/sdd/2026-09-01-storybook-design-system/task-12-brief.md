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