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