import { useRouter } from 'next/router'
import { formatDay, parseIsoDate } from '../../../lib/workout/dates'
import { currentRoutine } from '../../../lib/workout/doc'
import { formatRest } from '../../../lib/workout/format'
import { nextUp, weekSessions } from '../../../lib/workout/rotation'
import { TODAY_LOADED_HREF } from '../../../lib/workout/routes'
import { loggedSets, plannedSets, repsLogged } from '../../../lib/workout/session'
import type { SessionRecord, WorkoutDoc } from '../../../lib/workout/types'

interface Props {
  record: SessionRecord
  /** The doc after saving, so this week's count and the next routine include this session. */
  doc: WorkoutDoc
}

export function DoneView({ record, doc }: Props) {
  const router = useRouter()
  const next = currentRoutine(doc, nextUp(doc))
  const week = weekSessions(doc, new Date()).length
  return (
    <div className="screen done-screen">
      <p className="lbl">Saved for {formatDay(parseIsoDate(record.date))}</p>
      <h1 className="page-title">{record.routineName} done</h1>
      <dl className="facts facts-big">
        <div>
          <dt>Time</dt>
          <dd>{formatRest(record.durationSec)}</dd>
        </div>
        <div>
          <dt>Sets</dt>
          <dd>
            {loggedSets(record)} of {plannedSets(record)}
          </dd>
        </div>
        <div>
          <dt>Reps</dt>
          <dd>{repsLogged(record)}</dd>
        </div>
      </dl>
      <p className="prose">
        This week: {week} of {doc.program.weeklyGoal}.{next && <> Next in the rotation: <b>{next.name}</b>.</>}
      </p>
      {/* replace, so Back from Today doesn't land on a session page with nothing in it */}
      <button type="button" className="btn btn-go btn-wide" onClick={() => void router.replace(TODAY_LOADED_HREF)}>
        Back to today
      </button>
    </div>
  )
}
