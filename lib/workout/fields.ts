export interface FieldRange {
  min: number
  max: number
  unit: string
}

// Plausible human ranges; they only catch typos like 815 for 81.5, not goals.
export const RANGES = {
  weightKg: { min: 30, max: 250, unit: 'kg' },
  waistIn: { min: 20, max: 70, unit: 'in' },
  heightCm: { min: 100, max: 230, unit: 'cm' },
  dumbbellKg: { min: 1, max: 50, unit: 'kg' },
} as const satisfies Record<string, FieldRange>

const DECIMAL = /^(\d+\.?\d*|\.\d+)$/

/** "72.4" or "72,4" -> 72.4. Anything else (blank, "7 2", "1e3", "-5") -> null. */
export function parseDecimal(text: string): number | null {
  const t = text.trim().replace(',', '.')
  return DECIMAL.test(t) ? Number(t) : null
}

// A string discriminant, not a boolean: Next type-checks with the repo's non-strict tsconfig, where boolean
// discriminants don't narrow.
export type RequiredResult = { status: 'valid'; value: number } | { status: 'invalid'; error: string }
export type OptionalResult = { status: 'valid'; value: number | null } | { status: 'invalid'; error: string }

export function checkRequired(text: string, range: FieldRange): RequiredResult {
  const value = parseDecimal(text)
  if (value === null || value < range.min || value > range.max) {
    return { status: 'invalid', error: `Enter a number between ${range.min} and ${range.max} ${range.unit}.` }
  }
  return { status: 'valid', value }
}

/** Blank is fine (value null); anything else must pass like a required field. */
export function checkOptional(text: string, range: FieldRange): OptionalResult {
  return text.trim() === '' ? { status: 'valid', value: null } : checkRequired(text, range)
}
