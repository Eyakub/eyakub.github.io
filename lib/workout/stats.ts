import type { IsoDate, RoutineVersion, SessionRecord, WorkoutDoc } from './types'

export function sessionsOn(doc: WorkoutDoc, date: IsoDate): SessionRecord[] {
  return doc.sessions.filter((s) => s.date === date)
}

// 6 min of warm-up and changeovers, plus ~45 s of work per set and its rest.
export function estimateMinutes(r: RoutineVersion): number {
  const sec = r.items.reduce((sum, it) => sum + it.target.sets * (45 + it.restSec), 0)
  return Math.round((6 + sec / 60) / 5) * 5
}
