### Task 9: 2차 컴포넌트 — SearchField

**Files:**
- Create: `src/components/SearchField/SearchField.tsx`
- Create: `src/components/SearchField/SearchField.module.css`
- Create: `src/components/SearchField/SearchField.stories.tsx`
- Create: `src/components/SearchField/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`
- Produces: `<SearchField>` — `placeholder`, `disabled`, `value`, `onChange`, `onClear` props

- [ ] **Step 1: SearchField.tsx + CSS + Stories 작성**

```tsx
// src/components/SearchField/SearchField.tsx
import { useState } from 'react'
import styles from './SearchField.module.css'

export interface SearchFieldProps {
  placeholder?: string
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
}

export function SearchField({
  placeholder = '검색어를 입력하세요',
  disabled = false,
  value,
  onChange,
  onClear,
}: SearchFieldProps) {
  const [internalValue, setInternalValue] = useState(value ?? '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)
    onChange?.(newValue)
  }

  const handleClear = () => {
    setInternalValue('')
    onChange?.('')
    onClear?.()
  }

  return (
    <div className={styles.wrapper}>
      <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        value={internalValue}
        onChange={handleChange}
      />
      {internalValue && !disabled && (
        <button className={styles.clearButton} onClick={handleClear} type="button">
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
/* src/components/SearchField/SearchField.module.css */
.wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-8) var(--spacing-12);
  width: 100%;
}

.wrapper:focus-within {
  border-color: var(--color-border-interactive-primary);
}

.searchIcon {
  color: var(--color-label-tertiary);
  flex-shrink: 0;
}

.input {
  flex: 1;
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  letter-spacing: var(--letter-spacing);
  color: var(--color-label-primary);
  border: none;
  outline: none;
  background: transparent;
}

.input::placeholder {
  color: var(--color-label-disabled);
}

.input:disabled {
  color: var(--color-label-disabled);
  cursor: not-allowed;
}

.clearButton {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-label-tertiary);
}

.clearButton:hover {
  color: var(--color-label-primary);
}
```

```ts
// src/components/SearchField/index.ts
export { SearchField } from './SearchField'
export type { SearchFieldProps } from './SearchField'
```

```tsx
// src/components/SearchField/SearchField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { SearchField } from './SearchField'

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
}

export default meta
type Story = StoryObj<typeof SearchField>

export const Playground: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    disabled: false,
  },
}

export const AllStates: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <SearchField placeholder="검색어를 입력하세요" />
      <SearchField placeholder="비활성화" disabled />
    </div>
  ),
}
```

- [ ] **Step 2: Storybook에서 확인 후 커밋**

```bash
npm run storybook
git add src/components/SearchField/
git commit -m "feat: SearchField 컴포넌트 구현 (검색 아이콘, 클리어 버튼)"
```

---