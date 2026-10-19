import { addDays, toIsoDate, weekDates } from './dates'
import { planFor } from './doc'
import type { DayPlan, IsoDate, RoutineVersion, SessionRecord, WorkoutDoc } from './types'

export type DayState = 'done' | 'missed' | 'today' | 'upcoming' | 'recovery' | 'rest'

export interface DayStatus {
  date: IsoDate
  plan: DayPlan
  state: DayState
}

export function sessionsOn(doc: WorkoutDoc, date: IsoDate): SessionRecord[] {
  return doc.sessions.filter((s) => s.date === date)
}

export function weekStatus(doc: WorkoutDoc, today: Date): DayStatus[] {
  const todayIso = toIsoDate(today)
  const created = toIsoDate(new Date(doc.createdAt))
  const done = new Set(doc.sessions.map((s) => s.date))
  return weekDates(today).map((d) => {
    const date = toIsoDate(d)
    const plan = planFor(doc, d)
    return { date, plan, state: dayState(plan, date, todayIso, created, done.has(date)) }
  })
}

function dayState(plan: DayPlan, date: IsoDate, todayIso: IsoDate, created: IsoDate, hasSession: boolean): DayState {
  if (hasSession) return 'done'
  // Days from before the app existed were never planned, so they can't have been missed.
  if (date < created) return 'rest'
  if (plan.kind !== 'routine') return plan.kind
  if (date < todayIso) return 'missed'
  return date === todayIso ? 'today' : 'upcoming'
}

export function weekProgress(doc: WorkoutDoc, today: Date): { planned: number; done: number } {
  const dates = weekDates(today)
  const planned = dates.filter((d) => planFor(doc, d).kind === 'routine').length
  const have = new Set(doc.sessions.map((s) => s.date))
  return { planned, done: dates.filter((d) => have.has(toIsoDate(d))).length }
}

export function streak(doc: WorkoutDoc, today: Date): number {
  const created = toIsoDate(new Date(doc.createdAt))
  const have = new Set(doc.sessions.map((s) => s.date))
  let count = have.has(toIsoDate(today)) ? 1 : 0
  for (let d = addDays(today, -1); toIsoDate(d) >= created; d = addDays(d, -1)) {
    if (have.has(toIsoDate(d))) count++
    else if (planFor(doc, d).kind === 'routine') break
  }
  return count
}

// 6 min of warm-up and changeovers, plus ~45 s of work per set and its rest.
export function estimateMinutes(r: RoutineVersion): number {
  const sec = r.items.reduce((sum, it) => sum + it.target.sets * (45 + it.restSec), 0)
  return Math.round((6 + sec / 60) / 5) * 5
}
