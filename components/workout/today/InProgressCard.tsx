import Link from 'next/link'
import { EXERCISE_BY_ID } from '../../../data/workout/exercises'
import { SESSION_HREF } from '../../../lib/workout/routes'
import type { ActiveSession } from '../../../lib/workout/types'
import { ExerciseFigure } from '../figure/ExerciseFigure'
import { Clock } from '../session/Clock'

// Takes the place of the Next up card while a workout is open.
export function InProgressCard({ active }: { active: ActiveSession }) {
  const where = active.step < 0 ? 'Warm-up' : `Exercise ${active.step + 1} of ${active.exercises.length}`
  const shown = active.exercises[Math.max(0, active.step)]
  return (
    <section className={`next c-${active.routineId}`} aria-label="Workout in progress">
      <div className="next-copy">
        <p className="next-label">{where}</p>
        <h1 className="next-name inprog-name">{active.routineName} in progress</h1>
        <p className="next-meta">
          <Clock active={active} /> elapsed{active.runningSince === null && ', paused'}
        </p>
      </div>
      {shown && <ExerciseFigure id={shown.exerciseId} aspect="auto" label={`${EXERCISE_BY_ID[shown.exerciseId]?.name ?? shown.name}, animated demonstration`} />}
      <Link className="btn-start" href={SESSION_HREF}>
        Resume
      </Link>
    </section>
  )
}
