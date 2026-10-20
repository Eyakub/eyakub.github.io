import { useMemo, useState } from 'react'
import { EXERCISE_BY_ID } from '../../../data/workout/exercises'
import { exerciseOptions, exerciseSeries, hitTopOfRange } from '../../../lib/workout/progress'
import { routinesWith } from '../../../lib/workout/rotation'
import type { WorkoutDoc } from '../../../lib/workout/types'
import { BarChart } from './BarChart'

const SESSIONS_SHOWN = 8

export function ExerciseSection({ doc }: { doc: WorkoutDoc }) {
  const options = useMemo(() => exerciseOptions(doc), [doc])
  const [picked, setPicked] = useState<string | null>(null)
  const id = options.find((o) => o.id === picked)?.id ?? options[0]?.id
  const series = useMemo(() => (id ? exerciseSeries(doc, id) : []), [doc, id])

  const unit = series[0]?.measure === 'seconds' ? 'seconds' : 'reps'
  const progression = id ? EXERCISE_BY_ID[id]?.progression : undefined
  const routine = id ? routinesWith(doc, id)[0] : undefined

  return (
    <section className="sec">
      <div className="sec-row">
        <h2>By exercise</h2>
        {options.length > 0 && (
          <select className="select" aria-label="Exercise" value={id} onChange={(e) => setPicked(e.target.value)}>
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <p className="prose">{options.length ? `Total ${unit} each session.` : 'Finish a workout and your reps will show up here.'}</p>
      {hitTopOfRange(series) && (
        <p className={routine ? `ready c-${routine.routineId}` : 'ready'}>
          <b>You hit the top of the range last time.</b> {progression}
        </p>
      )}
      <BarChart points={series.slice(-SESSIONS_SHOWN)} label={`Total ${unit} per session`} />
    </section>
  )
}
