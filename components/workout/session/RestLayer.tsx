import { useEffect, useRef } from 'react'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { formatRest } from '../../../lib/workout/format'
import { endRest, restLeft } from '../../../lib/workout/session'
import type { ActiveSession } from '../../../lib/workout/types'
import { Sheet } from '../shell/Sheet'
import { buzz, playChime } from './chime'
import { RestBody } from './RestBody'
import { useTick } from './useTick'

interface Props {
  active: ActiveSession
  minimised: boolean
  setMinimised: (minimised: boolean) => void
}

// A rest that ended longer ago than this (tab in the background, phone locked) shows "Go" without chiming
const STALE_MS = 10_000

// Owns the countdown while the sheet is open or shrunk to the pill, and fires the cue once when it hits 0.
export function RestLayer({ active, minimised, setMinimised }: Props) {
  const { doc, updateActive } = useWorkout()
  const rest = active.rest
  useTick(250, rest?.endsAt != null)
  const left = rest ? restLeft(rest, new Date()) : 0
  const up = rest !== null && rest.endsAt !== null && left <= 0
  const cued = useRef<string | null>(null)
  const sound = doc?.profile.sound ?? true

  useEffect(() => {
    if (!up || !rest?.endsAt || cued.current === rest.endsAt) return
    cued.current = rest.endsAt
    setMinimised(false)
    if (Date.now() - Date.parse(rest.endsAt) > STALE_MS) return
    if (sound) playChime()
    buzz()
  }, [up, rest?.endsAt, sound, setMinimised])

  if (!rest) return null
  const dismiss = () => (up ? updateActive((a) => endRest(a)) : setMinimised(true))

  return (
    <>
      <Sheet open={!minimised} onClose={dismiss} label="Rest timer">
        <RestBody active={active} rest={rest} left={left} up={up} onDismiss={dismiss} />
      </Sheet>
      {minimised && !up && (
        <button type="button" className="rest-pill" aria-label={`Rest ${formatRest(Math.ceil(left))}, show the timer`} onClick={() => setMinimised(false)}>
          Rest <span className="num">{formatRest(Math.ceil(left))}</span>
        </button>
      )}
    </>
  )
}
