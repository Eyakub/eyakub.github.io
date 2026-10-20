import { useWorkout } from '../../../contexts/WorkoutContext'
import { adjustRest, endRest, pauseRest, restLines, resumeRest } from '../../../lib/workout/session'
import type { ActiveSession, RestState } from '../../../lib/workout/types'
import { ChevronDownIcon } from '../shell/icons'
import { Switch } from '../shell/Switch'
import { RestDial } from './RestDial'

interface Props {
  active: ActiveSession
  rest: RestState
  left: number
  up: boolean
  /** Scrim, Escape and the chevron all land here. */
  onDismiss: () => void
}

export function RestBody({ active, rest, left, up, onDismiss }: Props) {
  const { doc, updateActive, updateProfile } = useWorkout()
  const { label, next } = restLines(active, rest.after)
  const paused = rest.endsAt === null

  return (
    <>
      <div className="sheet-head sheet-head-c">
        <h2>Rest</h2>
        <button type="button" className="iconbtn" aria-label="Hide the timer" onClick={onDismiss}>
          <ChevronDownIcon />
        </button>
      </div>
      <RestDial routineId={active.routineId} left={left} total={rest.totalSec} up={up} />
      <p className="sr-only" role="status">
        {up ? 'Rest is over. Start your next set.' : ''}
      </p>
      <p className="rest-next">
        {label}
        <br />
        <b>{next}</b>
      </p>
      <div className="rest-ctl">
        <button type="button" className="btn btn-quiet" onClick={() => updateActive((a, now) => adjustRest(a, -15, now))}>
          −15 s
        </button>
        <button
          type="button"
          className="btn btn-go"
          onClick={() => updateActive((a, now) => (up ? endRest(a) : paused ? resumeRest(a, now) : pauseRest(a, now)))}
        >
          {up ? 'Start next set' : paused ? 'Resume' : 'Pause'}
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => updateActive((a, now) => adjustRest(a, 15, now))}>
          +15 s
        </button>
      </div>
      <div className="rest-foot">
        <label className="lbl-switch">
          <Switch checked={doc?.profile.sound ?? true} onChange={(sound) => updateProfile({ sound })} label="Sound when rest ends" />
          Sound
        </label>
        <button type="button" className="link" onClick={() => updateActive((a) => endRest(a))}>
          Skip rest
        </button>
      </div>
    </>
  )
}
