import type { Load, Measure, Target } from './types'

export function formatRange(t: Target, m: Measure): string {
  const range = t.min === t.max ? `${t.min}` : `${t.min}–${t.max}`
  return `${range}${m === 'seconds' ? ' s' : ''}${t.per ? `/${t.per}` : ''}`
}

export function formatTarget(t: Target, m: Measure): string {
  return `${t.sets} × ${formatRange(t, m)}`
}

export function formatRest(sec: number): string {
  const s = Math.round(sec)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function formatLoad(l: Load): string {
  if (l.kind === 'bodyweight') return 'Bodyweight'
  return `${l.kg} kg${l.count === 2 ? ' ×2' : ''}`
}

export function formatKg(n: number): string {
  return n.toFixed(1)
}

// Tape measures read in quarters: 35 -> "35.0", 35.25 -> "35.25".
export function formatInches(n: number): string {
  return Math.abs(n * 10 - Math.round(n * 10)) < 1e-6 ? n.toFixed(1) : n.toFixed(2)
}

const WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve']

/** 4 -> "Four" for small counts; larger numbers stay digits. */
export function inWords(n: number): string {
  return WORDS[n] ?? String(n)
}
