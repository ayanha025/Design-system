// src/components/Radio/Radio.tsx
import { forwardRef } from 'react'
import styles from './Radio.module.css'

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { checked = false, disabled = false, label, className, ...rest },
  ref,
) {
  const wrapperClassName = [
    styles.wrapper,
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <label className={wrapperClassName}>
      <input
        ref={ref}
        type="radio"
        checked={checked}
        disabled={disabled}
        className={styles.hiddenInput}
        {...rest}
      />
      <div aria-hidden="true" className={`${styles.radio} ${checked ? styles.checked : ''}`}>
        {checked && <div className={styles.dot} />}
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
})
