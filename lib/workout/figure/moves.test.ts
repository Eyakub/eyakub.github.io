import { describe, expect, it } from 'vitest'
import { EXERCISES } from '../../../data/workout/exercises'
import { dir, type Vec } from './geometry'
import { MOVES, getMove, hasMove, moveInfo, phaseAt } from './moves'
import { BONE, SIDES, STAND, poseAt, solve, type Joints, type Pose } from './rig'
import { camera, figureAspect, sceneShapes } from './scene'

const US = [0, 0.13, 0.25, 0.5, 0.77, 1]
const dist = (a: Vec, b: Vec) => Math.hypot(a[0] - b[0], a[1] - b[1])
/** Smallest signed difference between two angles in degrees. */
const angDiff = (a: number, b: number) => ((((a - b) % 360) + 540) % 360) - 180

describe('move catalog', () => {
  it('only has moves for exercises in the catalog', () => {
    const catalog = new Set(EXERCISES.map((e) => e.id))
    for (const id of Object.keys(MOVES)) expect(catalog.has(id), id).toBe(true)
  })

  it('has a move for every catalog exercise except side-plank', () => {
    for (const e of EXERCISES) expect(hasMove(e.id), e.id).toBe(e.id !== 'side-plank')
    expect(Object.keys(MOVES)).toHaveLength(30)
  })

  it('does not mistake object prototype keys for moves', () => {
    expect(hasMove('constructor')).toBe(false)
    expect(getMove('toString')).toBeUndefined()
    expect(moveInfo('nope')).toBeNull()
  })

  it('describes a move for the UI', () => {
    expect(moveInfo('pull-up')).toEqual({
      view: 'front',
      dur: 3.6,
      say: [[0, 'Pull your elbows down'], [0.38, 'Chin over the bar'], [0.5, 'Lower for 2 seconds']],
      muscles: ['lats', 'biceps'],
    })
  })
})

describe('solved poses', () => {
  const bones = (J: Joints) => [
    [J.SN, J.EN, BONE.upper],
    [J.SF, J.EF, BONE.upper],
    [J.EN, J.WN, BONE.fore],
    [J.EF, J.WF, BONE.fore],
    [J.HN, J.KN, BONE.thigh],
    [J.HF, J.KF, BONE.thigh],
    [J.KN, J.AN, BONE.shin],
    [J.KF, J.AF, BONE.shin],
  ] as const

  it('keeps every limb at its bone length, including IK-driven ones', () => {
    for (const [id, move] of Object.entries(MOVES)) {
      for (const u of US) {
        for (const [a, b, want] of bones(solve(move, poseAt(move, u)))) {
          expect(Math.abs(dist(a, b) - want), `${id} @ ${u}`).toBeLessThan(1e-6)
        }
      }
    }
  })

  it('never produces a non-finite coordinate', () => {
    for (const [id, move] of Object.entries(MOVES)) {
      for (const u of US) {
        for (const [k, v] of Object.entries(solve(move, poseAt(move, u)))) {
          const nums = typeof v === 'number' ? [v] : v
          for (const n of nums) expect(Number.isFinite(n), `${id}.${k} @ ${u}`).toBe(true)
        }
      }
    }
  })

  it('puts the pelvis where a straight push-up body line says', () => {
    // Ankle at (0, -8.5), body line pointing -20.8 degrees: hip is shin + thigh away along it.
    const J = solve(MOVES['push-up'], poseAt(MOVES['push-up'], 0))
    const want = dir(-20.8)
    expect(J.P[0]).toBeCloseTo(want[0] * (BONE.shin + BONE.thigh), 6)
    expect(J.P[1]).toBeCloseTo(-8.5 + want[1] * (BONE.shin + BONE.thigh), 6)
  })

  it('pins the anchored joint in lying and calf-raise poses', () => {
    const lie = MOVES['glute-bridge']
    for (const u of US) {
      const J = solve(lie, poseAt(lie, u))
      expect(J.SN[0]).toBeCloseTo(-30, 6)
      expect(J.SN[1]).toBeCloseTo(-6, 6)
    }
    const calf = MOVES['standing-calf-raise']
    for (const u of US) {
      const J = solve(calf, poseAt(calf, u))
      expect(J.ballN[0]).toBeCloseTo(1, 6)
      expect(J.ballN[1]).toBeCloseTo(-12, 6)
    }
  })
})

describe('poseAt', () => {
  it('reproduces each keyframe at its own time', () => {
    for (const [id, move] of Object.entries(MOVES)) {
      for (const key of move.keys) {
        const got = poseAt(move, key.t)
        const want: Pose = { ...STAND, ...move.base, ...key }
        for (const k of ['torso', 'footN', 'footF'] as const) {
          expect(Math.abs(angDiff(got[k], want[k])), `${id} ${k} @ ${key.t}`).toBeLessThan(1e-6)
        }
        if (want.neck != null && got.neck != null) expect(Math.abs(angDiff(got.neck, want.neck))).toBeLessThan(1e-6)
        for (const k of ['armN', 'armF', 'legN', 'legF'] as const) {
          expect(Math.abs(angDiff(got[k][0], want[k][0])), `${id} ${k}[0] @ ${key.t}`).toBeLessThan(1e-6)
          expect(Math.abs(angDiff(got[k][1], want[k][1])), `${id} ${k}[1] @ ${key.t}`).toBeLessThan(1e-6)
        }
        expect(got.root[0]).toBeCloseTo(want.root[0], 6)
        expect(got.root[1]).toBeCloseTo(want.root[1], 6)
      }
    }
  })

  it('matches the curl keyframes exactly', () => {
    const curl = MOVES['db-biceps-curl']
    expect(poseAt(curl, 0).armN).toEqual([90, 88])
    expect(poseAt(curl, 0.3).armN[1]).toBeCloseTo(-62, 9)
    expect(poseAt(curl, 0.42).armF[0]).toBeCloseTo(86, 9)
  })

  it('eases between keyframes and is halfway at the midpoint', () => {
    const curl = MOVES['db-biceps-curl']
    // Forearm goes 88 -> -62 the short way (through 0), so halfway is 13.
    expect(poseAt(curl, 0.15).armN[1]).toBeCloseTo(13, 9)
    const quarter = poseAt(curl, 0.075).armN[1]
    expect(quarter).toBeLessThan(88)
    expect(quarter).toBeGreaterThan(13)
  })

  it('takes the short way round the circle', () => {
    // Shoulder press: upper arm goes 160 -> -100, which is 100 degrees the short way, not 260.
    const press = MOVES['db-shoulder-press']
    expect(poseAt(press, 0.19).armN[0]).toBeCloseTo(210, 9)
  })
})

describe('phaseAt', () => {
  it('switches caption exactly at each boundary', () => {
    expect(phaseAt('pull-up', 0)).toBe('Pull your elbows down')
    expect(phaseAt('pull-up', 0.379)).toBe('Pull your elbows down')
    expect(phaseAt('pull-up', 0.38)).toBe('Chin over the bar')
    expect(phaseAt('pull-up', 0.499)).toBe('Chin over the bar')
    expect(phaseAt('pull-up', 0.5)).toBe('Lower for 2 seconds')
    expect(phaseAt('pull-up', 1)).toBe('Lower for 2 seconds')
  })

  it('falls back to the first caption before the first phase and to empty for unknown ids', () => {
    expect(phaseAt('push-up', -0.1)).toBe('Lower for 2 seconds')
    expect(phaseAt('nope', 0.5)).toBe('')
  })
})

describe('scene', () => {
  const drawn = (id: string, u: number) => {
    const move = MOVES[id]
    return sceneShapes(move, solve(move, poseAt(move, u)))
  }

  it('draws the same number of shapes at every point of a move, so nodes can be reused', () => {
    for (const id of Object.keys(MOVES)) {
      const counts = new Set([0, 0.2, 0.45, 0.5, 0.8, 1].map((u) => drawn(id, u).length))
      expect(counts.size, id).toBe(1)
    }
  })

  it('draws far-side muscles and dumbbells behind the figure in side view', () => {
    const shapes = drawn('db-biceps-curl', 0.3)
    expect(shapes.filter((s) => s.cls === 'muscle far-m')).toHaveLength(1)
    expect(shapes.filter((s) => s.cls === 'muscle')).toHaveLength(1)
    expect(shapes.filter((s) => s.k === 'plate')).toHaveLength(2)
    expect(shapes.findIndex((s) => s.cls === 'muscle far-m')).toBeLessThan(shapes.findIndex((s) => s.cls === 'muscle'))
  })

  it('draws a front-view torso as one polygon and flat dumbbells as bars', () => {
    const shapes = drawn('db-shoulder-press', 0)
    expect(shapes.filter((s) => s.k === 'poly')).toHaveLength(1)
    expect(shapes.filter((s) => s.cls === 'db' && s.k === 'line')).toHaveLength(6)
  })

  it('draws the end-on bar over the figure in chin-ups', () => {
    const shapes = drawn('chin-up', 0.4)
    const last = shapes.slice(-2)
    expect(last.every((s) => s.cls === 'prop')).toBe(true)
  })

  it('tags limb muscles so each is drawn with its own limb', () => {
    const shapes = drawn('db-goblet-squat', 0.5)
    expect(shapes.filter((s) => s.cls === 'muscle')).toHaveLength(2)
    expect(shapes.filter((s) => s.cls === 'muscle far-m')).toHaveLength(1)
  })
})

describe('camera', () => {
  it('holds every joint of the whole cycle', () => {
    for (const [id, move] of Object.entries(MOVES)) {
      const cam = camera(id, 4 / 3)
      for (let i = 0; i < 40; i++) {
        const J = solve(move, poseAt(move, i / 40))
        for (const side of SIDES) {
          for (const p of [J[`W${side}`], J[`A${side}`], J[`E${side}`], J[`K${side}`], J.H]) {
            expect(p[0], `${id} x`).toBeGreaterThan(cam.x)
            expect(p[0], `${id} x`).toBeLessThan(cam.x + cam.w)
            expect(p[1], `${id} y`).toBeGreaterThan(cam.y)
            expect(p[1], `${id} y`).toBeLessThan(cam.y + cam.h)
          }
        }
      }
    }
  })

  it('honours a numeric aspect exactly and keeps auto within sane bounds', () => {
    for (const id of Object.keys(MOVES)) {
      expect(figureAspect(id, 4 / 3)).toBeCloseTo(4 / 3, 9)
      expect(figureAspect(id, 1)).toBeCloseTo(1, 9)
      const auto = figureAspect(id, 'auto')
      expect(auto).toBeGreaterThanOrEqual(1.2 - 1e-9)
      expect(auto).toBeLessThanOrEqual(2.1 + 1e-9)
    }
  })

  it('rejects an unknown exercise', () => {
    expect(() => camera('nope', 4 / 3)).toThrow('Unknown exercise nope')
  })
})
