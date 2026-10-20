import { useWorkout } from '../../../contexts/WorkoutContext'
import { placeholderFor, setValue } from '../../../lib/workout/session'
import type { SessionExercise } from '../../../lib/workout/types'
import { CheckIcon } from '../shell/icons'

interface Props {
  exercise: SessionExercise
  index: number
  /** Done values from the last finished session, for placeholders. */
  last: number[] | null
  /** Called with the set and the value to log if the field is empty. */
  onTick: (set: number, fallback: number) => void
}

export function SetRows({ exercise: e, index, last, onTick }: Props) {
  const { updateActive } = useWorkout()
  const unit = e.measure === 'seconds' ? 'seconds' : 'reps'
  const stepBy = e.measure === 'seconds' ? 5 : 1

  return (
    <ol className="sets">
      {e.sets.map((s, k) => {
        const ph = placeholderFor(last, e.target, k)
        const bump = (dir: 1 | -1) =>
          updateActive((a) => setValue(a, index, k, Math.max(0, (a.exercises[index].sets[k].value ?? ph) + dir * stepBy)))
        return (
          <li key={k} className={`set${s.done ? ' is-done' : ''}`}>
            <span className="set-n">Set {k + 1}</span>
            <span className="stepper">
              <button type="button" aria-label={`Fewer ${unit}, set ${k + 1}`} onClick={() => bump(-1)}>
                −
              </button>
              <input
                inputMode="numeric"
                autoComplete="off"
                value={s.value ?? ''}
                placeholder={String(ph)}
                aria-label={`${unit[0].toUpperCase()}${unit.slice(1)}, set ${k + 1}`}
                onChange={(ev) => {
                  const text = ev.target.value.replace(/\D/g, '').slice(0, 3)
                  updateActive((a) => setValue(a, index, k, text === '' ? null : Number(text)))
                }}
              />
              <button type="button" aria-label={`More ${unit}, set ${k + 1}`} onClick={() => bump(1)}>
                +
              </button>
            </span>
            <button
              type="button"
              className="tick"
              aria-pressed={s.done}
              aria-label={`Set ${k + 1} done`}
              onClick={() => onTick(k, ph)}
            >
              <CheckIcon />
            </button>
          </li>
        )
      })}
    </ol>
  )
}
