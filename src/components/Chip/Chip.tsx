// src/components/Chip/Chip.tsx
import styles from './Chip.module.css'

export interface ChipProps {
  variant?: 'filled' | 'outlined'
  selected?: boolean
  disabled?: boolean
  onClose?: () => void
  onClick?: () => void
  children: React.ReactNode
}

export function Chip({
  variant = 'filled',
  selected = false,
  disabled = false,
  onClose,
  onClick,
  children,
}: ChipProps) {
  const className = [
    styles.chip,
    styles[variant],
    selected ? styles.selected : '',
  ].join(' ')

  return (
    <div
      className={className}
      onClick={disabled ? undefined : onClick}
      style={{ cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default', opacity: disabled ? 0.4 : 1 }}
    >
      <span className={styles.label}>{children}</span>
      {onClose && !disabled && (
        <button className={styles.closeButton} onClick={(e) => { e.stopPropagation(); onClose(); }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
