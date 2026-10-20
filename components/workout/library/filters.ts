import type { Exercise } from '../../../lib/workout/types'

export type FilterId = 'all' | 'push' | 'pull' | 'legs' | 'core' | 'dumbbells' | 'bar' | 'bodyweight'

export const FILTERS: { id: FilterId; label: string; test: (e: Exercise) => boolean }[] = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'push', label: 'Push', test: (e) => e.pattern === 'push' },
  { id: 'pull', label: 'Pull', test: (e) => e.pattern === 'pull' },
  { id: 'legs', label: 'Legs', test: (e) => e.pattern === 'legs' },
  { id: 'core', label: 'Core', test: (e) => e.pattern === 'core' },
  { id: 'dumbbells', label: 'Dumbbells', test: (e) => e.equipment.includes('dumbbells') },
  { id: 'bar', label: 'Bar', test: (e) => e.equipment.includes('pull-up-bar') },
  { id: 'bodyweight', label: 'Bodyweight', test: (e) => !e.equipment.includes('dumbbells') && !e.equipment.includes('pull-up-bar') },
]

/** `q` is trimmed and lower-cased. Matches the name and every muscle. */
export const matchesQuery = (e: Exercise, q: string) => [e.name, ...e.primary, ...e.secondary].join(' ').toLowerCase().includes(q)
