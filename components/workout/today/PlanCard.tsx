import { formatLoad, formatRest, formatTarget } from '../../../lib/workout/format'
import type { RoutineVersion } from '../../../lib/workout/types'
import { EXERCISE_BY_ID } from '../../../data/workout/exercises'

export function PlanCard({ routine }: { routine: RoutineVersion }) {
  const moves = routine.warmup.length
  return (
    <section className="card">
      <div className="card-head">
        <h2 className="card-title">The plan</h2>
        <span className="eyebrow">
          {routine.name} v{routine.version}
        </span>
      </div>
      <div className="warm-line">
        <span>
          Warm-up · {moves} {moves === 1 ? 'move' : 'moves'}
        </span>
        <span className="num">about 6 min</span>
      </div>
      <ul className="plan">
        {routine.items.map((it) => {
          const ex = EXERCISE_BY_ID[it.exerciseId]
          return (
            <li key={it.exerciseId}>
              <span className="plan-n">{ex?.name ?? it.exerciseId}</span>
              <span className="plan-t num">{formatTarget(it.target, ex?.measure ?? 'reps')}</span>
              <span className="plan-l">
                {formatLoad(it.load)} · rest {formatRest(it.restSec)}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
