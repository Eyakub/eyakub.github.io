import { currentRoutine } from '../../../lib/workout/doc'
import { recentSummary, type WeekTotal } from '../../../lib/workout/progress'
import type { WorkoutDoc } from '../../../lib/workout/types'
import { WeeksChart } from './WeeksChart'

interface Props {
  doc: WorkoutDoc
  weeks: WeekTotal[]
}

export function WeeksSection({ doc, weeks }: Props) {
  const goal = doc.program.weeklyGoal
  const { weeks: finished, total, hits } = recentSummary(weeks)
  const routines = doc.program.order.flatMap((id) => {
    const r = currentRoutine(doc, id)
    return r ? [r] : []
  })

  let prose = `${total} ${total === 1 ? 'session' : 'sessions'} in the last ${finished} weeks. You hit ${goal} in ${hits} of them. Colours show which workout, so a missing one stands out.`
  if (doc.sessions.length === 0) prose = 'Your first workout will show up here.'
  else if (total === 0) prose = 'No finished weeks yet. Colours show which workout, so a missing one stands out.'

  return (
    <section className="sec">
      <h2>Sessions per week</h2>
      <p className="prose">{prose}</p>
      <WeeksChart weeks={weeks} goal={goal} />
      <ul className="legend">
        {routines.map((r) => (
          <li key={r.routineId} className={`c-${r.routineId}`}>
            <i className="sw" />
            {r.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
