import { WorkoutLayout } from '../../components/workout/shell/WorkoutLayout'
import { TodayView } from '../../components/workout/today/TodayView'

export default function WorkoutToday() {
  return (
    <WorkoutLayout title="Today">
      <TodayView />
    </WorkoutLayout>
  )
}
