import { describe, expect, it } from 'vitest'
import { backupFileName, parseBackup } from './backup'
import { createDoc } from './doc'
import type { ProgramSeed } from './types'

const SEED: ProgramSeed = {
  routines: [{ routineId: 'a', name: 'Day A', warmup: [], items: [] }],
  week: Array.from({ length: 7 }, () => ({ kind: 'rest' as const })) as ProgramSeed['week'],
  recovery: [],
}
const NOW = new Date(2026, 9, 20, 9, 30)
const doc = createDoc(
  SEED,
  { weightKg: 80, waistIn: null, heightCm: null, targetWeightKg: null, targetWaistIn: null, equipment: ['bodyweight'], dumbbellKg: 7.5 },
  NOW,
  'dev-1',
)

describe('backupFileName', () => {
  it('uses the local date', () => {
    expect(backupFileName(new Date(2026, 0, 5, 23, 59))).toBe('workout-backup-2026-01-05.json')
  })
})

describe('parseBackup', () => {
  it('round-trips an exported document', () => {
    expect(parseBackup(JSON.stringify(doc, null, 2))).toEqual(doc)
  })
  it('returns null for text that is not a workout backup', () => {
    for (const bad of ['', 'not json', '{}', '[]', 'null', '{"schema":2}']) {
      expect(parseBackup(bad)).toBeNull()
    }
  })
})
