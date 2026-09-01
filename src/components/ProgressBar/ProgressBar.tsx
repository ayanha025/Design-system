// src/components/ProgressBar/ProgressBar.tsx
import styles from './ProgressBar.module.css'

export interface ProgressBarProps {
  value: number
  showLabel?: boolean
}

export function ProgressBar({ value, showLabel = false }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>{clampedValue}%</span>
      )}
    </div>
  )
}
