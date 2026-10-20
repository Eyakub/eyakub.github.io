import { addDays, startOfWeek, toIsoDate } from './dates'
import { currentRoutine } from './doc'
import type { Id, IsoDate, RoutineVersion, SessionRecord, WorkoutDoc } from './types'

const byTime = (a: SessionRecord, b: SessionRecord) =>
  a.finishedAt < b.finishedAt ? -1 : a.finishedAt > b.finishedAt ? 1 : a.startedAt < b.startedAt ? -1 : a.startedAt > b.startedAt ? 1 : 0

const chronological = (doc: WorkoutDoc) => [...doc.sessions].sort(byTime)

/**
 * Routine ids done in the open cycle, in the order done. Sessions group into cycles from the first one
 * ever: a cycle closes once every routine in `order` is in it, so a skipped routine stays next.
 */
export function openCycle(doc: WorkoutDoc): Id[] {
  const { order } = doc.program
  let cycle: Id[] = []
  for (const s of chronological(doc)) {
    if (!order.includes(s.routineId)) continue
    if (!cycle.includes(s.routineId)) cycle.push(s.routineId)
    if (order.every((id) => cycle.includes(id))) cycle = []
  }
  return cycle
}

/** First routine in rotation order that is not in the open cycle. */
export function nextUp(doc: WorkoutDoc): Id {
  const done = openCycle(doc)
  return doc.program.order.find((id) => !done.includes(id)) ?? doc.program.order[0]
}

// Sessions whose date falls in the Monday-start week beginning at `monday`; `sorted` must be chronological.
function inWeek(sorted: SessionRecord[], monday: Date): SessionRecord[] {
  const from = toIsoDate(monday)
  const to = toIsoDate(addDays(monday, 7))
  return sorted.filter((s) => s.date >= from && s.date < to)
}

/** Sessions in the Monday to Sunday week containing `today`, oldest first. */
export function weekSessions(doc: WorkoutDoc, today: Date): SessionRecord[] {
  return inWeek(chronological(doc), startOfWeek(today))
}

/** The last `count` Monday-start weeks ending with the one containing `today`, oldest first. */
export function recentWeeks(doc: WorkoutDoc, today: Date, count: number): { start: IsoDate; sessions: SessionRecord[] }[] {
  const sorted = chronological(doc)
  const monday = startOfWeek(today)
  return Array.from({ length: Math.max(0, count) }, (_, i) => {
    const start = addDays(monday, -7 * (count - 1 - i))
    return { start: toIsoDate(start), sessions: inWeek(sorted, start) }
  })
}

/** Current versions of the routines that include this exercise, in rotation order. */
export function routinesWith(doc: WorkoutDoc, exerciseId: Id): RoutineVersion[] {
  return doc.program.order.flatMap((id) => {
    const routine = currentRoutine(doc, id)
    return routine?.items.some((it) => it.exerciseId === exerciseId) ? [routine] : []
  })
}
