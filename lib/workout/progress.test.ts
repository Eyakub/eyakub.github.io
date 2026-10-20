import { describe, expect, it } from 'vitest'
import { createDoc } from './doc'
import { formatInches, formatKg } from './format'
import {
  barScale,
  bodySubline,
  changeSince,
  changeText,
  exerciseOptions,
  exerciseSeries,
  goalGap,
  goalText,
  hitTopOfRange,
  lineScale,
  recentSummary,
  weekTotals,
} from './progress'
import { recentWeeks } from './rotation'
import type { LoggedSet, ProgramSeed, SessionExercise, SessionRecord, WorkoutDoc } from './types'

const SEED: ProgramSeed = { routines: [], order: ['push', 'pull'], weeklyGoal: 4 }
const INPUT = { weightKg: 80, waistIn: null, heightCm: null, targetWeightKg: null, targetWaistIn: null, equipment: [], dumbbellKg: 7.5 }
const EMPTY = createDoc(SEED, INPUT, new Date(2026, 9, 1, 8), 'dev')

const sets = (...values: (number | null)[]): LoggedSet[] => values.map((value) => ({ value, done: value !== null }))
const exercise = (exerciseId: string, s: LoggedSet[], opts: Partial<SessionExercise> = {}): SessionExercise => ({
  exerciseId,
  name: exerciseId.toUpperCase(),
  measure: 'reps',
  target: { sets: 3, min: 10, max: 15 },
  load: { kind: 'bodyweight' },
  restSec: 60,
  sets: s,
  skipped: false,
  ...opts,
})

let n = 0
const session = (date: string, exercises: SessionExercise[] = [], routineId = 'push'): SessionRecord => {
  n += 1
  const at = `${date}T09:00:${String(n % 60).padStart(2, '0')}.000Z`
  return { id: `s${n}`, date, routineId, routineVersion: 1, routineName: routineId, startedAt: at, finishedAt: at, durationSec: 2400, exercises, updatedAt: at }
}
const withSessions = (...sessions: SessionRecord[]): WorkoutDoc => ({ ...EMPTY, sessions })

describe('weekTotals / recentSummary', () => {
  // Nine Monday-start weeks ending with the one containing Tue 20 Oct 2026; the first starts Mon 24 Aug.
  const today = new Date(2026, 9, 20)
  const day = (week: number, offset: number) => {
    const d = new Date(2026, 7, 24 + week * 7 + offset)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  it('counts sessions per week and flags the weeks that reached the goal', () => {
    const doc = withSessions(
      ...[0, 2, 4, 5].map((o) => session(day(0, o))), // week 0: four
      ...[1, 3, 5].map((o) => session(day(1, o))), // week 1: three
      session(day(2, 0)),
    )
    const totals = weekTotals(recentWeeks(doc, today, 9), 4)
    expect(totals).toHaveLength(9)
    expect(totals.map((w) => w.count)).toEqual([4, 3, 1, 0, 0, 0, 0, 0, 0])
    expect(totals.map((w) => w.hitGoal)).toEqual([true, false, false, false, false, false, false, false, false])
  })

  it('treats more than the goal as a hit', () => {
    const doc = withSessions(...[0, 1, 2, 3, 4].map((o) => session(day(0, o))))
    expect(weekTotals(recentWeeks(doc, today, 9), 4)[0]).toMatchObject({ count: 5, hitGoal: true })
  })

  it('summarises the eight finished weeks and leaves the current one out', () => {
    const doc = withSessions(
      ...[0, 2, 4, 5].map((o) => session(day(0, o))),
      ...[1, 3, 5].map((o) => session(day(1, o))),
      ...[0, 2, 4, 5].map((o) => session(day(7, o))),
      session(day(8, 0)), // the current week, still open
    )
    expect(recentSummary(weekTotals(recentWeeks(doc, today, 9), 4))).toEqual({ weeks: 8, total: 11, hits: 2 })
  })

  it('is all zeros for an empty history', () => {
    expect(recentSummary(weekTotals(recentWeeks(EMPTY, today, 9), 4))).toEqual({ weeks: 8, total: 0, hits: 0 })
  })

  it('follows a different goal', () => {
    const doc = withSessions(...[0, 2, 4].map((o) => session(day(0, o))))
    expect(recentSummary(weekTotals(recentWeeks(doc, today, 9), 3))).toMatchObject({ total: 3, hits: 1 })
  })
})

describe('exerciseOptions', () => {
  it('lists exercises from finished sessions, most logged first', () => {
    const doc = withSessions(
      session('2026-10-01', [exercise('push-up', sets(15, 15, 15)), exercise('pull-up', sets(8, 7, 6))]),
      session('2026-10-03', [exercise('push-up', sets(15, 15, 14))]),
    )
    expect(exerciseOptions(doc).map((o) => [o.id, o.sessions])).toEqual([
      ['push-up', 2],
      ['pull-up', 1],
    ])
  })

  it('skips skipped exercises and ones with no done set', () => {
    const doc = withSessions(
      session('2026-10-01', [
        exercise('push-up', sets(15, 15, 15), { skipped: true }),
        exercise('pull-up', sets(null, null)),
        exercise('dead-hang', sets(30, 25), { measure: 'seconds' }),
      ]),
    )
    expect(exerciseOptions(doc).map((o) => o.id)).toEqual(['dead-hang'])
  })

  it('uses the name from the latest session and is empty with no sessions', () => {
    const doc = withSessions(
      session('2026-10-01', [exercise('push-up', sets(10), { name: 'Old name' })]),
      session('2026-10-03', [exercise('push-up', sets(10), { name: 'Push-up' })]),
    )
    expect(exerciseOptions(doc)[0].name).toBe('Push-up')
    expect(exerciseOptions(EMPTY)).toEqual([])
  })
})

describe('exerciseSeries / hitTopOfRange', () => {
  it('returns one point per session, oldest first, with the total of done sets', () => {
    const doc = withSessions(
      session('2026-10-08', [exercise('push-up', sets(15, 14, 13))]),
      session('2026-10-01', [exercise('push-up', sets(13, 12, 10)), exercise('pull-up', sets(5))]),
    )
    const series = exerciseSeries(doc, 'push-up')
    expect(series.map((p) => [p.date, p.total, p.values])).toEqual([
      ['2026-10-01', 35, [13, 12, 10]],
      ['2026-10-08', 42, [15, 14, 13]],
    ])
    expect(exerciseSeries(doc, 'squat')).toEqual([])
  })

  it('ignores sets that were not done', () => {
    const doc = withSessions(session('2026-10-01', [exercise('push-up', [{ value: 12, done: true }, { value: 9, done: false }, { value: null, done: false }])]))
    expect(exerciseSeries(doc, 'push-up')[0]).toMatchObject({ total: 12, values: [12] })
  })

  it('carries the measure for holds', () => {
    const doc = withSessions(session('2026-10-01', [exercise('plank', sets(45, 40), { measure: 'seconds', target: { sets: 2, min: 45, max: 45 } })]))
    expect(exerciseSeries(doc, 'plank')[0]).toMatchObject({ measure: 'seconds', total: 85 })
  })

  it('hits the top when every planned set reached the max', () => {
    const doc = withSessions(session('2026-10-01', [exercise('push-up', sets(15, 15, 15))]))
    expect(hitTopOfRange(exerciseSeries(doc, 'push-up'))).toBe(true)
  })

  it('does not hit the top when one planned set fell short or is missing', () => {
    const short = withSessions(session('2026-10-01', [exercise('push-up', sets(15, 15, 14))]))
    expect(hitTopOfRange(exerciseSeries(short, 'push-up'))).toBe(false)
    const missing = withSessions(session('2026-10-01', [exercise('push-up', sets(15, 15))]))
    expect(hitTopOfRange(exerciseSeries(missing, 'push-up'))).toBe(false)
  })

  it('counts extra sets but does not need them', () => {
    const doc = withSessions(session('2026-10-01', [exercise('push-up', sets(15, 15, 15, 8))]))
    expect(hitTopOfRange(exerciseSeries(doc, 'push-up'))).toBe(true)
  })

  it('only looks at the latest session', () => {
    const doc = withSessions(
      session('2026-10-01', [exercise('push-up', sets(15, 15, 15))]),
      session('2026-10-08', [exercise('push-up', sets(15, 12, 10))]),
    )
    expect(hitTopOfRange(exerciseSeries(doc, 'push-up'))).toBe(false)
    expect(hitTopOfRange([])).toBe(false)
  })
})

describe('lineScale / barScale', () => {
  it('pads the range and picks round ticks inside it', () => {
    const s = lineScale([76, 80.6, 78.5])
    expect(s.ticks).toEqual([76, 78, 80])
    expect(s.min).toBeLessThan(76)
    expect(s.max).toBeGreaterThan(80.6)
  })

  it('uses whole numbers for a small range such as a waist', () => {
    expect(lineScale([34, 36]).ticks).toEqual([34, 35, 36])
  })

  it('still draws something for a single value', () => {
    const s = lineScale([78.5])
    expect(s.min).toBeLessThan(78.5)
    expect(s.max).toBeGreaterThan(78.5)
    expect(s.ticks.length).toBeGreaterThanOrEqual(2)
  })

  it('rounds a bar chart top up with ticks from zero', () => {
    expect(barScale(45)).toEqual({ top: 60, ticks: [0, 20, 40, 60] })
    expect(barScale(12)).toEqual({ top: 20, ticks: [0, 10, 20] })
    expect(barScale(135)).toEqual({ top: 200, ticks: [0, 50, 100, 150, 200] })
    expect(barScale(0).ticks[0]).toBe(0)
  })
})

describe('body notes', () => {
  const weights = [
    { date: '2026-08-25', value: 80.6 },
    { date: '2026-10-20', value: 78.5 },
  ]

  it('words the change since the first entry', () => {
    expect(changeText(changeSince(weights, formatKg)!)).toBe('Down 2.1 since 25 Aug')
    expect(changeText(changeSince(weights, formatKg)!, 'kg')).toBe('Down 2.1 kg since 25 Aug')
    const up = [
      { date: '2026-08-25', value: 34.6 },
      { date: '2026-10-20', value: 35 },
    ]
    expect(changeText(changeSince(up, formatInches)!)).toBe('Up 0.4 since 25 Aug')
  })

  it('has no change with fewer than two entries, and calls a flat line unchanged', () => {
    expect(changeSince([weights[0]], formatKg)).toBeNull()
    expect(changeSince([], formatKg)).toBeNull()
    const flat = [weights[0], { date: '2026-10-20', value: 80.6 }]
    expect(changeText(changeSince(flat, formatKg)!)).toBe('Unchanged since 25 Aug')
  })

  it('measures the gap to a target that is being lowered', () => {
    expect(goalText(goalGap(78.5, 76, formatKg)!, 'kg')).toBe('2.5 kg to your goal')
    expect(goalText(goalGap(76, 76, formatKg)!, 'kg')).toBe('At your goal')
    expect(goalText(goalGap(75.2, 76, formatKg)!, 'kg')).toBe('At your goal')
    expect(goalGap(78.5, null, formatKg)).toBeNull()
  })

  it('picks the Today sub-line', () => {
    expect(bodySubline([], 76, 'kg', formatKg)).toBe('Not logged yet')
    expect(bodySubline(weights, 76, 'kg', formatKg)).toBe('2.5 kg to your goal')
    expect(bodySubline(weights, null, 'kg', formatKg)).toBe('Down 2.1 since 25 Aug')
    expect(bodySubline([weights[1]], null, 'kg', formatKg)).toBe('First entry 20 Oct')
    expect(bodySubline([weights[1]], 76, 'kg', formatKg)).toBe('2.5 kg to your goal')
    expect(bodySubline([{ date: '2026-10-20', value: 75.5 }], 76, 'kg', formatKg)).toBe('At your goal')
  })
})
