import type { Equipment } from '../../../lib/workout/types'
import { BarIcon, BodyIcon, DumbbellIcon } from '../shell/icons'

export function ExerciseGlyph({ equipment }: { equipment: Equipment[] }) {
  if (equipment.includes('dumbbells')) return <DumbbellIcon />
  if (equipment.includes('pull-up-bar')) return <BarIcon />
  return <BodyIcon />
}
