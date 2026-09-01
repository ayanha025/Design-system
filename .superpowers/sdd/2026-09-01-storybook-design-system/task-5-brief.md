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