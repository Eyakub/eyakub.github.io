import { migrate } from './doc'
import type { WorkoutDoc } from './types'

export const STORAGE_KEY = 'workout:doc'

export function loadDoc(): WorkoutDoc | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw == null ? null : migrate(JSON.parse(raw))
  } catch {
    return null
  }
}

export function saveDoc(doc: WorkoutDoc): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doc))
    return true
  } catch {
    // storage unavailable or full: the caller decides whether to warn
    return false
  }
}

export function clearDoc(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // nothing stored, or storage unavailable
  }
}
