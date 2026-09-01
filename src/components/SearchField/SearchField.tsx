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
