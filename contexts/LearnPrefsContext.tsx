import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { tr, type L10n, type Lang } from '../lib/learn/l10n'
import { DEFAULT_PREFS, KEYS, parseStored, type Mode, type Prefs } from '../lib/learn/prefs'
import { UI, type UiKey } from '../data/learn/ui'

interface LearnPrefsValue {
  lang: Lang
  mode: Mode
  learned: string[]
  setLang: (lang: Lang) => void
  setMode: (mode: Mode) => void
  toggleLearned: (slug: string) => void
  t: (v: L10n) => string
  ui: (k: UiKey) => string
}

const LearnPrefsContext = createContext<LearnPrefsValue | null>(null)

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage unavailable (private mode, quota): the preference just won't persist
  }
}

export function LearnPrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS)

  useEffect(() => {
    try {
      setPrefs(
        parseStored({
          lang: localStorage.getItem(KEYS.lang),
          mode: localStorage.getItem(KEYS.mode),
          learned: localStorage.getItem(KEYS.learned),
        }),
      )
    } catch {
      setPrefs(DEFAULT_PREFS)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = prefs.lang
  }, [prefs.lang])

  const setLang = useCallback((lang: Lang) => {
    setPrefs((p) => ({ ...p, lang }))
    write(KEYS.lang, lang)
  }, [])
  const setMode = useCallback((mode: Mode) => {
    setPrefs((p) => ({ ...p, mode }))
    write(KEYS.mode, mode)
  }, [])
  const toggleLearned = useCallback((slug: string) => {
    setPrefs((p) => {
      const learned = p.learned.includes(slug) ? p.learned.filter((s) => s !== slug) : [...p.learned, slug]
      write(KEYS.learned, learned)
      return { ...p, learned }
    })
  }, [])

  const value = useMemo<LearnPrefsValue>(
    () => ({
      lang: prefs.lang,
      mode: prefs.mode,
      learned: prefs.learned,
      setLang,
      setMode,
      toggleLearned,
      t: (v) => tr(v, prefs.lang),
      ui: (k) => tr(UI[k], prefs.lang),
    }),
    [prefs, setLang, setMode, toggleLearned],
  )

  return <LearnPrefsContext.Provider value={value}>{children}</LearnPrefsContext.Provider>
}

export function useLearnPrefs(): LearnPrefsValue {
  const ctx = useContext(LearnPrefsContext)
  if (!ctx) throw new Error('useLearnPrefs must be used inside LearnPrefsProvider')
  return ctx
}
