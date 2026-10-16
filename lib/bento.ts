const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

export const AXIS_START = 2019
export const AXIS_END = 2026
// Jan 2019 = 0 … Dec 2026 = 95; the axis spans 96 months.
export const AXIS_MONTHS = (AXIS_END - AXIS_START + 1) * 12

// "July 2025" -> months since Jan 2019. "Present" resolves to `now` (an ISO date).
export function monthIndex(label: string, now: string): number {
  if (label.trim().toLowerCase() === 'present') return monthIndex(`${MONTHS[+now.slice(5, 7) - 1]} ${now.slice(0, 4)}`, now)
  const [m, y] = label.trim().split(/\s+/)
  const mi = MONTHS.indexOf(m.slice(0, 3).toLowerCase())
  if (mi < 0 || !/^\d{4}$/.test(y ?? '')) throw new Error(`Unparseable month "${label}"`)
  return (+y - AXIS_START) * 12 + mi
}

export type Bar = { left: number; width: number; open: boolean }

// Percent offsets on the axis. A finished role runs to the end of its last month; the current one to mid-month.
export function bar(startDate: string, endDate: string, now: string): Bar {
  const open = endDate.trim().toLowerCase() === 'present'
  const a = monthIndex(startDate, now)
  const b = monthIndex(endDate, now) + (open ? 0.5 : 1)
  return { left: (a / AXIS_MONTHS) * 100, width: ((b - a) / AXIS_MONTHS) * 100, open }
}

// "Aadi BD Ltd." -> "Aadi BD", "Tryonyx (now The Prestige Global)" -> "Tryonyx"
export const shortCompany = (name: string) =>
  name.replace(/\s*\(.*\)/, '').replace(/\s+(Ltd|Inc)\.?$/, '')

// "May 2022", "August 2025" -> "May 2022 – Aug 2025"; same year -> "Feb – May 2019"; Present -> "now"
export function rangeLabel(startDate: string, endDate: string): string {
  const [sm, sy] = startDate.split(' ')
  const s = sm.slice(0, 3)
  if (endDate.toLowerCase() === 'present') return `${s} ${sy} – now`
  const [em, ey] = endDate.split(' ')
  return sy === ey ? `${s} – ${em.slice(0, 3)} ${ey}` : `${s} ${sy} – ${em.slice(0, 3)} ${ey}`
}
