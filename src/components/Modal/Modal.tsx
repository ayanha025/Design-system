'use client'

// src/components/Modal/Modal.tsx
import { useId } from 'react'
import { createPortal } from 'react-dom'
import { useDialog, useIsMounted } from '../shared/useDialog'
import styles from './Modal.module.css'

export interface ModalProps {
  isOpen: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  /** title이 없을 때 스크린리더가 읽을 이름 */
  'aria-label'?: string
}

export function Modal({ isOpen, title, onClose, children, footer, className, 'aria-label': ariaLabel }: ModalProps) {
  const mounted = useIsMounted()
  const panelRef = useDialog<HTMLDivElement>(isOpen && mounted, onClose)
  const titleId = useId()

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={panelRef}
        className={[styles.modal, className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title && <h2 id={titleId} className={styles.title}>{title}</h2>}
          <button className={styles.closeButton} onClick={onClose} type="button" aria-label="닫기">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
