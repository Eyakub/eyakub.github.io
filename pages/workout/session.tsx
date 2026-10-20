import { SessionView } from '../../components/workout/session/SessionView'
import { WorkoutLayout } from '../../components/workout/shell/WorkoutLayout'

export default function WorkoutSession() {
  return (
    <WorkoutLayout title="Workout" bare>
      <SessionView />
    </WorkoutLayout>
  )
}
