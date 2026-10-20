import type { Difficulty, Equipment } from './types'

export const EQUIPMENT_LABEL: Record<Equipment, string> = {
  dumbbells: 'Dumbbells',
  'pull-up-bar': 'Pull-up bar',
  chair: 'Chair or bench',
  step: 'Step',
  bodyweight: 'Bodyweight',
}

export type EquipmentPick = Exclude<Equipment, 'bodyweight'>

/** What can be switched on or off; bodyweight is always on. */
export const EQUIPMENT_PICKS: { id: EquipmentPick; hint?: string }[] = [
  { id: 'dumbbells' },
  { id: 'pull-up-bar' },
  { id: 'chair', hint: 'Decline push-ups, split squats, supported rows' },
  { id: 'step', hint: 'Calf raises' },
]

/** Display order for pickers and switches. */
export const EQUIPMENT_ORDER: Equipment[] = ['dumbbells', 'pull-up-bar', 'chair', 'step', 'bodyweight']

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
}

/** "Legs + Core" -> "Legs", so a routine fits in a sentence or a tag. */
export const shortRoutineName = (name: string): string => name.split(/[\s+]/)[0]
