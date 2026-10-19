import { currentRoutine } from '../../../lib/workout/doc'
import type { DayPlan, RoutineVersion, WorkoutDoc } from '../../../lib/workout/types'

interface Labels {
  /** Hero heading: the routine name, "Recovery" or "Rest day". */
  title: string
  /** Full name for cards and screen readers. */
  name: string
  /** Week-strip label: Push, Pull, Legs, Full, Recov., Rest. */
  short: string
}

export type DayView =
  | (Labels & { kind: 'routine'; routine: RoutineVersion })
  | (Labels & { kind: 'recovery' })
  | (Labels & { kind: 'rest' })

const REST: DayView = { kind: 'rest', title: 'Rest day', name: 'Rest', short: 'Rest' }

export function dayView(doc: WorkoutDoc, plan: DayPlan): DayView {
  if (plan.kind === 'recovery') return { kind: 'recovery', title: 'Recovery', name: 'Active recovery', short: 'Recov.' }
  if (plan.kind === 'rest') return REST
  const routine = currentRoutine(doc, plan.routineId)
  if (!routine) return REST
  // First word keeps it to one line in a seventh of the screen: "Legs + Core" -> "Legs"
  return { kind: 'routine', title: routine.name, name: routine.name, short: routine.name.split(/[\s+]/)[0].slice(0, 5), routine }
}

export function totalSets(r: RoutineVersion): number {
  return r.items.reduce((n, it) => n + it.target.sets, 0)
}
