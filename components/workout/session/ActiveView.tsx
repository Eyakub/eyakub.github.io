import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { TODAY_HREF } from '../../../lib/workout/routes'
import { pauseClock, startRest, toggleDone } from '../../../lib/workout/session'
import type { ActiveSession, SessionRecord, WorkoutDoc } from '../../../lib/workout/types'
import { unlockAudio } from './chime'
import { EndSheet } from './EndSheet'
import { ExerciseStep } from './ExerciseStep'
import { RestLayer } from './RestLayer'
import { SessionHeader } from './SessionHeader'
import { useWakeLock } from './useWakeLock'
import { WarmupStep } from './WarmupStep'

interface Props {
  active: ActiveSession
  doc: WorkoutDoc
  onSaved: (record: SessionRecord) => void
}

// A workout in progress: header, the current step, the rest timer and the end sheet.
export function ActiveView({ active, doc, onSaved }: Props) {
  const router = useRouter()
  const { updateActive, finishSession, discardSession } = useWorkout()
  const [ending, setEnding] = useState(false)
  const [restMin, setRestMin] = useState(false)
  const [openFolds, setOpenFolds] = useState<ReadonlySet<string>>(() => new Set(['how']))

  useWakeLock()

  // Browsers only start audio from a tap; the first one in the session readies the rest chime
  useEffect(() => {
    document.addEventListener('click', unlockAudio)
    return () => document.removeEventListener('click', unlockAudio)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [active.step])

  const onFold = useCallback(
    (key: string, open: boolean) =>
      setOpenFolds((prev) => (prev.has(key) === open ? prev : new Set(open ? [...prev, key] : [...prev].filter((k) => k !== key)))),
    [],
  )

  const tick = (exercise: number, set: number, fallback: number) => {
    let started = false
    updateActive((a, now) => {
      const next = toggleDone(a, exercise, set, fallback)
      if (!next.exercises[exercise].sets[set].done) return next
      started = true
      return startRest(next, next.exercises[exercise].restSec, { exercise, set }, now)
    })
    if (started) setRestMin(false)
  }

  const save = () => {
    const record = finishSession()
    setEnding(false)
    if (record) onSaved(record)
  }
  const discard = () => {
    discardSession()
    void router.replace(TODAY_HREF)
  }
  const pause = () => {
    updateActive(pauseClock)
    void router.push(TODAY_HREF)
  }

  return (
    <>
      <SessionHeader active={active} onPause={pause} onEnd={() => setEnding(true)} />
      {active.step < 0 ? (
        <WarmupStep active={active} doc={doc} />
      ) : (
        <ExerciseStep active={active} doc={doc} openFolds={openFolds} onFold={onFold} onTick={tick} onEnd={() => setEnding(true)} />
      )}
      <RestLayer active={active} minimised={restMin} setMinimised={setRestMin} />
      <EndSheet open={ending} active={active} onKeepGoing={() => setEnding(false)} onSave={save} onDiscard={discard} />
    </>
  )
}
