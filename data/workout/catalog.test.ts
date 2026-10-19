import { describe, it, expect } from 'vitest'
import { EXERCISES, EXERCISE_BY_ID } from './exercises'
import { SEED } from './program'

const EQUIPMENT = ['dumbbells', 'pull-up-bar', 'chair', 'step', 'bodyweight']
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/

describe('exercise catalog', () => {
  it('has unique kebab-case ids', () => {
    const ids = EXERCISES.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(KEBAB)
  })

  it('indexes every exercise by id', () => {
    expect(Object.keys(EXERCISE_BY_ID).sort()).toEqual(EXERCISES.map((e) => e.id).sort())
    for (const e of EXERCISES) expect(EXERCISE_BY_ID[e.id]).toBe(e)
  })

  it('only points alternatives at other catalog exercises', () => {
    for (const e of EXERCISES) {
      for (const alt of e.alternatives) {
        expect(EXERCISE_BY_ID[alt], `${e.id} -> ${alt}`).toBeDefined()
        expect(alt, `${e.id} lists itself`).not.toBe(e.id)
      }
    }
  })

  it('uses only known equipment', () => {
    for (const e of EXERCISES) {
      expect(e.equipment.length, e.id).toBeGreaterThan(0)
      for (const eq of e.equipment) expect(EQUIPMENT, `${e.id}: ${eq}`).toContain(eq)
      if (e.equipment.includes('bodyweight')) expect(e.equipment, e.id).toEqual(['bodyweight'])
    }
  })

  it('measures only the holds in seconds', () => {
    const seconds = EXERCISES.filter((e) => e.measure === 'seconds')
      .map((e) => e.id)
      .sort()
    expect(seconds).toEqual(['dead-hang', 'plank', 'side-plank'])
  })

  it('has instructions for every exercise', () => {
    for (const e of EXERCISES) {
      expect(e.steps.length, `${e.id} steps`).toBeGreaterThanOrEqual(2)
      expect(e.mistakes.length, `${e.id} mistakes`).toBeGreaterThanOrEqual(1)
    }
  })

  it('ships no media yet', () => {
    for (const e of EXERCISES) expect(e.media, e.id).toEqual([])
  })
})

describe('starting program', () => {
  const routineIds = SEED.routines.map((r) => r.routineId)

  it('only references catalog exercises', () => {
    for (const r of SEED.routines) {
      for (const it of r.items) {
        expect(EXERCISE_BY_ID[it.exerciseId], `${r.routineId}: ${it.exerciseId}`).toBeDefined()
      }
    }
  })

  it('gives every program exercise an alternative', () => {
    for (const r of SEED.routines) {
      for (const it of r.items) {
        expect(
          EXERCISE_BY_ID[it.exerciseId].alternatives.length,
          `${r.routineId}: ${it.exerciseId}`,
        ).toBeGreaterThanOrEqual(1)
      }
    }
  })

  it('gives every program exercise a progression', () => {
    for (const r of SEED.routines) {
      for (const it of r.items) {
        expect(EXERCISE_BY_ID[it.exerciseId].progression, it.exerciseId).toBeTruthy()
      }
    }
  })

  it('has sane targets', () => {
    for (const r of SEED.routines) {
      for (const it of r.items) {
        expect(it.target.sets, it.exerciseId).toBeGreaterThanOrEqual(1)
        expect(it.target.min, it.exerciseId).toBeLessThanOrEqual(it.target.max)
        expect(it.restSec, it.exerciseId).toBeGreaterThan(0)
      }
    }
  })

  it('has a seven-day week pointing at real routines', () => {
    expect(SEED.week).toHaveLength(7)
    for (const day of SEED.week) {
      if (day.kind === 'routine') expect(routineIds).toContain(day.routineId)
    }
  })

  it('has unique routine ids', () => {
    expect(new Set(routineIds).size).toBe(routineIds.length)
    expect(routineIds).toEqual(['push', 'pull', 'legs', 'full'])
  })
})
