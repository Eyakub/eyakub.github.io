import { describe, expect, it } from 'vitest'
import { createDoc } from './doc'
import { estimateMinutes, sessionsOn, streak, weekProgress, weekStatus } from './stats'
import type { ProgramSeed, RoutineVersion, SessionRecord, WorkoutDoc } from './types'

// Mon a, Tue b, Wed recovery, Thu a, Fri rest, Sat b, Sun rest
const SEED: ProgramSeed = {
  routines: [
    { routineId: 'a', name: 'Day A', warmup: [], items: [] },
    { routineId: 'b', name: 'Day B', warmup: [], items: [] },
  ],
  week: [
    { kind: 'routine', routineId: 'a' },
    { kind: 'routine', routineId: 'b' },
    { kind: 'recovery' },
    { kind: 'routine', routineId: 'a' },
    { kind: 'rest' },
    { kind: 'routine', routineId: 'b' },
    { kind: 'rest' },
  ],
  recovery: [],
}

const INPUT = { weightKg: 80, waistIn: null, heightCm: null, targetWeightKg: null, targetWaistIn: null, equipment: [], dumbbellKg: 7.5 }

const session = (date: string, routineId = 'a'): SessionRecord => ({
  id: `s-${date}-${routineId}`,
  date,
  routineId,
  routineVersion: 1,
  routineName: routineId,
  startedAt: `${date}T09:00:00.000Z`,
  finishedAt: `${date}T09:40:00.000Z`,
  durationSec: 2400,
  exercises: [],
  updatedAt: `${date}T09:40:00.000Z`,
})

// Local-time created date, with sessions on the listed local dates.
const docFor = (created: [number, number, number], dates: string[]): WorkoutDoc => ({
  ...createDoc(SEED, INPUT, new Date(created[0], created[1] - 1, created[2], 8), 'dev'),
  sessions: dates.map((d) => session(d)),
})

const THU = new Date(2026, 9, 22, 14) // 22 Oct 2026
const WED_CREATED: [number, number, number] = [2026, 10, 5]

describe('sessionsOn', () => {
  it('returns every session on that date', () => {
    const doc = { ...docFor(WED_CREATED, ['2026-10-19']), sessions: [session('2026-10-19', 'a'), session('2026-10-19', 'b'), session('2026-10-20')] }
    expect(sessionsOn(doc, '2026-10-19').map((s) => s.routineId)).toEqual(['a', 'b'])
    expect(sessionsOn(doc, '2026-10-21')).toEqual([])
  })
})

describe('weekStatus', () => {
  it('labels a mid-week today with done, missed, today and upcoming', () => {
    const status = weekStatus(docFor(WED_CREATED, ['2026-10-19']), THU)
    expect(status.map((s) => s.date)).toEqual([
      '2026-10-19', '2026-10-20', '2026-10-21', '2026-10-22', '2026-10-23', '2026-10-24', '2026-10-25',
    ])
    expect(status.map((s) => s.state)).toEqual(['done', 'missed', 'recovery', 'today', 'rest', 'upcoming', 'rest'])
    expect(status[0].plan).toEqual({ kind: 'routine', routineId: 'a' })
    expect(status[2].plan).toEqual({ kind: 'recovery' })
  })
  it('has the same Mon..Sun week whichever day today is', () => {
    const doc = docFor(WED_CREATED, [])
    const onSunday = weekStatus(doc, new Date(2026, 9, 25))
    expect(onSunday.map((s) => s.date)).toEqual(weekStatus(doc, THU).map((s) => s.date))
    expect(onSunday.map((s) => s.state)).toEqual(['missed', 'missed', 'recovery', 'missed', 'rest', 'missed', 'rest'])
  })
  it('counts a session on a rest day as done', () => {
    expect(weekStatus(docFor(WED_CREATED, ['2026-10-23']), THU)[4].state).toBe('done')
  })
  it('never marks days before the doc was created as missed', () => {
    const status = weekStatus(docFor([2026, 10, 22], []), THU)
    expect(status.map((s) => s.state)).toEqual(['rest', 'rest', 'rest', 'today', 'rest', 'upcoming', 'rest'])
  })
})

describe('weekProgress', () => {
  it('counts planned routine days and distinct days with a session', () => {
    const doc = { ...docFor(WED_CREATED, []), sessions: [session('2026-10-19', 'a'), session('2026-10-19', 'b'), session('2026-10-20', 'b'), session('2026-10-13', 'a')] }
    expect(weekProgress(doc, THU)).toEqual({ planned: 4, done: 2 })
  })
  it('is zero done for a fresh week', () => {
    expect(weekProgress(docFor(WED_CREATED, ['2026-10-12']), THU)).toEqual({ planned: 4, done: 0 })
  })
})

describe('streak', () => {
  it('counts today when done and skips recovery days', () => {
    // Thu done, Wed recovery skipped, Tue done, Mon done, Sun rest skipped, Sat b missed
    expect(streak(docFor(WED_CREATED, ['2026-10-19', '2026-10-20', '2026-10-22']), THU)).toBe(3)
  })
  it('does not count today when it is not done, and does not break on it', () => {
    expect(streak(docFor(WED_CREATED, ['2026-10-19', '2026-10-20']), THU)).toBe(2)
  })
  it('stops at a missed routine day', () => {
    expect(streak(docFor(WED_CREATED, ['2026-10-19', '2026-10-22']), THU)).toBe(1)
  })
  it('counts several sessions on one day once', () => {
    const doc = { ...docFor(WED_CREATED, []), sessions: [session('2026-10-20', 'a'), session('2026-10-20', 'b')] }
    expect(streak(doc, THU)).toBe(1)
  })
  it('is 0 with no sessions', () => {
    expect(streak(docFor(WED_CREATED, []), THU)).toBe(0)
  })
  it('never counts before the doc was created', () => {
    // Created Mon 19 Oct; a session dated Sat 17 Oct must not extend the run.
    expect(streak(docFor([2026, 10, 19], ['2026-10-17', '2026-10-19', '2026-10-20']), THU)).toBe(2)
  })
  it('walks across a week boundary', () => {
    // Sun 18 rest and Fri 16 rest skipped; Thu 15 and Wed 14 (recovery) fine; Tue 13 b missed.
    expect(streak(docFor(WED_CREATED, ['2026-10-15', '2026-10-17', '2026-10-19', '2026-10-20', '2026-10-22']), THU)).toBe(5)
  })
})

describe('estimateMinutes', () => {
  const routine = (items: [number, number][]): RoutineVersion => ({
    routineId: 'a',
    version: 1,
    name: 'A',
    warmup: [],
    createdAt: '2026-10-20T00:00:00.000Z',
    items: items.map(([sets, restSec]) => ({
      exerciseId: 'x',
      target: { sets, min: 8, max: 10 },
      restSec,
      load: { kind: 'bodyweight' as const },
    })),
  })

  it('rounds 6 min plus set time to the nearest 5', () => {
    // 4 × 3 sets × (45 + 90) s = 27 min, +6 = 33 -> 35
    expect(estimateMinutes(routine([[3, 90], [3, 90], [3, 90], [3, 90]]))).toBe(35)
  })
  it('handles different rests and rounds down', () => {
    // 3×(45+60) + 2×(45+120) = 645 s = 10.75 min, +6 = 16.75 -> 15
    expect(estimateMinutes(routine([[3, 60], [2, 120]]))).toBe(15)
  })
  it('is the warm-up allowance for an empty routine', () => {
    expect(estimateMinutes(routine([]))).toBe(5)
  })
})
