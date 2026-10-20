import { parseIsoDate, weekdayLong, weekdayShort } from '../../../lib/workout/dates'
import type { SessionRecord } from '../../../lib/workout/types'

interface Props {
  /** This week's sessions, oldest first. */
  sessions: SessionRecord[]
  goal: number
  /** Slides the newest plate onto the bar. */
  loadNewest?: boolean
}

const SLOT = 46
const FIRST = 80

// One plate per session, coloured by workout. Empty dashed slots fill up to the goal; extra sessions add plates.
export function Barbell({ sessions, goal, loadNewest }: Props) {
  const slots = Math.max(goal, sessions.length)
  const width = Math.max(340, FIRST + slots * SLOT + 4)
  const names = sessions.map((s) => `${s.routineName} on ${weekdayLong(parseIsoDate(s.date))}`)
  const label = `${sessions.length} of ${goal} sessions this week${names.length ? `: ${names.join(', ')}` : ''}`

  return (
    <svg className="barbell" viewBox={`0 0 ${width} 134`} role="img" aria-label={label}>
      <rect className="bb-shaft" x="0" y="54" width="70" height="8" rx="2" />
      <rect className="bb-collar" x="62" y="40" width="12" height="36" rx="3" />
      <rect className="bb-sleeve" x="74" y="51" width={width - 78} height="14" rx="3" />
      {Array.from({ length: slots }, (_, i) => {
        const x = FIRST + i * SLOT
        const s = sessions[i]
        if (!s) return <rect key={i} className="pl-empty" x={x} y="4" width="38" height="108" rx="7" />
        return (
          <g key={s.id} className={loadNewest && i === sessions.length - 1 ? 'bb-plate is-new' : 'bb-plate'}>
            <rect className={`pl pl-${s.routineId}`} x={x} y="4" width="38" height="108" rx="7" />
            <rect className="pl-ring" x={x + 5} y="10" width="28" height="96" rx="5" />
            <text x={x + 19} y="128" textAnchor="middle">
              {weekdayShort(parseIsoDate(s.date))}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
