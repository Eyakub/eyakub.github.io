export type Day = { n: number; level: number; date: string }
export type Week = { days: Day[]; month?: string }

const DAY_MS = 864e5
const monthOf = (date: string) => new Date(`${date}T00:00:00Z`).getUTCMonth()
const monthName = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' })

// `days` starts on a Sunday, so every 7 entries are one week column.
export function toWeeks(from: string, days: [number, number][]): Week[] {
  const start = Date.parse(`${from}T00:00:00Z`)
  const weeks: Week[] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({
      days: days.slice(i, i + 7).map(([n, level], j) => ({
        n,
        level,
        date: new Date(start + (i + j) * DAY_MS).toISOString().slice(0, 10),
      })),
    })
  }
  const changes = weeks.flatMap((w, i) => (i > 0 && monthOf(w.days[0].date) !== monthOf(weeks[i - 1].days[0].date) ? [i] : []))
  for (const i of changes) weeks[i].month = monthName(weeks[i].days[0].date)
  // Label the first column too, unless the next label is too close and would overlap it.
  if (weeks.length && (changes[0] ?? Infinity) >= 3) weeks[0].month = monthName(weeks[0].days[0].date)
  return weeks
}
