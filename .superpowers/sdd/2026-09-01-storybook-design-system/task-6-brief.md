### Task 6: Radio 컴포넌트

**Files:**
- Create: `src/components/Radio/Radio.tsx`
- Create: `src/components/Radio/Radio.module.css`
- Create: `src/components/Radio/Radio.stories.tsx`
- Create: `src/components/Radio/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`
- Produces: `<Radio>` — `checked`, `disabled`, `label`, `name`, `value`, `onChange` props

- [ ] **Step 1: Radio.tsx 작성**

```tsx
// src/components/Radio/Radio.tsx
import styles from './Radio.module.css'

export interface RadioProps {
  checked?: boolean
  disabled?: boolean
  label?: string
  name?: string
  value?: string
  onChange?: (value: string) => void
}

export function Radio({
  checked = false,
  disabled = false,
  label,
  name,
  value = '',
  onChange,
}: RadioProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange?.(value)
    }
  }

  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
      <div
        className={`${styles.radio} ${checked ? styles.checked : ''}`}
        onClick={handleChange}
      >
        {checked && <div className={styles.dot} />}
      </div>
      <input
        type="radio"
        name={name}
        value={value}
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

- [ ] **Step 2: Radio.module.css 작성**

```css
/* src/components/Radio/Radio.module.css */
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

.radio {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border-interactive-primary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s ease;
}

.radio:hover {
  border-color: var(--color-border-interactive-primary-hovered);
}

.checked {
  border-color: var(--color-primary-default);
}

.checked:hover {
  border-color: var(--color-primary-hovered);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary-default);
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
// src/components/Radio/index.ts
export { Radio } from './Radio'
export type { RadioProps } from './Radio'
```

- [ ] **Step 4: Radio.stories.tsx 작성**

```tsx
// src/components/Radio/Radio.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Radio>

export const Playground: Story = {
  args: {
    checked: false,
    disabled: false,
    label: '라디오 버튼',
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked)
    return <Radio {...args} checked={checked} onChange={() => setChecked(true)} />
  },
}

export const RadioGroup: Story = {
  name: 'Overview',
  render: function Render() {
    const [selected, setSelected] = useState('option1')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Radio
          label="옵션 1"
          name="group"
          value="option1"
          checked={selected === 'option1'}
          onChange={setSelected}
        />
        <Radio
          label="옵션 2"
          name="group"
          value="option2"
          checked={selected === 'option2'}
          onChange={setSelected}
        />
        <Radio
          label="옵션 3"
          name="group"
          value="option3"
          checked={selected === 'option3'}
          onChange={setSelected}
        />
        <Radio label="비활성화" disabled />
        <Radio label="비활성화 (선택됨)" checked disabled />
      </div>
    )
  },
}
```

- [ ] **Step 5: Storybook에서 Radio 확인 후 커밋**

```bash
npm run storybook
git add src/components/Radio/
git commit -m "feat: Radio 컴포넌트 구현 (선택, 미선택, 비활성화, 그룹)"
```

---