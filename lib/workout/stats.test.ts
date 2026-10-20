import { describe, expect, it } from 'vitest'
import { createDoc } from './doc'
import { estimateMinutes, sessionsOn } from './stats'
import type { ProgramSeed, RoutineVersion, SessionRecord, WorkoutDoc } from './types'

const SEED: ProgramSeed = {
  routines: [
    { routineId: 'a', name: 'Day A', warmup: [], items: [] },
    { routineId: 'b', name: 'Day B', warmup: [], items: [] },
  ],
  order: ['a', 'b'],
  weeklyGoal: 4,
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

describe('sessionsOn', () => {
  it('returns every session on that date', () => {
    const doc: WorkoutDoc = {
      ...createDoc(SEED, INPUT, new Date(2026, 9, 5, 8), 'dev'),
      sessions: [session('2026-10-19', 'a'), session('2026-10-19', 'b'), session('2026-10-20')],
    }
    expect(sessionsOn(doc, '2026-10-19').map((s) => s.routineId)).toEqual(['a', 'b'])
    expect(sessionsOn(doc, '2026-10-21')).toEqual([])
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
