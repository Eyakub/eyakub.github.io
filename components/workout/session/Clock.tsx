import { elapsedSec } from '../../../lib/workout/session'
import { formatRest } from '../../../lib/workout/format'
import type { ActiveSession } from '../../../lib/workout/types'
import { useTick } from './useTick'

/** Elapsed training time as m:ss; only ticks while the clock is running. */
export function Clock({ active }: { active: ActiveSession }) {
  useTick(250, active.runningSince !== null)
  return <span className="num">{formatRest(elapsedSec(active, new Date()))}</span>
}
