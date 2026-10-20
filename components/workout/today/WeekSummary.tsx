import { weekSessions } from '../../../lib/workout/rotation'
import type { WorkoutDoc } from '../../../lib/workout/types'

interface Props {
  doc: WorkoutDoc
  today: Date
}

export function WeekSummary({ doc, today }: Props) {
  const done = weekSessions(doc, today).length
  const goal = doc.program.weeklyGoal
  return (
    <div className="week-sum">
      <p className="day-meta">
        <strong className="num">
          {done} of {goal}
        </strong>{' '}
        this week
      </p>
      <div className="weekdots" aria-hidden="true">
        {Array.from({ length: goal }, (_, i) => (
          <span key={i} className={i < done ? 'on' : ''} />
        ))}
      </div>
    </div>
  )
}
