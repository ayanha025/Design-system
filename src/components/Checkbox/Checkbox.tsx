// src/components/Checkbox/Checkbox.tsx
import styles from './Checkbox.module.css'

export interface CheckboxProps {
  checked?: boolean
  disabled?: boolean
  label?: string
  onChange?: (checked: boolean) => void
}

export function Checkbox({
  checked = false,
  disabled = false,
  label,
  onChange,
}: CheckboxProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange?.(!checked)
    }
  }

  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
      <div
        className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
        onClick={handleChange}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.hiddenInput}
      />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
