// src/components/SelectField/SelectField.tsx
import { forwardRef, useState, useRef, useEffect, useId } from 'react'
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
  defaultValue?: string
  onChange?: (value: string) => void
  id?: string
  className?: string
}

export const SelectField = forwardRef<HTMLButtonElement, SelectFieldProps>(function SelectField(
  {
    label,
    options,
    placeholder = '선택하세요',
    disabled = false,
    error = false,
    helperText,
    value,
    defaultValue,
    onChange,
    id,
    className,
  },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false)
  // value가 없으면 비제어 모드로 동작
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const selectedValue = value ?? internalValue
  const wrapperRef = useRef<HTMLDivElement>(null)
  const generatedId = useId()
  const triggerId = id ?? generatedId
  const labelId = `${triggerId}-label`
  const helperId = `${triggerId}-helper`

  const selectedOption = options.find(o => o.value === selectedValue)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    if (value === undefined) setInternalValue(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const triggerClassName = [
    styles.trigger,
    isOpen ? styles.focused : '',
    error ? styles.error : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')} ref={wrapperRef}>
      {label && <label className={styles.label} id={labelId} htmlFor={triggerId}>{label}</label>}
      <button
        ref={ref}
        id={triggerId}
        className={triggerClassName}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={error || undefined}
        aria-describedby={helperText ? helperId : undefined}
      >
        <span className={selectedOption ? styles.value : styles.placeholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <ul className={styles.dropdown} role="listbox" aria-labelledby={label ? labelId : undefined}>
          {options.map(option => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === selectedValue}
              className={`${styles.option} ${option.value === selectedValue ? styles.optionSelected : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {helperText && (
        <span id={helperId} className={error ? styles.helperError : styles.helper}>
          {helperText}
        </span>
      )}
    </div>
  )
})
