// src/components/Button/Button.tsx
import styles from './Button.module.css'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  const className = [
    styles.button,
    styles[variant],
    styles[size],
  ].join(' ')

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
