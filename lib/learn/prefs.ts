import type { Lang } from './l10n'

export type Mode = 'simple' | 'technical'
export interface Prefs { lang: Lang; mode: Mode; learned: string[] }
export interface RawPrefs { lang: string | null; mode: string | null; learned: string | null }

export const DEFAULT_PREFS: Prefs = { lang: 'en', mode: 'simple', learned: [] }
export const KEYS = { lang: 'learn:lang', mode: 'learn:mode', learned: 'learn:learned' } as const

const safeJson = (raw: string | null): unknown => {
  if (raw == null) return undefined
  try { return JSON.parse(raw) } catch { return undefined }
}

export function parseStored(raw: RawPrefs): Prefs {
  const lang = safeJson(raw.lang)
  const mode = safeJson(raw.mode)
  const learned = safeJson(raw.learned)
  return {
    lang: lang === 'en' || lang === 'bn' ? lang : DEFAULT_PREFS.lang,
    mode: mode === 'simple' || mode === 'technical' ? mode : DEFAULT_PREFS.mode,
    learned: Array.isArray(learned) ? learned.filter((x): x is string => typeof x === 'string') : [],
  }
}
