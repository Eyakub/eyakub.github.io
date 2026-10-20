import { describe, expect, it } from 'vitest'
import { backupFileName, parseBackup } from './backup'
import { createDoc } from './doc'
import { startSession } from './session'
import type { ProgramSeed } from './types'

const SEED: ProgramSeed = {
  routines: [{ routineId: 'a', name: 'Day A', warmup: [], items: [] }],
  order: ['a'],
  weeklyGoal: 4,
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
  it('round-trips a workout in progress', () => {
    const open = startSession(doc, 'a', NOW)
    expect(open.active).not.toBeNull()
    expect(parseBackup(JSON.stringify(open))).toEqual(open)
  })
  it('opens a backup from before workout mode with no session and the chime on', () => {
    const { active: _a, ...rest } = doc
    const { sound: _s, ...profile } = doc.profile
    const parsed = parseBackup(JSON.stringify({ ...rest, profile }))
    expect(parsed?.active).toBeNull()
    expect(parsed?.profile.sound).toBe(true)
  })
  it('returns null for text that is not a workout backup', () => {
    for (const bad of ['', 'not json', '{}', '[]', 'null', '{"schema":2}']) {
      expect(parseBackup(bad)).toBeNull()
    }
  })
})
