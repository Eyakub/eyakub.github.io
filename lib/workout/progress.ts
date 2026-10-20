// Pure data shaping for Today's body cards and the Progress screen. No React, no dates from the clock.
import { formatDayMonth, parseIsoDate } from './dates'
import { chronological } from './rotation'
import type { Id, IsoDate, Measure, SessionRecord, WorkoutDoc } from './types'

export interface WeekTotal {
  start: IsoDate
  sessions: SessionRecord[]
  count: number
  hitGoal: boolean
}

export function weekTotals(weeks: { start: IsoDate; sessions: SessionRecord[] }[], goal: number): WeekTotal[] {
  return weeks.map((w) => ({ ...w, count: w.sessions.length, hitGoal: w.sessions.length >= goal }))
}

/** Sessions and goal hits over the finished weeks. `weeks` ends with the current week, which is still filling up, so it is left out. */
export function recentSummary(weeks: WeekTotal[]): { weeks: number; total: number; hits: number } {
  const done = weeks.slice(0, -1)
  return { weeks: done.length, total: done.reduce((n, w) => n + w.count, 0), hits: done.filter((w) => w.hitGoal).length }
}

export interface ExerciseOption {
  id: Id
  name: string
  sessions: number
}

const worked = (s: SessionRecord) => s.exercises.filter((e) => !e.skipped && e.sets.some((x) => x.done))

/** Exercises that appear in finished sessions, most logged first. The name is the one on the latest session. */
export function exerciseOptions(doc: WorkoutDoc): ExerciseOption[] {
  const found = new Map<Id, ExerciseOption>()
  for (const s of chronological(doc)) {
    for (const e of worked(s)) found.set(e.exerciseId, { id: e.exerciseId, name: e.name, sessions: (found.get(e.exerciseId)?.sessions ?? 0) + 1 })
  }
  return [...found.values()].sort((a, b) => b.sessions - a.sessions || a.name.localeCompare(b.name))
}

export interface ExercisePoint {
  date: IsoDate
  measure: Measure
  /** Reps or seconds of every done set, in order. */
  values: number[]
  total: number
  /** Every planned set was done at the top of the target range. */
  hitTop: boolean
}

/** One point per finished session that included the exercise, oldest first. */
export function exerciseSeries(doc: WorkoutDoc, exerciseId: Id): ExercisePoint[] {
  return chronological(doc).flatMap((s) => {
    const e = worked(s).find((x) => x.exerciseId === exerciseId)
    if (!e) return []
    const values = e.sets.flatMap((x) => (x.done && x.value !== null ? [x.value] : []))
    const planned = e.sets.slice(0, e.target.sets)
    const hitTop = planned.length === e.target.sets && planned.every((x) => x.done && x.value !== null && x.value >= e.target.max)
    return [{ date: s.date, measure: e.measure, values, total: values.reduce((n, v) => n + v, 0), hitTop }]
  })
}

/** True when the latest session hit the top of the range on every planned set: time to make it harder. */
export function hitTopOfRange(series: ExercisePoint[]): boolean {
  return series.length > 0 && series[series.length - 1].hitTop
}

export interface Scale {
  min: number
  max: number
  ticks: number[]
}

const STEPS = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50]
const round2 = (n: number) => Math.round(n * 100) / 100

/** A line chart's y range with 10% air around the values, and round ticks (at most three gaps) inside it. */
export function lineScale(values: number[]): Scale {
  let lo = Math.min(...values)
  let hi = Math.max(...values)
  if (hi - lo < 1e-9) {
    lo -= 1
    hi += 1
  }
  const span = hi - lo
  const min = lo - span * 0.1
  const max = hi + span * 0.1
  const step = STEPS.find((s) => span / s <= 3) ?? STEPS[STEPS.length - 1]
  const ticks: number[] = []
  for (let t = Math.ceil(min / step) * step; t <= max + 1e-9; t += step) ticks.push(round2(t))
  return { min, max, ticks }
}

/** A bar chart's top and its gridline ticks, starting at 0. */
export function barScale(max: number): { top: number; ticks: number[] } {
  const raw = Math.max(max, 1) * 1.15
  const step = raw <= 30 ? 10 : raw <= 80 ? 20 : raw <= 200 ? 50 : 100
  const top = Math.ceil(raw / step) * step
  return { top, ticks: Array.from({ length: top / step + 1 }, (_, i) => i * step) }
}

export interface Change {
  word: 'Down' | 'Up' | 'Unchanged'
  amount: string
  since: string
}

/** Latest minus first entry, worded for a sentence. Null with fewer than two entries. */
export function changeSince(series: { date: IsoDate; value: number }[], format: (n: number) => string): Change | null {
  if (series.length < 2) return null
  const diff = series[series.length - 1].value - series[0].value
  const amount = format(Math.abs(diff))
  const word = parseFloat(amount) === 0 ? 'Unchanged' : diff < 0 ? 'Down' : 'Up'
  return { word, amount, since: formatDayMonth(parseIsoDate(series[0].date)) }
}

export const changeText = (c: Change, unit = ''): string =>
  c.word === 'Unchanged' ? `Unchanged since ${c.since}` : `${c.word} ${c.amount}${unit ? ` ${unit}` : ''} since ${c.since}`

export interface GoalGap {
  amount: string
  reached: boolean
}

/** How far the latest value is above a target that is being lowered. Null without a target. */
export function goalGap(latest: number, target: number | null, format: (n: number) => string): GoalGap | null {
  if (target === null) return null
  const amount = format(Math.max(0, latest - target))
  return { amount, reached: parseFloat(amount) === 0 }
}

export const goalText = (g: GoalGap, unit: string): string => (g.reached ? 'At your goal' : `${g.amount} ${unit} to your goal`)

/** The small line under a body card on Today. A target wins; otherwise the change since the first entry. */
export function bodySubline(
  series: { date: IsoDate; value: number }[],
  target: number | null,
  unit: string,
  format: (n: number) => string,
): string {
  if (!series.length) return 'Not logged yet'
  const gap = goalGap(series[series.length - 1].value, target, format)
  if (gap) return goalText(gap, unit)
  const change = changeSince(series, format)
  return change ? changeText(change) : `First entry ${formatDayMonth(parseIsoDate(series[0].date))}`
}
