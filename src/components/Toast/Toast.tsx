// src/components/Toast/Toast.tsx
import styles from './Toast.module.css'
import iconSuccess from './assets/icon-success.svg'
import iconWarning from './assets/icon-warning.svg'
import iconError from './assets/icon-error.svg'
import glowSuccess from './assets/glow-success.svg'
import glowWarning from './assets/glow-warning.svg'
import glowError from './assets/glow-error.svg'

export interface ToastProps {
  type?: 'success' | 'warning' | 'error'
  message: string
  description?: string
  icon?: boolean
}

const assets = {
  success: { icon: iconSuccess, glow: glowSuccess },
  warning: { icon: iconWarning, glow: glowWarning },
  error: { icon: iconError, glow: glowError },
}

export function Toast({ type = 'success', message, description, icon = true }: ToastProps) {
  const className = [
    styles.toast,
    description ? styles.twoLines : styles.oneLine,
  ].join(' ')

  return (
    <div className={className} role="status">
      <img className={styles.glow} src={assets[type].glow} width={212} height={212} alt="" />
      {icon && (
        <img className={styles.icon} src={assets[type].icon} width={24} height={24} alt="" />
      )}
      <div className={styles.textBlock}>
        <p className={styles.message}>{message}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  )
}
