// Pure logic for a workout in progress. Every function returns a new object and never mutates its
// input; anything that depends on the clock takes `now`, so tests don't need fake timers.
import { EXERCISE_BY_ID } from '../../data/workout/exercises'
import { toIsoDate } from './dates'
import { currentRoutine, newId } from './doc'
import { formatRangeEach } from './format'
import { chronological } from './rotation'
import type {
  ActiveSession,
  Equipment,
  Exercise,
  Id,
  LoggedSet,
  Profile,
  RestState,
  SessionExercise,
  Target,
  WorkoutDoc,
} from './types'

const at = (now: Date, plusSec = 0): string => new Date(now.getTime() + plusSec * 1000).toISOString()

// Returns `a` itself when nothing changed, so callers can skip a pointless save.
const mapExercise = (a: ActiveSession, i: number, fn: (e: SessionExercise) => SessionExercise): ActiveSession => {
  const e = a.exercises[i]
  const next = e && fn(e)
  return !e || next === e ? a : { ...a, exercises: a.exercises.map((x, j) => (j === i ? next : x)) }
}

const mapSet = (e: SessionExercise, k: number, fn: (s: LoggedSet) => LoggedSet): SessionExercise =>
  e.sets[k] ? { ...e, sets: e.sets.map((s, j) => (j === k ? fn(s) : s)) } : e

const emptySets = (n: number): LoggedSet[] => Array.from({ length: n }, () => ({ value: null, done: false }))

// ---------- start, finish, discard ----------

/** Snapshots the routine's current version into `doc.active`, replacing any session already open. */
export function startSession(doc: WorkoutDoc, routineId: Id, now: Date): WorkoutDoc {
  const routine = currentRoutine(doc, routineId)
  if (!routine) return doc
  const iso = now.toISOString()
  const active: ActiveSession = {
    id: newId(),
    routineId,
    routineVersion: routine.version,
    routineName: routine.name,
    date: toIsoDate(now),
    startedAt: iso,
    elapsedSec: 0,
    runningSince: iso,
    step: -1,
    warmupDone: routine.warmup.map(() => false),
    exercises: routine.items.map((it) => {
      const ex = EXERCISE_BY_ID[it.exerciseId]
      return {
        exerciseId: it.exerciseId,
        name: ex?.name ?? it.exerciseId,
        measure: ex?.measure ?? 'reps',
        target: { ...it.target },
        load: { ...it.load },
        restSec: it.restSec,
        sets: emptySets(it.target.sets),
        skipped: false,
      }
    }),
    rest: null,
    updatedAt: iso,
  }
  return { ...doc, active }
}

/** Saves the open session as a record, exactly as logged, and clears `active`. */
export function finishSession(doc: WorkoutDoc, now: Date): WorkoutDoc {
  const a = doc.active
  if (!a) return doc
  const iso = now.toISOString()
  return {
    ...doc,
    sessions: [
      ...doc.sessions,
      {
        id: a.id,
        date: a.date,
        routineId: a.routineId,
        routineVersion: a.routineVersion,
        routineName: a.routineName,
        startedAt: a.startedAt,
        finishedAt: iso,
        durationSec: elapsedSec(a, now),
        exercises: a.exercises,
        updatedAt: iso,
      },
    ],
    active: null,
  }
}

export const discardSession = (doc: WorkoutDoc): WorkoutDoc => (doc.active ? { ...doc, active: null } : doc)

// ---------- clock ----------

const banked = (a: ActiveSession, now: Date): number =>
  a.elapsedSec + (a.runningSince ? Math.max(0, (now.getTime() - Date.parse(a.runningSince)) / 1000) : 0)

/** Whole seconds of training time so far, pauses excluded. */
export const elapsedSec = (a: ActiveSession, now: Date): number => Math.floor(banked(a, now))

export function pauseClock(a: ActiveSession, now: Date): ActiveSession {
  if (a.runningSince === null) return a
  return { ...a, elapsedSec: banked(a, now), runningSince: null, rest: a.rest && pausedRest(a.rest, now) }
}

export function resumeClock(a: ActiveSession, now: Date): ActiveSession {
  if (a.runningSince !== null) return a
  return { ...a, runningSince: at(now), rest: a.rest && resumedRest(a.rest, now) }
}

// ---------- steps and warm-up ----------

/** -1 is the warm-up; out-of-range steps are ignored. */
export function setStep(a: ActiveSession, step: number): ActiveSession {
  if (step === a.step || step < -1 || step >= a.exercises.length) return a
  return { ...a, step }
}

export function toggleWarmup(a: ActiveSession, i: number): ActiveSession {
  if (i < 0 || i >= a.warmupDone.length) return a
  return { ...a, warmupDone: a.warmupDone.map((d, j) => (j === i ? !d : d)) }
}

export function skipExercise(a: ActiveSession, ex: number): ActiveSession {
  const next = mapExercise(a, ex, (e) => ({ ...e, skipped: true }))
  return ex < a.exercises.length - 1 ? { ...next, step: ex + 1 } : next
}

// ---------- sets ----------

export const setValue = (a: ActiveSession, ex: number, set: number, value: number | null): ActiveSession =>
  mapExercise(a, ex, (e) => mapSet(e, set, (s) => ({ ...s, value })))

/** Marking a set done with nothing typed keeps `fallback`, the value shown as its placeholder. Logging a set un-skips the exercise. */
export const toggleDone = (a: ActiveSession, ex: number, set: number, fallback: number): ActiveSession =>
  mapExercise(a, ex, (e) => {
    const s = e.sets[set]
    if (!s) return e
    const done = !s.done
    const next = mapSet(e, set, () => ({ value: done && s.value === null ? fallback : s.value, done }))
    return done ? { ...next, skipped: false } : next
  })

export const addSet = (a: ActiveSession, ex: number): ActiveSession =>
  mapExercise(a, ex, (e) => ({ ...e, sets: [...e.sets, { value: null, done: false }] }))

/** Drops the last set; one set always stays. */
export const removeSet = (a: ActiveSession, ex: number): ActiveSession =>
  mapExercise(a, ex, (e) => (e.sets.length > 1 ? { ...e, sets: e.sets.slice(0, -1) } : e))

// ---------- swap ----------

/** Catalog alternatives for the exercise that the profile has the equipment for; bodyweight always counts. */
export function swapOptions(ex: SessionExercise, profile: Profile): Exercise[] {
  const have = new Set<Equipment>([...profile.equipment, 'bodyweight'])
  // the original gets its own "Back to" button
  const original = ex.swappedFrom?.exerciseId
  return (EXERCISE_BY_ID[ex.exerciseId]?.alternatives ?? []).flatMap((id) => {
    const alt = EXERCISE_BY_ID[id]
    return alt && id !== original && alt.equipment.every((e) => have.has(e)) ? [alt] : []
  })
}

/** Keeps the target and rest, picks a load that fits, and starts the sets over. Swapping back to the original clears `swappedFrom`. */
export function swapExercise(a: ActiveSession, ex: number, toId: Id, profile: Profile): ActiveSession {
  const to = EXERCISE_BY_ID[toId]
  return mapExercise(a, ex, (e) => {
    if (!to || toId === e.exerciseId) return e
    const load: SessionExercise['load'] = !to.equipment.includes('dumbbells')
      ? { kind: 'bodyweight' }
      : e.load.kind === 'dumbbell'
        ? e.load
        : { kind: 'dumbbell', kg: profile.dumbbellKg, count: 2 }
    const from = e.swappedFrom ?? { exerciseId: e.exerciseId, name: e.name }
    const next: SessionExercise = { ...e, exerciseId: to.id, name: to.name, measure: to.measure, load, sets: emptySets(e.target.sets), skipped: false }
    if (from.exerciseId === to.id) delete next.swappedFrom
    else next.swappedFrom = from
    return next
  })
}

// ---------- rest ----------

/** Seconds left, never below 0. */
export const restLeft = (rest: RestState, now: Date): number =>
  rest.endsAt === null ? rest.leftSec : Math.max(0, (Date.parse(rest.endsAt) - now.getTime()) / 1000)

// A rest that already ran out has nothing to pause.
const pausedRest = (r: RestState, now: Date): RestState => {
  const left = restLeft(r, now)
  return r.endsAt === null || left <= 0 ? r : { ...r, endsAt: null, leftSec: left }
}
const resumedRest = (r: RestState, now: Date): RestState => (r.endsAt === null ? { ...r, endsAt: at(now, r.leftSec) } : r)

export const startRest = (a: ActiveSession, totalSec: number, after: RestState['after'], now: Date): ActiveSession => ({
  ...a,
  rest: { totalSec, endsAt: at(now, totalSec), leftSec: totalSec, after },
})

const withRest = (a: ActiveSession, next: RestState | null): ActiveSession => (next === a.rest ? a : { ...a, rest: next })

export const pauseRest = (a: ActiveSession, now: Date): ActiveSession => withRest(a, a.rest && pausedRest(a.rest, now))
export const resumeRest = (a: ActiveSession, now: Date): ActiveSession => withRest(a, a.rest && resumedRest(a.rest, now))
export const endRest = (a: ActiveSession): ActiveSession => (a.rest ? { ...a, rest: null } : a)

/** Moves the remaining time by `deltaSec`, never below 1 s; the total grows if the remaining time would exceed it. */
export function adjustRest(a: ActiveSession, deltaSec: number, now: Date): ActiveSession {
  const r = a.rest
  if (!r) return a
  const left = Math.max(1, restLeft(r, now) + deltaSec)
  return {
    ...a,
    rest: { ...r, totalSec: Math.max(r.totalSec, Math.ceil(left)), leftSec: left, endsAt: r.endsAt === null ? null : at(now, left) },
  }
}

/** The two lines under the rest dial: what just happened and what is next. */
export function restLines(a: ActiveSession, after: RestState['after']): { label: string; next: string } {
  const e = a.exercises[after.exercise]
  if (!e) return { label: 'Rest', next: '' }
  const open = e.sets.findIndex((s) => !s.done)
  const following = a.exercises[after.exercise + 1]
  return {
    label: `After set ${after.set + 1} of ${e.name.toLowerCase()}`,
    next:
      open >= 0
        ? `Next: set ${open + 1}, ${formatRangeEach(e.target, e.measure)}`
        : following
          ? `Next: ${following.name}`
          : 'That was the last set. Finish when ready.',
  }
}

// ---------- history ----------

/** Values of the done sets from the latest finished session where this exercise was done and not skipped. */
export function lastPerformance(doc: WorkoutDoc, exerciseId: Id): number[] | null {
  const sessions = chronological(doc)
  for (let i = sessions.length - 1; i >= 0; i--) {
    for (const e of sessions[i].exercises) {
      if (e.exerciseId !== exerciseId || e.skipped) continue
      const values = e.sets.flatMap((s) => (s.done && s.value !== null ? [s.value] : []))
      if (values.length) return values
    }
  }
  return null
}

/** True once every set last time reached the top of the range. */
export const readyToProgress = (last: number[] | null, target: Target): boolean =>
  last !== null && last.length >= target.sets && last.every((v) => v >= target.max)

/** What a set row shows before anything is typed: last time's value for that set, else the top of the range. */
export const placeholderFor = (last: number[] | null, target: Target, setIndex: number): number => last?.[setIndex] ?? target.max

// ---------- totals ----------
// These take anything with exercises, so they work on a session in progress and on a saved record.

type HasExercises = { exercises: SessionExercise[] }

export const loggedSets = (s: HasExercises): number =>
  s.exercises.reduce((n, e) => n + e.sets.filter((x) => x.done).length, 0)

/** Sets currently listed, so adding or removing a set moves the goal. */
export const plannedSets = (s: HasExercises): number => s.exercises.reduce((n, e) => n + e.sets.length, 0)

/** Total reps from done sets; timed exercises don't count. */
export const repsLogged = (s: HasExercises): number =>
  s.exercises.reduce(
    (n, e) => (e.measure === 'reps' ? n + e.sets.reduce((m, x) => m + (x.done ? (x.value ?? 0) : 0), 0) : n),
    0,
  )
