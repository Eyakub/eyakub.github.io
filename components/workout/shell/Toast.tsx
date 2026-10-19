import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

const ToastContext = createContext<(msg: string) => void>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  // The counter keys the toast so the same message twice in a row still replays its entrance
  const [toast, setToast] = useState<{ n: number; text: string } | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const show = useCallback((text: string) => {
    setToast((t) => ({ n: (t?.n ?? 0) + 1, text }))
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 2600)
  }, [])
  useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toast-slot" aria-live="polite">
        {toast && (
          <div className="toast" key={toast.n}>
            {toast.text}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
