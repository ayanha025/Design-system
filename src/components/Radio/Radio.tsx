// src/components/Radio/Radio.tsx
import styles from './Radio.module.css'

export interface RadioProps {
  checked?: boolean
  disabled?: boolean
  label?: string
  name?: string
  value?: string
  onChange?: (value: string) => void
}

export function Radio({
  checked = false,
  disabled = false,
  label,
  name,
  value = '',
  onChange,
}: RadioProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange?.(value)
    }
  }

  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
      <div
        className={`${styles.radio} ${checked ? styles.checked : ''}`}
        onClick={handleChange}
      >
        {checked && <div className={styles.dot} />}
      </div>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles.hiddenInput}
      />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
