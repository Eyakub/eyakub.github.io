import Link from 'next/link'
import { EXERCISE_BY_ID } from '../../../data/workout/exercises'
import { sessionHref } from '../../../lib/workout/routes'
import { estimateMinutes } from '../../../lib/workout/stats'
import type { RoutineVersion } from '../../../lib/workout/types'
import { ExerciseFigure } from '../figure/ExerciseFigure'

export function NextUpCard({ routine }: { routine: RoutineVersion }) {
  const count = routine.items.length
  const first = routine.items[0]?.exerciseId
  return (
    <section className={`next c-${routine.routineId}`} aria-label="Next workout">
      <div className="next-copy">
        <p className="next-label">Next up</p>
        <h1 className="next-name">{routine.name}</h1>
        <p className="next-meta">
          {count} {count === 1 ? 'exercise' : 'exercises'}
          <br />
          about {estimateMinutes(routine)} min
        </p>
      </div>
      {first && <ExerciseFigure id={first} aspect="auto" label={`${EXERCISE_BY_ID[first]?.name ?? first}, animated demonstration`} />}
      <Link className="btn-start" href={sessionHref(routine.routineId)}>
        Start {routine.name}
      </Link>
    </section>
  )
}
