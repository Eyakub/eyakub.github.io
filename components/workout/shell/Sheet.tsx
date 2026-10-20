import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  /** Accessible name for the dialog. */
  label: string
  children: ReactNode
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled])'

// Bottom sheet. Children only mount while it is open, so any form inside starts fresh each time.
export function Sheet({ open, onClose, label, children }: Props) {
  const panel = useRef<HTMLElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // [data-autofocus] lets a confirm sheet put focus on the safe choice instead of the destructive one
    const find = (sel: string) => panel.current?.querySelector<HTMLElement>(sel) ?? null
    const first = find('[data-autofocus]') ?? find('input') ?? find('.btn-go') ?? find('button')
    // preventScroll: the sheet is fixed, so focusing into it must not move the page behind it
    first?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = prevOverflow
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeRef.current()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return
      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey && active === firstItem) {
        e.preventDefault()
        lastItem.focus()
      } else if (!e.shiftKey && active === lastItem) {
        e.preventDefault()
        firstItem.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null
  return (
    <div className="sheet-wrap">
      <div className="scrim" onClick={onClose} />
      <section className="sheet" ref={panel} role="dialog" aria-modal="true" aria-label={label}>
        {children}
      </section>
    </div>
  )
}
