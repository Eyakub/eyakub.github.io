import { WorkoutLayout } from '../../components/workout/shell/WorkoutLayout'
import { SettingsView } from '../../components/workout/settings/SettingsView'

export default function WorkoutSettings() {
  return (
    <WorkoutLayout title="Settings">
      <SettingsView />
    </WorkoutLayout>
  )
}
