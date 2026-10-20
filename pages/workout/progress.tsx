import { ProgressView } from '../../components/workout/progress/ProgressView'
import { WorkoutLayout } from '../../components/workout/shell/WorkoutLayout'

export default function WorkoutProgress() {
  return (
    <WorkoutLayout title="Progress">
      <ProgressView />
    </WorkoutLayout>
  )
}
