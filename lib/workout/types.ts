// Shared shapes for /workout. Everything a user creates lives in one WorkoutDoc so a backup
// file and the gist sync (later) are the same JSON. Records carry ids and updatedAt so two
// devices can merge by id, last write wins.

export type Id = string
/** Local calendar date, YYYY-MM-DD. */
export type IsoDate = string
/** Full timestamp, new Date().toISOString(). */
export type IsoTime = string

export type Equipment = 'dumbbells' | 'pull-up-bar' | 'chair' | 'step' | 'bodyweight'
export type Pattern = 'push' | 'pull' | 'legs' | 'core'
export type Difficulty = 1 | 2 | 3
export type Measure = 'reps' | 'seconds'

export interface Exercise {
  id: Id
  name: string
  primary: string[]
  secondary: string[]
  /** Everything needed to do it; 'bodyweight' alone means nothing else. */
  equipment: Equipment[]
  difficulty: Difficulty
  pattern: Pattern
  measure: Measure
  steps: string[]
  mistakes: string[]
  /** Ids of other catalog exercises that train the same thing. */
  alternatives: Id[]
  /** How to progress once the top of the range is hit, given 7.5 kg dumbbells. */
  progression?: string
}

export type Load = { kind: 'bodyweight' } | { kind: 'dumbbell'; kg: number; count: 1 | 2 }

export interface Target {
  sets: number
  /** Reps, or seconds when the exercise measure is 'seconds'. min === max for a fixed target. */
  min: number
  max: number
  per?: 'side' | 'leg'
}

export interface RoutineItem {
  exerciseId: Id
  target: Target
  restSec: number
  load: Load
}

export interface WarmupItem {
  name: string
  /** As written in the plan: "30 s", "10 reps", "10 / leg". */
  dose: string
}

/** One immutable version of a routine. Editing a routine appends version + 1. */
export interface RoutineVersion {
  routineId: Id
  version: number
  name: string
  warmup: WarmupItem[]
  items: RoutineItem[]
  createdAt: IsoTime
}

export interface ProgramState {
  /** Routine ids in rotation order; the next one up is the first not yet done in the open cycle. */
  order: Id[]
  /** Sessions per week to aim for, on any days. */
  weeklyGoal: number
  /** Current version per routine id. */
  current: Record<Id, number>
  updatedAt: IsoTime
}

export interface Profile {
  heightCm: number | null
  targets: { weightKg: number | null; waistIn: number | null }
  equipment: Equipment[]
  dumbbellKg: number
  updatedAt: IsoTime
}

/** One row per date; a second log on the same date overwrites that field. */
export interface Measurement {
  date: IsoDate
  weightKg?: number
  waistIn?: number
  updatedAt: IsoTime
}

export interface LoggedSet {
  /** Reps or seconds. null = not filled in. */
  value: number | null
  done: boolean
}

/** Snapshot of one exercise as it was done; never re-read from the catalog or routine. */
export interface SessionExercise {
  exerciseId: Id
  name: string
  measure: Measure
  target: Target
  load: Load
  restSec: number
  sets: LoggedSet[]
  skipped: boolean
  /** Set when this exercise was swapped in for another one during the session. */
  swappedFrom?: { exerciseId: Id; name: string }
}

export interface SessionRecord {
  id: Id
  date: IsoDate
  routineId: Id
  routineVersion: number
  routineName: string
  startedAt: IsoTime
  finishedAt: IsoTime
  /** Seconds of training time, pauses excluded. */
  durationSec: number
  exercises: SessionExercise[]
  updatedAt: IsoTime
}

export interface WorkoutDoc {
  schema: 1
  deviceId: Id
  createdAt: IsoTime
  profile: Profile
  /** Append-only. */
  routines: RoutineVersion[]
  program: ProgramState
  /** Append-only snapshots. */
  sessions: SessionRecord[]
  measurements: Measurement[]
}

/** What data/workout/program.ts ships: the starting routines and rotation. */
export interface ProgramSeed {
  routines: Omit<RoutineVersion, 'version' | 'createdAt'>[]
  order: Id[]
  weeklyGoal: number
}
