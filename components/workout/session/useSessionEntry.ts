import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { currentRoutine } from '../../../lib/workout/doc'
import { SESSION_HREF, TODAY_HREF } from '../../../lib/workout/routes'
import { resumeClock } from '../../../lib/workout/session'
import type { Id } from '../../../lib/workout/types'

export type Entry = { kind: 'pending' } | { kind: 'ready' } | { kind: 'conflict'; routineId: Id }

// Decides what the session page shows when it opens, once. `?routine=X` starts X and is then dropped from the
// URL, so a reload resumes the session instead of starting another. The ref makes it happen once under
// StrictMode's doubled effects.
export function useSessionEntry(): { entry: Entry; resume: () => void; replaceWith: (routineId: Id) => void } {
  const router = useRouter()
  const { doc, startSession, updateActive } = useWorkout()
  const [entry, setEntry] = useState<Entry>({ kind: 'pending' })
  const handled = useRef(false)

  const dropQuery = () => void router.replace(SESSION_HREF, undefined, { shallow: true })
  const resume = () => {
    updateActive(resumeClock)
    dropQuery()
    setEntry({ kind: 'ready' })
  }
  const replaceWith = (routineId: Id) => {
    startSession(routineId)
    dropQuery()
    setEntry({ kind: 'ready' })
  }

  useEffect(() => {
    if (!doc || !router.isReady || handled.current) return
    handled.current = true
    const asked = typeof router.query.routine === 'string' ? router.query.routine : null
    const active = doc.active

    if (asked && !currentRoutine(doc, asked)) void router.replace(TODAY_HREF)
    else if (asked && !active) replaceWith(asked)
    else if (asked && active && active.routineId !== asked) setEntry({ kind: 'conflict', routineId: asked })
    else if (active) {
      resume()
    } else void router.replace(TODAY_HREF)
    // deliberately not depending on the handlers: this runs once, when the doc and the query are both ready
  }, [doc, router.isReady])

  return { entry, resume, replaceWith }
}
