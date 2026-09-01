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
