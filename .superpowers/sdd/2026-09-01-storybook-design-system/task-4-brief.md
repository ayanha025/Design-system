### Task 4: TextField 컴포넌트

**Files:**
- Create: `src/components/TextField/TextField.tsx`
- Create: `src/components/TextField/TextField.module.css`
- Create: `src/components/TextField/TextField.stories.tsx`
- Create: `src/components/TextField/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`
- Produces: `<TextField>` — `label`, `placeholder`, `error`, `helperText`, `disabled`, `value`, `onChange` props

- [ ] **Step 1: TextField.tsx 작성**

```tsx
// src/components/TextField/TextField.tsx
import { useState } from 'react'
import styles from './TextField.module.css'

export interface TextFieldProps {
  label?: string
  placeholder?: string
  error?: boolean
  helperText?: string
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
}

export function TextField({
  label,
  placeholder,
  error = false,
  helperText,
  disabled = false,
  value,
  onChange,
}: TextFieldProps) {
  const [internalValue, setInternalValue] = useState(value ?? '')
  const [focused, setFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)
    onChange?.(newValue)
  }

  const inputClassName = [
    styles.input,
    error ? styles.error : '',
    focused ? styles.focused : '',
  ].join(' ')

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={inputClassName}
        placeholder={placeholder}
        disabled={disabled}
        value={internalValue}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {helperText && (
        <span className={error ? styles.helperError : styles.helper}>
          {helperText}
        </span>
      )}
    </div>
  )
}
```

- [ ] **Step 2: TextField.module.css 작성**

```css
/* src/components/TextField/TextField.module.css */
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  width: 100%;
}

.label {
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-20);
  color: var(--color-label-primary);
  letter-spacing: var(--letter-spacing);
}

.input {
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  letter-spacing: var(--letter-spacing);
  color: var(--color-label-primary);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-8) var(--spacing-12);
  outline: none;
  transition: border-color 0.15s ease;
}

.input::placeholder {
  color: var(--color-label-disabled);
}

.input:disabled {
  background-color: var(--color-bg-secondary);
  color: var(--color-label-disabled);
  cursor: not-allowed;
}

.focused {
  border-color: var(--color-border-interactive-primary);
}

.error {
  border-color: var(--color-state-error);
}

.helper {
  font-family: var(--font-family);
  font-size: var(--font-size-12);
  line-height: var(--line-height-18);
  color: var(--color-label-tertiary);
  letter-spacing: var(--letter-spacing);
}

.helperError {
  font-family: var(--font-family);
  font-size: var(--font-size-12);
  line-height: var(--line-height-18);
  color: var(--color-state-error);
  letter-spacing: var(--letter-spacing);
}
```

- [ ] **Step 3: index.ts barrel export 작성**

```ts
// src/components/TextField/index.ts
export { TextField } from './TextField'
export type { TextFieldProps } from './TextField'
```

- [ ] **Step 4: TextField.stories.tsx 작성**

```tsx
// src/components/TextField/TextField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from './TextField'

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof TextField>

export const Playground: Story = {
  args: {
    label: '라벨',
    placeholder: '텍스트를 입력하세요',
    helperText: '도움말 텍스트',
    error: false,
    disabled: false,
  },
}

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <TextField label="기본" placeholder="텍스트를 입력하세요" />
      <TextField label="도움말 포함" placeholder="텍스트를 입력하세요" helperText="도움말 텍스트입니다" />
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <TextField
        label="에러 상태"
        placeholder="텍스트를 입력하세요"
        error
        helperText="필수 입력 항목입니다"
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: '320px' }}>
      <TextField
        label="비활성화"
        placeholder="입력할 수 없습니다"
        disabled
      />
    </div>
  ),
}

export const AllStates: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <TextField label="기본" placeholder="텍스트를 입력하세요" />
      <TextField label="도움말" placeholder="텍스트를 입력하세요" helperText="도움말 텍스트" />
      <TextField label="에러" placeholder="텍스트를 입력하세요" error helperText="에러 메시지" />
      <TextField label="비활성화" placeholder="입력 불가" disabled />
    </div>
  ),
}
```

- [ ] **Step 5: Storybook에서 TextField 확인**

```bash
npm run storybook
```

Components → TextField에서 모든 상태가 올바르게 렌더링되는지 확인.

- [ ] **Step 6: 커밋**

```bash
git add src/components/TextField/
git commit -m "feat: TextField 컴포넌트 구현 (기본, 에러, 비활성화 상태)"
```

---