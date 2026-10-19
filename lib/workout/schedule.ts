import { currentRoutine } from './doc'
import type { Id, WorkoutDoc } from './types'

/** Monday first, same order as WeekPlan. */
export const WEEKDAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/** Weekdays whose current routine version includes this exercise, e.g. ['Mon', 'Sat']. */
export function exerciseDays(doc: WorkoutDoc, exerciseId: Id): string[] {
  return doc.program.week.flatMap((plan, i) => {
    if (plan.kind !== 'routine') return []
    const routine = currentRoutine(doc, plan.routineId)
    return routine?.items.some((it) => it.exerciseId === exerciseId) ? [WEEKDAY_SHORT[i]] : []
  })
}
