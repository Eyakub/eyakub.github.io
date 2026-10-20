import type { IsoDate, IsoTime } from './types'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const pad = (n: number) => String(n).padStart(2, '0')

// Whole calendar days since the epoch for d's local date. Built from UTC so DST can't skew it.
const dayNumber = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86_400_000

export function toIsoDate(d: Date): IsoDate {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function parseIsoDate(s: IsoDate): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

// Moves the calendar date and keeps the time of day, so a 23h or 25h DST day still counts as one.
export function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n, d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds())
}

/** Monday 0 … Sunday 6. */
export function weekdayIndex(d: Date): number {
  return (d.getDay() + 6) % 7
}

export function startOfWeek(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - weekdayIndex(d))
}

// "Tue 20 Oct". Fixed English names so the output doesn't depend on the browser locale.
export function formatDay(d: Date): string {
  return `${DAYS[weekdayIndex(d)]} ${d.getDate()} ${MONTHS[d.getMonth()]}`
}

/** 1 for the Monday-based week containing `start`, 2 for the next, and so on (never below 1). */
export function weekNumberSince(start: IsoTime, d: Date): number {
  const weeks = (dayNumber(startOfWeek(d)) - dayNumber(startOfWeek(new Date(start)))) / 7
  return Math.max(1, weeks + 1)
}
