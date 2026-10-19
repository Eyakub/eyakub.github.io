import { toIsoDate, weekdayIndex } from './dates'
import type { DayPlan, Equipment, Id, IsoDate, Measurement, ProgramSeed, RoutineVersion, WeekPlan, WorkoutDoc } from './types'

export interface OnboardingInput {
  weightKg: number
  waistIn: number | null
  heightCm: number | null
  targetWeightKg: number | null
  targetWaistIn: number | null
  equipment: Equipment[]
  dumbbellKg: number
}

export type MeasurementField = 'weightKg' | 'waistIn'

export function newId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  // randomUUID needs a secure context; plain-http LAN testing falls back to this
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}${Math.random().toString(36).slice(2, 10)}`
}

export function createDoc(seed: ProgramSeed, input: OnboardingInput, now: Date, deviceId: Id): WorkoutDoc {
  const iso = now.toISOString()
  const measurement: Measurement = { date: toIsoDate(now), weightKg: input.weightKg, updatedAt: iso }
  if (input.waistIn != null) measurement.waistIn = input.waistIn
  return {
    schema: 1,
    deviceId,
    createdAt: iso,
    profile: {
      heightCm: input.heightCm,
      targets: { weightKg: input.targetWeightKg, waistIn: input.targetWaistIn },
      equipment: [...input.equipment],
      dumbbellKg: input.dumbbellKg,
      updatedAt: iso,
    },
    routines: seed.routines.map((r) => ({ ...r, version: 1, createdAt: iso })),
    program: {
      week: [...seed.week] as WeekPlan,
      current: Object.fromEntries(seed.routines.map((r) => [r.routineId, 1])),
      recovery: [...seed.recovery],
      updatedAt: iso,
    },
    sessions: [],
    measurements: [measurement],
  }
}

export function routineAt(doc: WorkoutDoc, routineId: Id, version: number): RoutineVersion | undefined {
  return doc.routines.find((r) => r.routineId === routineId && r.version === version)
}

export function currentRoutine(doc: WorkoutDoc, routineId: Id): RoutineVersion | undefined {
  const version = doc.program.current[routineId]
  return version === undefined ? undefined : routineAt(doc, routineId, version)
}

export function planFor(doc: WorkoutDoc, date: Date): DayPlan {
  return doc.program.week[weekdayIndex(date)]
}

export function logMeasurement(
  doc: WorkoutDoc,
  date: IsoDate,
  patch: { weightKg?: number; waistIn?: number },
  now: Date,
): WorkoutDoc {
  const updatedAt = now.toISOString()
  const fields: Partial<Record<MeasurementField, number>> = {}
  if (patch.weightKg !== undefined) fields.weightKg = patch.weightKg
  if (patch.waistIn !== undefined) fields.waistIn = patch.waistIn

  const i = doc.measurements.findIndex((m) => m.date === date)
  if (i < 0) return { ...doc, measurements: [...doc.measurements, { date, ...fields, updatedAt }] }
  const measurements = doc.measurements.map((m, j) => (j === i ? { ...m, ...fields, updatedAt } : m))
  return { ...doc, measurements }
}

export function measurementSeries(doc: WorkoutDoc, field: MeasurementField): { date: IsoDate; value: number }[] {
  return doc.measurements
    .flatMap((m) => (typeof m[field] === 'number' ? [{ date: m.date, value: m[field] as number }] : []))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
}

export function latestMeasurement(doc: WorkoutDoc, field: MeasurementField): { date: IsoDate; value: number } | null {
  const series = measurementSeries(doc, field)
  return series.length ? series[series.length - 1] : null
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

// Shape check only. Schema 1 is the only version so far, so there is nothing to upgrade yet.
export function migrate(raw: unknown): WorkoutDoc | null {
  if (!isObject(raw) || raw.schema !== 1) return null
  if (typeof raw.deviceId !== 'string' || typeof raw.createdAt !== 'string') return null
  if (!Array.isArray(raw.routines) || !Array.isArray(raw.sessions) || !Array.isArray(raw.measurements)) return null
  if (!isObject(raw.profile) || !isObject(raw.program)) return null
  const { week, current, recovery } = raw.program
  if (!Array.isArray(week) || week.length !== 7 || !isObject(current) || !Array.isArray(recovery)) return null
  return raw as unknown as WorkoutDoc
}
