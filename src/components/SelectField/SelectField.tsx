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
