import { describe, expect, it } from 'vitest'
import { createDoc, currentRoutine, latestMeasurement, logMeasurement, measurementSeries, migrate, newId, routineAt, updateProfile, type OnboardingInput } from './doc'
import { startSession } from './session'
import type { ProgramSeed, RoutineVersion } from './types'

const SEED: ProgramSeed = {
  routines: [
    {
      routineId: 'a',
      name: 'Day A',
      warmup: [{ name: 'Cat-cow', dose: '30 s' }],
      items: [{ exerciseId: 'push-up', target: { sets: 3, min: 5, max: 8 }, restSec: 90, load: { kind: 'bodyweight' } }],
    },
    {
      routineId: 'b',
      name: 'Day B',
      warmup: [],
      items: [{ exerciseId: 'row', target: { sets: 3, min: 8, max: 10 }, restSec: 90, load: { kind: 'dumbbell', kg: 7.5, count: 1 } }],
    },
  ],
  order: ['a', 'b'],
  weeklyGoal: 4,
}

const INPUT: OnboardingInput = {
  weightKg: 82.4,
  waistIn: 37.5,
  heightCm: 176,
  targetWeightKg: 75,
  targetWaistIn: 34,
  equipment: ['dumbbells', 'bodyweight'],
  dumbbellKg: 7.5,
}

const NOW = new Date(2026, 9, 20, 9, 30)
const make = (input: OnboardingInput = INPUT) => createDoc(SEED, input, NOW, 'dev-1')

describe('newId', () => {
  it('returns distinct non-empty strings', () => {
    const a = newId()
    expect(a.length).toBeGreaterThan(8)
    expect(newId()).not.toBe(a)
  })
})

describe('createDoc', () => {
  const doc = make()
  const iso = NOW.toISOString()

  it('builds the document envelope', () => {
    expect(doc.schema).toBe(1)
    expect(doc.deviceId).toBe('dev-1')
    expect(doc.createdAt).toBe(iso)
    expect(doc.sessions).toEqual([])
  })
  it('turns seed routines into version 1', () => {
    expect(doc.routines).toHaveLength(2)
    expect(doc.routines[0]).toMatchObject({ routineId: 'a', version: 1, createdAt: iso, name: 'Day A' })
    expect(doc.program.current).toEqual({ a: 1, b: 1 })
  })
  it('copies the rotation and weekly goal from the seed', () => {
    expect(doc.program.order).toEqual(SEED.order)
    expect(doc.program.order).not.toBe(SEED.order)
    expect(doc.program.weeklyGoal).toBe(4)
    expect(doc.program.updatedAt).toBe(iso)
  })
  it('fills the profile from the input', () => {
    expect(doc.profile).toEqual({
      heightCm: 176,
      targets: { weightKg: 75, waistIn: 34 },
      equipment: ['dumbbells', 'bodyweight'],
      dumbbellKg: 7.5,
      sound: true,
      updatedAt: iso,
    })
  })
  it('starts with no workout in progress', () => {
    expect(doc.active).toBeNull()
  })
  it('records the first measurement for today', () => {
    expect(doc.measurements).toEqual([{ date: '2026-10-20', weightKg: 82.4, waistIn: 37.5, updatedAt: iso }])
  })
  it('leaves waist out when not given', () => {
    const m = make({ ...INPUT, waistIn: null }).measurements[0]
    expect(m.weightKg).toBe(82.4)
    expect('waistIn' in m).toBe(false)
  })
})

describe('routine lookup', () => {
  const v1 = make()
  const v2: RoutineVersion = { ...v1.routines[0], version: 2, name: 'Day A v2', createdAt: '2026-11-01T00:00:00.000Z' }
  const doc = { ...v1, routines: [...v1.routines, v2], program: { ...v1.program, current: { ...v1.program.current, a: 2 } } }

  it('currentRoutine follows program.current', () => {
    expect(currentRoutine(doc, 'a')?.name).toBe('Day A v2')
    expect(currentRoutine(doc, 'b')?.version).toBe(1)
    expect(currentRoutine(doc, 'zzz')).toBeUndefined()
  })
  it('routineAt returns an exact version', () => {
    expect(routineAt(doc, 'a', 1)?.name).toBe('Day A')
    expect(routineAt(doc, 'a', 2)?.name).toBe('Day A v2')
    expect(routineAt(doc, 'a', 3)).toBeUndefined()
  })
})

describe('logMeasurement', () => {
  const later = new Date(2026, 9, 20, 18, 0)

  it('merges into the row for that date, keeping the other field', () => {
    const doc = make()
    const next = logMeasurement(doc, '2026-10-20', { weightKg: 81.9 }, later)
    expect(next.measurements).toEqual([{ date: '2026-10-20', weightKg: 81.9, waistIn: 37.5, updatedAt: later.toISOString() }])
  })
  it('adds a row for a new date', () => {
    const next = logMeasurement(make(), '2026-10-21', { waistIn: 37.25 }, later)
    expect(next.measurements).toHaveLength(2)
    expect(next.measurements[1]).toEqual({ date: '2026-10-21', waistIn: 37.25, updatedAt: later.toISOString() })
  })
  it('does not mutate the input', () => {
    const doc = make()
    const before = JSON.stringify(doc)
    const next = logMeasurement(doc, '2026-10-20', { weightKg: 80 }, later)
    expect(next).not.toBe(doc)
    expect(JSON.stringify(doc)).toBe(before)
    expect(doc.measurements[0].weightKg).toBe(82.4)
  })
  it('ignores undefined patch fields instead of erasing data', () => {
    const next = logMeasurement(make(), '2026-10-20', { weightKg: undefined, waistIn: 36.5 }, later)
    expect(next.measurements[0]).toMatchObject({ weightKg: 82.4, waistIn: 36.5 })
  })
})

describe('updateProfile', () => {
  const later = new Date(2026, 9, 21, 8, 0)

  it('merges the patch and bumps profile.updatedAt', () => {
    const next = updateProfile(make(), { heightCm: 180, dumbbellKg: 10 }, later)
    expect(next.profile).toEqual({
      heightCm: 180,
      targets: { weightKg: 75, waistIn: 34 },
      equipment: ['dumbbells', 'bodyweight'],
      dumbbellKg: 10,
      sound: true,
      updatedAt: later.toISOString(),
    })
  })
  it('switches the rest chime off and on', () => {
    const off = updateProfile(make(), { sound: false }, later)
    expect(off.profile.sound).toBe(false)
    expect(updateProfile(off, { sound: true }, later).profile.sound).toBe(true)
  })
  it('replaces targets and equipment as a whole', () => {
    const next = updateProfile(make(), { targets: { weightKg: null, waistIn: 33 }, equipment: ['bodyweight', 'chair'] }, later)
    expect(next.profile.targets).toEqual({ weightKg: null, waistIn: 33 })
    expect(next.profile.equipment).toEqual(['bodyweight', 'chair'])
  })
  it('null clears a value, undefined leaves it alone', () => {
    const next = updateProfile(make(), { heightCm: null, dumbbellKg: undefined }, later)
    expect(next.profile.heightCm).toBeNull()
    expect(next.profile.dumbbellKg).toBe(7.5)
  })
  it('leaves everything outside the profile untouched', () => {
    const doc = make()
    const next = updateProfile(doc, { heightCm: 181 }, later)
    expect(next.measurements).toBe(doc.measurements)
    expect(next.program).toBe(doc.program)
    expect(next.createdAt).toBe(doc.createdAt)
  })
  it('does not mutate the input', () => {
    const doc = make()
    const before = JSON.stringify(doc)
    const next = updateProfile(doc, { heightCm: 181, equipment: ['bodyweight'] }, later)
    expect(next).not.toBe(doc)
    expect(next.profile).not.toBe(doc.profile)
    expect(JSON.stringify(doc)).toBe(before)
  })
})

describe('measurementSeries / latestMeasurement', () => {
  const base = make()
  const doc = {
    ...base,
    measurements: [
      { date: '2026-10-22', weightKg: 81, updatedAt: 'x' },
      { date: '2026-10-20', weightKg: 82.4, waistIn: 37.5, updatedAt: 'x' },
      { date: '2026-10-21', waistIn: 37.25, updatedAt: 'x' },
    ],
  }

  it('sorts ascending by date and skips rows lacking the field', () => {
    expect(measurementSeries(doc, 'weightKg')).toEqual([
      { date: '2026-10-20', value: 82.4 },
      { date: '2026-10-22', value: 81 },
    ])
    expect(measurementSeries(doc, 'waistIn')).toEqual([
      { date: '2026-10-20', value: 37.5 },
      { date: '2026-10-21', value: 37.25 },
    ])
  })
  it('does not reorder the stored rows', () => {
    measurementSeries(doc, 'weightKg')
    expect(doc.measurements[0].date).toBe('2026-10-22')
  })
  it('latest is the last by date, or null', () => {
    expect(latestMeasurement(doc, 'weightKg')).toEqual({ date: '2026-10-22', value: 81 })
    expect(latestMeasurement({ ...doc, measurements: [] }, 'waistIn')).toBeNull()
  })
})

describe('migrate', () => {
  it('returns a valid doc, including one that went through JSON', () => {
    const doc = make()
    expect(migrate(doc)).toBe(doc)
    expect(migrate(JSON.parse(JSON.stringify(doc)))).toEqual(doc)
  })
  it('treats a doc saved before workout mode as having no session and the chime on', () => {
    const { active: _active, ...rest } = make()
    const { sound: _sound, ...profile } = rest.profile
    const old = { ...rest, profile }
    const doc = migrate(JSON.parse(JSON.stringify(old)))
    expect(doc?.active).toBeNull()
    expect(doc?.profile.sound).toBe(true)
    expect(doc).toEqual(make())
  })
  it('fills a missing active or sound on its own', () => {
    const { active: _active, ...noActive } = make()
    expect(migrate(noActive)?.active).toBeNull()
    expect(migrate(noActive)?.profile).toEqual(make().profile)
    const { sound: _sound, ...profile } = make().profile
    expect(migrate({ ...make(), profile })?.profile.sound).toBe(true)
  })
  it('keeps a chime that was switched off', () => {
    expect(migrate({ ...make(), profile: { ...make().profile, sound: false } })?.profile.sound).toBe(false)
  })
  it('keeps a workout in progress through JSON', () => {
    const doc = startSession(make(), 'a', NOW)
    expect(doc.active).not.toBeNull()
    const back = migrate(JSON.parse(JSON.stringify(doc)))
    expect(back).toEqual(doc)
    expect(back?.active?.routineName).toBe('Day A')
  })
  it('rejects an active that is not an object or has no exercises', () => {
    const doc = make()
    for (const bad of ['yes', 5, true, [], {}, { step: 0 }, { step: 0, exercises: [] }, { step: 'x', exercises: [], warmupDone: [] }]) {
      expect(migrate({ ...doc, active: bad })).toBeNull()
    }
  })
  it('rejects garbage without throwing', () => {
    for (const bad of [null, undefined, 42, 'doc', [], {}, { schema: 2 }, { schema: 1 }]) {
      expect(migrate(bad)).toBeNull()
    }
  })
  it('rejects a doc with missing or mistyped fields', () => {
    const doc = make()
    expect(migrate({ ...doc, schema: 2 })).toBeNull()
    expect(migrate({ ...doc, sessions: undefined })).toBeNull()
    expect(migrate({ ...doc, measurements: {} })).toBeNull()
    expect(migrate({ ...doc, routines: 'x' })).toBeNull()
    expect(migrate({ ...doc, profile: null })).toBeNull()
    for (const bad of [{ order: undefined }, { order: [] }, { order: 'push' }, { order: ['push', 3] }]) {
      expect(migrate({ ...doc, program: { ...doc.program, ...bad } })).toBeNull()
    }
    for (const bad of [undefined, 0, -1, '4', NaN]) {
      expect(migrate({ ...doc, program: { ...doc.program, weeklyGoal: bad } })).toBeNull()
    }
    expect(migrate({ ...doc, program: { ...doc.program, current: null } })).toBeNull()
  })
})
