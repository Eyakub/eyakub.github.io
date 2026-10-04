import { useEffect, useState, type CSSProperties } from 'react'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import { num } from '../../../lib/learn/l10n'
import type { Kind, Step } from '../../../data/learn/types'

interface Props { steps: Step[]; index: number; kind: Kind; onGo: (i: number) => void }

export default function StopList({ steps, index, kind, onGo }: Props) {
  const { t, ui, lang } = useLearnPrefs()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(window.matchMedia('(min-width: 980px)').matches)
  }, [])
  const k = { '--k': `var(--k-${kind})` } as CSSProperties
  return (
    <details className="stops" id="stops-d" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary>
        <span>{ui('allStops')}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </summary>
      <ol id="stops">
        {steps.map((s, i) => (
          <li key={s.id} className={i < index ? 'past' : i === index ? 'cur' : ''} style={k}>
            <button type="button" onClick={() => onGo(i)}>
              <span className="pin" />
              <span><span className="n">{num(i + 1, lang)}</span>{t(s.title)}</span>
            </button>
          </li>
        ))}
      </ol>
    </details>
  )
}
