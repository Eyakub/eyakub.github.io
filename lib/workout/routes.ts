import type { Id } from './types'

export const TODAY_HREF = '/workout'

/** The workout in progress, with no query, so a reload resumes it. */
export const SESSION_HREF = '/workout/session'

/** The session page, opened on a routine. */
export const sessionHref = (routineId: Id): string => `${SESSION_HREF}?routine=${routineId}`

/** Today right after a workout was saved, so the new plate loads onto the barbell. */
export const TODAY_LOADED_HREF = `${TODAY_HREF}?loaded=1`
