import type { RoutineVersion } from '../../../lib/workout/types'

export function totalSets(r: RoutineVersion): number {
  return r.items.reduce((n, it) => n + it.target.sets, 0)
}
