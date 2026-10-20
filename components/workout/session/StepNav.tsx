import { useWorkout } from '../../../contexts/WorkoutContext'
import { setStep, skipExercise } from '../../../lib/workout/session'
import type { ActiveSession } from '../../../lib/workout/types'
import { BackIcon } from '../shell/icons'

interface Props {
  active: ActiveSession
  /** Opens the end sheet, which is where the last exercise leads. */
  onEnd: () => void
}

export function StepNav({ active, onEnd }: Props) {
  const { updateActive } = useWorkout()
  const { step, exercises } = active
  const next = exercises[step + 1]
  return (
    <div className="stepnav">
      <button
        type="button"
        className="iconbtn"
        aria-label={step === 0 ? 'Back to the warm-up' : 'Previous exercise'}
        onClick={() => updateActive((a) => setStep(a, step - 1))}
      >
        <BackIcon />
      </button>
      <button
        type="button"
        className="btn btn-quiet"
        onClick={() => {
          updateActive((a) => skipExercise(a, step))
          if (!next) onEnd()
        }}
      >
        Skip
      </button>
      {next ? (
        <button type="button" className="btn btn-go" onClick={() => updateActive((a) => setStep(a, step + 1))}>
          Next: {next.name.replace('Dumbbell ', '')}
        </button>
      ) : (
        <button type="button" className="btn btn-go" onClick={onEnd}>
          Finish workout
        </button>
      )}
    </div>
  )
}
