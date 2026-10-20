import { useEffect, useState } from 'react'
import { toIsoDate } from '../../../lib/workout/dates'

// A tab left open overnight should roll over to the next day when you come back to it
export function useToday(): Date {
  const [today, setToday] = useState(() => new Date())
  useEffect(() => {
    const refresh = () =>
      setToday((prev) => {
        const now = new Date()
        return toIsoDate(now) === toIsoDate(prev) ? prev : now
      })
    document.addEventListener('visibilitychange', refresh)
    return () => document.removeEventListener('visibilitychange', refresh)
  }, [])
  return today
}
