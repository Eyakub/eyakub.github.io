import type { Difficulty, Equipment } from './types'

export const EQUIPMENT_LABEL: Record<Equipment, string> = {
  dumbbells: 'Dumbbells',
  'pull-up-bar': 'Pull-up bar',
  chair: 'Chair or bench',
  step: 'Step',
  bodyweight: 'Bodyweight',
}

/** Display order for pickers and switches. */
export const EQUIPMENT_ORDER: Equipment[] = ['dumbbells', 'pull-up-bar', 'chair', 'step', 'bodyweight']

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
}
