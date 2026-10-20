import { useState } from 'react'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { currentRoutine } from '../../../lib/workout/doc'
import type { SessionRecord } from '../../../lib/workout/types'
import { ActiveView } from './ActiveView'
import { ConflictSheet } from './ConflictSheet'
import { DoneView } from './DoneView'
import { useSessionEntry } from './useSessionEntry'

export function SessionView() {
  const { doc } = useWorkout()
  const { entry, resume, replaceWith } = useSessionEntry()
  const [saved, setSaved] = useState<SessionRecord | null>(null)
  if (!doc) return null

  if (saved) return <DoneView record={saved} doc={doc} />
  if (entry.kind === 'conflict' && doc.active) {
    const wanted = currentRoutine(doc, entry.routineId)
    return wanted && <ConflictSheet active={doc.active} wanted={wanted.name} onResume={resume} onReplace={() => replaceWith(wanted.routineId)} />
  }
  if (entry.kind !== 'ready' || !doc.active) return null
  return <ActiveView active={doc.active} doc={doc} onSaved={setSaved} />
}
