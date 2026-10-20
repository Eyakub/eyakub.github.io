import { WorkoutLayout } from '../../../components/workout/shell/WorkoutLayout'
import { LibraryView } from '../../../components/workout/library/LibraryView'

export default function WorkoutExercises() {
  return (
    <WorkoutLayout title="Exercises">
      <LibraryView />
    </WorkoutLayout>
  )
}
