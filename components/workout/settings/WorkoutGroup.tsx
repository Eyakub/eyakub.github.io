import { useWorkout } from '../../../contexts/WorkoutContext'
import type { WorkoutDoc } from '../../../lib/workout/types'
import { Switch } from '../shell/Switch'

export function WorkoutGroup({ doc }: { doc: WorkoutDoc }) {
  const { updateProfile } = useWorkout()
  return (
    <section className="sec">
      <h2>Workout</h2>
      <div className="panel">
        <div className="row">
          <div className="row-l">
            <span>Rest timer sound</span>
            <small>Three short notes when a rest ends</small>
          </div>
          <Switch checked={doc.profile.sound} onChange={(sound) => updateProfile({ sound })} label="Rest timer sound" />
        </div>
      </div>
    </section>
  )
}
