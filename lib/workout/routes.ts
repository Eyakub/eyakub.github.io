import type { Id } from './types'

/** The workout session page, opened on a routine. */
export const sessionHref = (routineId: Id): string => `/workout/session?routine=${routineId}`
