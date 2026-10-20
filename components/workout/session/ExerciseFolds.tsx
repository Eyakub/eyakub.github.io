import type { ReactNode } from 'react'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { EXERCISE_BY_ID } from '../../../data/workout/exercises'
import { swapExercise, swapOptions } from '../../../lib/workout/session'
import type { Id, SessionExercise } from '../../../lib/workout/types'
import { MistakeList } from '../exercise/MistakeList'
import { StepList } from '../exercise/StepList'

interface Props {
  exercise: SessionExercise
  index: number
  open: ReadonlySet<string>
  onFold: (key: string, open: boolean) => void
}

export function ExerciseFolds({ exercise: e, index, open, onFold }: Props) {
  const { doc, updateActive } = useWorkout()
  const info = EXERCISE_BY_ID[e.exerciseId]
  if (!doc || !info) return null

  const options = swapOptions(e, doc.profile)
  const swap = (id: Id) => updateActive((a) => swapExercise(a, index, id, doc.profile))
  const fold = (key: string, title: string, body: ReactNode) => (
    <details className="fold" open={open.has(key)} onToggle={(ev) => onFold(key, ev.currentTarget.open)}>
      <summary>{title}</summary>
      <div className="fold-body">{body}</div>
    </details>
  )

  return (
    <div className="folds">
      {fold('how', 'How to do it', <StepList steps={info.steps} />)}
      {fold('err', 'Common mistakes', <MistakeList mistakes={info.mistakes} />)}
      {(options.length > 0 || e.swappedFrom) &&
        fold(
          'alt',
          'Swap for another exercise',
          <ul className="alts">
            {e.swappedFrom && (
              <li>
                <button type="button" className="alt alt-back" onClick={() => swap(e.swappedFrom!.exerciseId)}>
                  <span>Back to {e.swappedFrom.name}</span>
                </button>
              </li>
            )}
            {options.map((o) => (
              <li key={o.id}>
                <button type="button" className="alt" onClick={() => swap(o.id)}>
                  <span>{o.name}</span>
                  <small>{o.primary.join(', ')}</small>
                </button>
              </li>
            ))}
          </ul>,
        )}
    </div>
  )
}
