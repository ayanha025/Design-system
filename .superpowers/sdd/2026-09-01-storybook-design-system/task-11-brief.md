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