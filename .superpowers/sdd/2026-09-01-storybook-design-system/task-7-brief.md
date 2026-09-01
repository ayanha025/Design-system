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