import { useEffect, useRef, useState } from 'react'
import { loggedSets, plannedSets } from '../../../lib/workout/session'
import type { ActiveSession } from '../../../lib/workout/types'
import { Sheet } from '../shell/Sheet'

interface Props {
  open: boolean
  active: ActiveSession
  onKeepGoing: () => void
  onSave: () => void
  onDiscard: () => void
}

// The sheet only moves focus when it opens, so the safe choice asks for it when this view replaces the first one
function DiscardConfirm({ name, onDiscard, onKeep }: { name: string; onDiscard: () => void; onKeep: () => void }) {
  const keep = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    keep.current?.focus({ preventScroll: true })
  }, [])
  return (
    <>
      <div className="sheet-head">
        <h2>Discard {name}?</h2>
      </div>
      <p>The sets you logged are deleted.</p>
      <div className="sheet-actions">
        <button type="button" className="btn btn-danger" onClick={onDiscard}>
          Discard
        </button>
        <button type="button" className="btn btn-quiet" ref={keep} onClick={onKeep}>
          Keep it
        </button>
      </div>
    </>
  )
}

function EndBody({ active, onKeepGoing, onSave, onDiscard }: Omit<Props, 'open'>) {
  const [confirming, setConfirming] = useState(false)
  const logged = loggedSets(active)
  const planned = plannedSets(active)
  const name = active.routineName

  if (confirming) return <DiscardConfirm name={name} onDiscard={onDiscard} onKeep={() => setConfirming(false)} />

  const nothing = logged === 0
  return (
    <>
      <div className="sheet-head">
        <h2>{logged === planned ? `Finish ${name}?` : `End ${name} now?`}</h2>
      </div>
      <p>
        {nothing
          ? 'Nothing logged yet. Keep going, or discard it.'
          : logged === planned
            ? 'Every set is logged.'
            : `You logged ${logged} of ${planned} sets. What you did is saved, and it counts toward your week.`}
      </p>
      <div className="sheet-actions">
        {!nothing && (
          <button type="button" className="btn btn-go" onClick={onSave}>
            Save and finish
          </button>
        )}
        <button type="button" className="btn btn-quiet" data-autofocus onClick={onKeepGoing}>
          Keep going
        </button>
        <button type="button" className="btn btn-danger" onClick={() => setConfirming(true)}>
          Discard this session
        </button>
      </div>
    </>
  )
}

export function EndSheet({ open, ...rest }: Props) {
  return (
    <Sheet open={open} onClose={rest.onKeepGoing} label="End workout">
      <EndBody {...rest} />
    </Sheet>
  )
}
