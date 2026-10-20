import { useEffect, useReducer } from 'react'

/**
 * Re-renders on an interval and when the tab comes back. Callers read `new Date()` while rendering, so what is
 * on screen never lags the last tick: a button press that moves a deadline shows the new time straight away.
 */
export function useTick(intervalMs: number, enabled = true): void {
  const [, tick] = useReducer((n: number) => n + 1, 0)
  useEffect(() => {
    if (!enabled) return
    const id = setInterval(tick, intervalMs)
    document.addEventListener('visibilitychange', tick)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [intervalMs, enabled])
}
