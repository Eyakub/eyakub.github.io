import { describe, expect, it } from 'vitest'
import { createDoc } from './doc'
import { exerciseDays } from './schedule'
import type { ProgramSeed } from './types'

const SEED: ProgramSeed = {
  routines: [
    {
      routineId: 'a',
      name: 'Day A',
      warmup: [],
      items: [{ exerciseId: 'push-up', target: { sets: 3, min: 5, max: 8 }, restSec: 90, load: { kind: 'bodyweight' } }],
    },
    {
      routineId: 'b',
      name: 'Day B',
      warmup: [],
      items: [{ exerciseId: 'row', target: { sets: 3, min: 5, max: 8 }, restSec: 90, load: { kind: 'bodyweight' } }],
    },
  ],
  week: [
    { kind: 'routine', routineId: 'a' },
    { kind: 'routine', routineId: 'b' },
    { kind: 'recovery' },
    { kind: 'rest' },
    { kind: 'rest' },
    { kind: 'routine', routineId: 'a' },
    { kind: 'rest' },
  ],
  recovery: [],
}
const doc = createDoc(
  SEED,
  { weightKg: 80, waistIn: null, heightCm: null, targetWeightKg: null, targetWaistIn: null, equipment: ['bodyweight'], dumbbellKg: 7.5 },
  new Date(2026, 9, 20),
  'dev-1',
)

describe('exerciseDays', () => {
  it('lists every weekday the exercise is scheduled, Monday first', () => {
    expect(exerciseDays(doc, 'push-up')).toEqual(['Mon', 'Sat'])
    expect(exerciseDays(doc, 'row')).toEqual(['Tue'])
  })
  it('is empty for an exercise that is not in any routine', () => {
    expect(exerciseDays(doc, 'plank')).toEqual([])
  })
  it('follows the current version, not older ones', () => {
    const v2 = { ...doc.routines[0], version: 2, items: [] }
    const next = { ...doc, routines: [...doc.routines, v2], program: { ...doc.program, current: { ...doc.program.current, a: 2 } } }
    expect(exerciseDays(next, 'push-up')).toEqual([])
  })
})
