import { useWorkout } from '../../../contexts/WorkoutContext'
import { routineAt } from '../../../lib/workout/doc'
import { setStep, toggleWarmup } from '../../../lib/workout/session'
import type { ActiveSession, WorkoutDoc } from '../../../lib/workout/types'
import { CheckIcon } from '../shell/icons'

export function WarmupStep({ active, doc }: { active: ActiveSession; doc: WorkoutDoc }) {
  const { updateActive } = useWorkout()
  // The warm-up list comes from the version this session started on; versions never change once saved
  const items = routineAt(doc, active.routineId, active.routineVersion)?.warmup ?? []
  const first = active.exercises[0]
  return (
    <div className="screen warm-screen">
      <h1 className="ex-title">Warm up first</h1>
      <p className="prose">About 6 minutes. Tick them off as you go.</p>
      <ul className="warm">
        {items.map((w, i) => (
          <li key={i}>
            <span>{w.name}</span>
            <span className="dose">{w.dose}</span>
            <button
              type="button"
              className="tick"
              aria-pressed={active.warmupDone[i] ?? false}
              aria-label={`${w.name} done`}
              onClick={() => updateActive((a) => toggleWarmup(a, i))}
            >
              <CheckIcon />
            </button>
          </li>
        ))}
      </ul>
      {first && (
        <button type="button" className="btn btn-go" onClick={() => updateActive((a) => setStep(a, 0))}>
          Start with {first.name.toLowerCase()}
        </button>
      )}
    </div>
  )
}
