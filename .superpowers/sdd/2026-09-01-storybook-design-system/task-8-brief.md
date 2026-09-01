### Task 8: 2차 컴포넌트 — SelectField

**Files:**
- Create: `src/components/SelectField/SelectField.tsx`
- Create: `src/components/SelectField/SelectField.module.css`
- Create: `src/components/SelectField/SelectField.stories.tsx`
- Create: `src/components/SelectField/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css`
- Produces: `<SelectField>` — `label`, `options`, `placeholder`, `disabled`, `error`, `value`, `onChange` props

- [ ] **Step 1: SelectField.tsx 작성**

```tsx
// src/components/SelectField/SelectField.tsx
import { useState, useRef, useEffect } from 'react'
import styles from './SelectField.module.css'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectFieldProps {
  label?: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  error?: boolean
  helperText?: string
  value?: string
  onChange?: (value: string) => void
}

export function SelectField({
  label,
  options,
  placeholder = '선택하세요',
  disabled = false,
  error = false,
  helperText,
  value,
  onChange,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value ?? '')
  const ref = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(o => o.value === selectedValue)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const triggerClassName = [
    styles.trigger,
    isOpen ? styles.focused : '',
    error ? styles.error : '',
  ].join(' ')

  return (
    <div className={styles.wrapper} ref={ref}>
      {label && <label className={styles.label}>{label}</label>}
      <button
        className={triggerClassName}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        type="button"
      >
        <span className={selectedOption ? styles.value : styles.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map(option => (
            <li
              key={option.value}
              className={`${styles.option} ${option.value === selectedValue ? styles.optionSelected : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {helperText && (
        <span className={error ? styles.helperError : styles.helper}>
          {helperText}
        </span>
      )}
    </div>
  )
}
```

- [ ] **Step 2: SelectField.module.css 작성**

```css
/* src/components/SelectField/SelectField.module.css */
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  position: relative;
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

.trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  letter-spacing: var(--letter-spacing);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-8) var(--spacing-12);
  cursor: pointer;
  outline: none;
  width: 100%;
  text-align: left;
}

.trigger:disabled {
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

.value {
  color: var(--color-label-primary);
}

.placeholder {
  color: var(--color-label-disabled);
}

.arrow {
  color: var(--color-label-tertiary);
  transition: transform 0.15s ease;
  flex-shrink: 0;
}

.arrowOpen {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--spacing-4);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  list-style: none;
  padding: var(--spacing-4) 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.option {
  font-family: var(--font-family);
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  letter-spacing: var(--letter-spacing);
  color: var(--color-label-primary);
  padding: var(--spacing-8) var(--spacing-12);
  cursor: pointer;
}

.option:hover {
  background-color: var(--color-bg-secondary);
}

.optionSelected {
  background-color: var(--color-bg-selected);
  color: var(--color-primary-default);
  font-weight: var(--font-weight-medium);
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

- [ ] **Step 3: index.ts + SelectField.stories.tsx 작성**

```ts
// src/components/SelectField/index.ts
export { SelectField } from './SelectField'
export type { SelectFieldProps, SelectOption } from './SelectField'
```

```tsx
// src/components/SelectField/SelectField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { SelectField } from './SelectField'

const sampleOptions = [
  { label: '옵션 1', value: 'opt1' },
  { label: '옵션 2', value: 'opt2' },
  { label: '옵션 3', value: 'opt3' },
  { label: '옵션 4', value: 'opt4' },
]

const meta: Meta<typeof SelectField> = {
  title: 'Components/SelectField',
  component: SelectField,
}

export default meta
type Story = StoryObj<typeof SelectField>

export const Playground: Story = {
  args: {
    label: '라벨',
    options: sampleOptions,
    placeholder: '선택하세요',
    disabled: false,
    error: false,
  },
}

export const AllStates: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '320px' }}>
      <SelectField label="기본" options={sampleOptions} placeholder="선택하세요" />
      <SelectField label="에러" options={sampleOptions} error helperText="필수 선택 항목입니다" />
      <SelectField label="비활성화" options={sampleOptions} disabled />
    </div>
  ),
}
```

- [ ] **Step 4: Storybook에서 확인 후 커밋**

```bash
npm run storybook
git add src/components/SelectField/
git commit -m "feat: SelectField 컴포넌트 구현 (드롭다운, 에러, 비활성화)"
```

---