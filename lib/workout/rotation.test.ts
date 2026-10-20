import { describe, expect, it } from 'vitest'
import { createDoc } from './doc'
import { nextUp, openCycle, recentWeeks, routinesWith, weekSessions } from './rotation'
import type { ProgramSeed, SessionRecord, WorkoutDoc } from './types'

const routine = (routineId: string, exerciseIds: string[]): ProgramSeed['routines'][number] => ({
  routineId,
  name: routineId,
  warmup: [],
  items: exerciseIds.map((exerciseId) => ({
    exerciseId,
    target: { sets: 3, min: 8, max: 10 },
    restSec: 60,
    load: { kind: 'bodyweight' as const },
  })),
})

const SEED: ProgramSeed = {
  routines: [
    routine('push', ['push-up', 'plank']),
    routine('pull', ['pull-up']),
    routine('legs', ['squat', 'plank']),
    routine('full', ['push-up', 'squat']),
  ],
  order: ['push', 'pull', 'legs', 'full'],
  weeklyGoal: 4,
}

const INPUT = { weightKg: 80, waistIn: null, heightCm: null, targetWeightKg: null, targetWaistIn: null, equipment: [], dumbbellKg: 7.5 }
const EMPTY = createDoc(SEED, INPUT, new Date(2026, 9, 1, 8), 'dev')

// finishedAt is 40 minutes after startedAt; `date` is the local day, set independently of the clock.
const session = (routineId: string, date: string, time = '09:00'): SessionRecord => {
  const [h, m] = time.split(':').map(Number)
  const end = `${String(h + Math.floor((m + 40) / 60)).padStart(2, '0')}:${String((m + 40) % 60).padStart(2, '0')}`
  return {
    id: `s-${date}-${time}-${routineId}`,
    date,
    routineId,
    routineVersion: 1,
    routineName: routineId,
    startedAt: `${date}T${time}:00.000Z`,
    finishedAt: `${date}T${end}:00.000Z`,
    durationSec: 2400,
    exercises: [],
    updatedAt: `${date}T${end}:00.000Z`,
  }
}

const withSessions = (...sessions: SessionRecord[]): WorkoutDoc => ({ ...EMPTY, sessions })
// One session per routine on consecutive days from 5 Oct, so order of the list is the order done.
const done = (...ids: string[]): WorkoutDoc => withSessions(...ids.map((id, i) => session(id, `2026-10-${String(5 + i).padStart(2, '0')}`)))

describe('nextUp / openCycle', () => {
  it('starts with the first routine when nothing is done', () => {
    expect(openCycle(EMPTY)).toEqual([])
    expect(nextUp(EMPTY)).toBe('push')
  })
  it('keeps Push next when Pull was done first, then moves to Legs', () => {
    const afterPull = done('pull')
    expect(openCycle(afterPull)).toEqual(['pull'])
    expect(nextUp(afterPull)).toBe('push')
    const afterPush = done('pull', 'push')
    expect(openCycle(afterPush)).toEqual(['pull', 'push'])
    expect(nextUp(afterPush)).toBe('legs')
  })
  it('follows the order for a straight run', () => {
    expect(nextUp(done('push'))).toBe('pull')
    expect(nextUp(done('push', 'pull'))).toBe('legs')
    expect(nextUp(done('push', 'pull', 'legs'))).toBe('full')
  })
  it('closes a full cycle and starts over at Push', () => {
    const doc = done('push', 'pull', 'legs', 'full')
    expect(openCycle(doc)).toEqual([])
    expect(nextUp(doc)).toBe('push')
  })
  it('closes a cycle done out of order and counts the next session towards the new one', () => {
    expect(openCycle(done('full', 'legs', 'pull', 'push'))).toEqual([])
    const doc = done('full', 'legs', 'pull', 'push', 'legs')
    expect(openCycle(doc)).toEqual(['legs'])
    expect(nextUp(doc)).toBe('push')
  })
  it('carries an open cycle across week boundaries', () => {
    const doc = withSessions(session('push', '2026-10-23'), session('pull', '2026-10-25', '21:30'), session('legs', '2026-10-27'))
    expect(openCycle(doc)).toEqual(['push', 'pull', 'legs'])
    expect(nextUp(doc)).toBe('full')
    expect(nextUp({ ...doc, sessions: [...doc.sessions, session('full', '2026-11-03')] })).toBe('push')
  })
  it('does not advance past a routine repeated within the cycle', () => {
    const doc = done('push', 'push')
    expect(openCycle(doc)).toEqual(['push'])
    expect(nextUp(doc)).toBe('pull')
    expect(nextUp(done('push', 'push', 'push', 'pull', 'pull'))).toBe('legs')
  })
  it('ignores sessions for routines outside the order', () => {
    const doc = done('yoga', 'push', 'stretch')
    expect(openCycle(doc)).toEqual(['push'])
    expect(nextUp(doc)).toBe('pull')
    expect(nextUp(done('yoga'))).toBe('push')
  })
  it('walks sessions by finish time, not by list order', () => {
    const doc = withSessions(session('pull', '2026-10-07'), session('push', '2026-10-05'), session('legs', '2026-10-06'))
    expect(openCycle(doc)).toEqual(['push', 'legs', 'pull'])
    expect(nextUp(doc)).toBe('full')
  })
  it('breaks a finish-time tie by start time', () => {
    const early = { ...session('pull', '2026-10-05'), startedAt: '2026-10-05T08:00:00.000Z', finishedAt: '2026-10-05T10:00:00.000Z' }
    const late = { ...session('push', '2026-10-05'), startedAt: '2026-10-05T09:00:00.000Z', finishedAt: '2026-10-05T10:00:00.000Z' }
    expect(openCycle(withSessions(late, early))).toEqual(['pull', 'push'])
  })
  it('follows a custom order', () => {
    const doc: WorkoutDoc = { ...done('legs'), program: { ...EMPTY.program, order: ['legs', 'push'] } }
    expect(nextUp(doc)).toBe('push')
  })
})

describe('weekSessions', () => {
  const THU = new Date(2026, 9, 22, 14) // week of Mon 19 to Sun 25 Oct 2026

  it('returns only the sessions in the Monday to Sunday week, oldest first', () => {
    const doc = withSessions(
      session('legs', '2026-10-22'),
      session('push', '2026-10-19'),
      session('pull', '2026-10-13'),
      session('full', '2026-10-27'),
    )
    expect(weekSessions(doc, THU).map((s) => s.routineId)).toEqual(['push', 'legs'])
  })
  it('includes Sunday evening in the week that is ending, whichever day today is', () => {
    const doc = withSessions(session('pull', '2026-10-25', '21:50'), session('push', '2026-10-26', '06:10'))
    for (const day of [19, 22, 25]) {
      expect(weekSessions(doc, new Date(2026, 9, day, 12)).map((s) => s.routineId)).toEqual(['pull'])
    }
  })
  it('starts the next week on Monday morning', () => {
    const doc = withSessions(session('pull', '2026-10-25', '21:50'), session('push', '2026-10-26', '06:10'))
    for (const day of [26, 28, 31]) {
      expect(weekSessions(doc, new Date(2026, 9, day, 12)).map((s) => s.routineId)).toEqual(['push'])
    }
    expect(weekSessions(doc, new Date(2026, 10, 1, 23, 59)).map((s) => s.routineId)).toEqual(['push'])
  })
  it('counts every session, including routines outside the order', () => {
    expect(weekSessions(withSessions(session('yoga', '2026-10-20')), THU)).toHaveLength(1)
  })
  it('is empty with no sessions', () => {
    expect(weekSessions(EMPTY, THU)).toEqual([])
  })
})

describe('recentWeeks', () => {
  const THU = new Date(2026, 9, 22, 14)

  it('returns `count` weeks ending with the current one, oldest first', () => {
    const weeks = recentWeeks(EMPTY, THU, 4)
    expect(weeks.map((w) => w.start)).toEqual(['2026-09-28', '2026-10-05', '2026-10-12', '2026-10-19'])
    expect(weeks.every((w) => w.sessions.length === 0)).toBe(true)
  })
  it('puts each session in its own week, oldest first within the week', () => {
    const doc = withSessions(
      session('legs', '2026-10-21'),
      session('push', '2026-10-19'),
      session('pull', '2026-10-11', '20:00'),
      session('full', '2026-10-12', '07:00'),
      session('push', '2026-09-01'),
    )
    const weeks = recentWeeks(doc, THU, 3)
    expect(weeks.map((w) => w.start)).toEqual(['2026-10-05', '2026-10-12', '2026-10-19'])
    expect(weeks.map((w) => w.sessions.map((s) => s.routineId))).toEqual([['pull'], ['full'], ['push', 'legs']])
  })
  it('agrees with weekSessions for the current week', () => {
    const doc = withSessions(session('push', '2026-10-19'), session('pull', '2026-10-24'))
    expect(recentWeeks(doc, THU, 2)[1].sessions).toEqual(weekSessions(doc, THU))
  })
  it('crosses month and year boundaries', () => {
    expect(recentWeeks(EMPTY, new Date(2027, 0, 2), 3).map((w) => w.start)).toEqual(['2026-12-14', '2026-12-21', '2026-12-28'])
  })
  it('handles one week and zero weeks', () => {
    expect(recentWeeks(EMPTY, THU, 1).map((w) => w.start)).toEqual(['2026-10-19'])
    expect(recentWeeks(EMPTY, THU, 0)).toEqual([])
  })
})

describe('routinesWith', () => {
  it('lists the routines that include the exercise, in rotation order', () => {
    expect(routinesWith(EMPTY, 'plank').map((r) => r.routineId)).toEqual(['push', 'legs'])
    expect(routinesWith(EMPTY, 'push-up').map((r) => r.routineId)).toEqual(['push', 'full'])
    expect(routinesWith(EMPTY, 'pull-up').map((r) => r.routineId)).toEqual(['pull'])
  })
  it('follows the rotation order rather than the routines array', () => {
    const doc: WorkoutDoc = { ...EMPTY, program: { ...EMPTY.program, order: ['full', 'legs', 'pull', 'push'] } }
    expect(routinesWith(doc, 'plank').map((r) => r.routineId)).toEqual(['legs', 'push'])
  })
  it('is empty for an exercise that is in no routine', () => {
    expect(routinesWith(EMPTY, 'dead-hang')).toEqual([])
  })
  it('follows the current version, not older ones', () => {
    const v2 = { ...EMPTY.routines[0], version: 2, items: [] }
    const doc = { ...EMPTY, routines: [...EMPTY.routines, v2], program: { ...EMPTY.program, current: { ...EMPTY.program.current, push: 2 } } }
    expect(routinesWith(doc, 'push-up').map((r) => [r.routineId, r.version])).toEqual([['full', 1]])
  })
})
