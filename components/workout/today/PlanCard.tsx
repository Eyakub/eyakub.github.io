import { weekdayIndex } from '../../../lib/workout/dates'
import { planFor } from '../../../lib/workout/doc'
import { formatLoad, formatRest, formatTarget } from '../../../lib/workout/format'
import { WEEKDAY_SHORT } from '../../../lib/workout/schedule'
import type { WorkoutDoc } from '../../../lib/workout/types'
import { EXERCISE_BY_ID } from '../../../data/workout/exercises'
import { dayView } from './plan'

interface Props {
  doc: WorkoutDoc
  /** The day being previewed. */
  date: Date
  isToday: boolean
}

export function PlanCard({ doc, date, isToday }: Props) {
  const view = dayView(doc, planFor(doc, date))
  const day = WEEKDAY_SHORT[weekdayIndex(date)]

  if (view.kind === 'rest') {
    return (
      <section className="card">
        <div className="card-head">
          <h2 className="card-title">Rest day</h2>
          <span className="eyebrow">{day}</span>
        </div>
        <p className="day-meta">No training planned. Sleep and walk if you feel like it.</p>
      </section>
    )
  }

  if (view.kind === 'recovery') {
    return (
      <section className="card">
        <div className="card-head">
          <h2 className="card-title">Active recovery</h2>
          <span className="eyebrow">{day}</span>
        </div>
        <ul className="rec-list">
          {doc.program.recovery.map((r) => (
            <li key={r.name}>
              <span>{r.name}</span>
              <span className="plan-t">{r.dose}</span>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const { routine } = view
  const moves = routine.warmup.length
  return (
    <section className="card">
      <div className="card-head">
        <h2 className="card-title">{isToday ? 'Today’s plan' : `${day} · ${routine.name}`}</h2>
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
