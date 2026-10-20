import type { ActiveSession } from '../../../lib/workout/types'
import { PauseIcon } from '../shell/icons'
import { Clock } from './Clock'

interface Props {
  active: ActiveSession
  onPause: () => void
  onEnd: () => void
}

export function SessionHeader({ active, onPause, onEnd }: Props) {
  const { step, exercises } = active
  const label = step < 0 ? 'Warm-up' : `Exercise ${step + 1} of ${exercises.length}`
  return (
    <header className={`wbar c-${active.routineId}`}>
      <button type="button" className="iconbtn" aria-label="Pause and go back" onClick={onPause}>
        <PauseIcon />
      </button>
      <div className="wbar-mid">
        <b>{active.routineName}</b>
        <Clock active={active} />
      </div>
      <button type="button" className="btn btn-quiet" onClick={onEnd}>
        End
      </button>
      <div className="wdots" role="img" aria-label={label}>
        <i className={step >= 0 ? 'on' : 'cur'} />
        {exercises.map((e, i) => (
          <i key={i} className={i === step ? 'cur' : e.skipped ? 'skip' : e.sets.every((s) => s.done) ? 'on' : ''} />
        ))}
      </div>
    </header>
  )
}
