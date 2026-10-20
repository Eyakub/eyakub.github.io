import { inWords } from '../../../lib/workout/format'
import type { SessionRecord } from '../../../lib/workout/types'
import { Barbell } from './Barbell'

interface Props {
  sessions: SessionRecord[]
  goal: number
  /** Plays the load-on animation for the newest plate. */
  loadNewest?: boolean
}

export function WeekSection({ sessions, goal, loadNewest }: Props) {
  const done = sessions.length
  return (
    <section className="week" aria-label="This week">
      <div className="week-row">
        <h2>This week</h2>
        <p className="count">
          <b>{done}</b> of {goal}
        </p>
      </div>
      <Barbell sessions={sessions} goal={goal} loadNewest={loadNewest} />
      <p className="week-note">
        {done >= goal
          ? `${inWords(goal)} done. Anything else this week is a bonus.`
          : `${goal - done} more by Sunday, on any days that work.`}
      </p>
    </section>
  )
}
