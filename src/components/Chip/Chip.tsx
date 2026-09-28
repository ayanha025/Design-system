// src/components/Chip/Chip.tsx
import { forwardRef } from 'react'
import styles from './Chip.module.css'

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'filled' | 'outlined'
  selected?: boolean
  disabled?: boolean
  onClose?: () => void
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  { variant = 'filled', selected = false, disabled = false, onClose, onClick, className, style, children, ...rest },
  ref,
) {
  const classNames = [
    styles.chip,
    styles[variant],
    selected ? styles.selected : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div
      ref={ref}
      className={classNames}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      style={{ cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default', opacity: disabled ? 0.4 : 1, ...style }}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
      {onClose && !disabled && (
        <button
          className={styles.closeButton}
          type="button"
          aria-label="삭제"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
})
