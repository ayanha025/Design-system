'use client'

// src/components/TextField/TextField.tsx
import { forwardRef, useId } from 'react'
import styles from './TextField.module.css'

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
  helperText?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error = false, helperText, id, className, ...rest },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const helperId = `${inputId}-helper`

  const inputClassName = [
    styles.input,
    error ? styles.error : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
      <input
        ref={ref}
        id={inputId}
        className={inputClassName}
        aria-invalid={error || undefined}
        aria-describedby={helperText ? helperId : undefined}
        {...rest}
      />
      {helperText && (
        <span id={helperId} className={error ? styles.helperError : styles.helper}>
          {helperText}
        </span>
      )}
    </div>
  )
})
