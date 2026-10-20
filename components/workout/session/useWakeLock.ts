import { useEffect } from 'react'

// Keeps the screen on while a workout is open. The browser drops the lock whenever the tab is hidden,
// so it is asked for again when the tab is visible. Anything that goes wrong just means the screen may dim.
export function useWakeLock(): void {
  useEffect(() => {
    if (!('wakeLock' in navigator)) return
    let sentinel: WakeLockSentinel | null = null
    let stopped = false

    const request = async () => {
      if (sentinel && !sentinel.released) return
      try {
        const lock = await navigator.wakeLock.request('screen')
        if (stopped) void lock.release().catch(() => {})
        else sentinel = lock
      } catch {
        // refused (low battery, background tab): not worth telling anyone
      }
    }
    const onVisible = () => {
      if (document.visibilityState === 'visible') void request()
    }

    void request()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      stopped = true
      document.removeEventListener('visibilitychange', onVisible)
      void sentinel?.release().catch(() => {})
    }
  }, [])
}
