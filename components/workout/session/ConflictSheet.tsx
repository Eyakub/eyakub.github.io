import { loggedSets } from '../../../lib/workout/session'
import type { ActiveSession } from '../../../lib/workout/types'
import { Sheet } from '../shell/Sheet'

interface Props {
  active: ActiveSession
  /** Name of the routine that was asked for. */
  wanted: string
  onResume: () => void
  onReplace: () => void
}

// Shown when a link asks for one workout while another is still open.
export function ConflictSheet({ active, wanted, onResume, onReplace }: Props) {
  const logged = loggedSets(active)
  return (
    <Sheet open onClose={onResume} label={`${active.routineName} is in progress`}>
      <div className="sheet-head">
        <h2>{active.routineName} is in progress</h2>
      </div>
      <p>
        {logged > 0
          ? `${logged} ${logged === 1 ? 'set is' : 'sets are'} logged so far. Starting ${wanted} deletes ${logged === 1 ? 'it' : 'them'}.`
          : `Nothing is logged yet. Pick up where you were, or start ${wanted} instead.`}
      </p>
      <div className="sheet-actions">
        <button type="button" className="btn btn-go" onClick={onResume}>
          Resume {active.routineName}
        </button>
        <button type="button" className="btn btn-danger" onClick={onReplace}>
          Discard it and start {wanted}
        </button>
      </div>
    </Sheet>
  )
}
