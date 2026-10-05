import type { CSSProperties } from 'react'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import { fmt, num } from '../../../lib/learn/l10n'
import type { Kind, L10n, Step } from '../../../data/learn/types'
import { Rich } from '../shell/Rich'

interface Props { steps: Step[]; index: number; kind: Kind; whatIf?: L10n; takeaway?: L10n }

export default function NowPanel({ steps, index, kind, whatIf, takeaway }: Props) {
  const { t, ui, lang, mode } = useLearnPrefs()
  const step = steps[index]
  const nx = steps[index + 1]
  return (
    <div className="now" style={{ '--k': `var(--k-${kind})` } as CSSProperties}>
      <div className="band">
        <span id="stopno">{fmt(ui('stopOf'), { n: num(index + 1, lang), total: num(steps.length, lang) })}</span>
        <span className="pips" id="pips" aria-hidden="true">
          {steps.map((s, i) => <i key={s.id} className={i < index ? 'past' : i === index ? 'cur' : ''} />)}
        </span>
      </div>
      <div className="now-body" aria-live="polite">
        {whatIf && <p className="whatif">{t(whatIf)}</p>}
        <h2 id="step-title">{t(step.title)}</h2>
        <p id="step-simple"><Rich text={t(step.simple)} /></p>
        {mode === 'technical' && (
          <div className="tech" id="step-tech">
            <span className="tech-l">{ui('underHood')}</span>
            <p id="step-tech-text"><Rich text={t(step.tech)} /></p>
          </div>
        )}
        {takeaway ? (
          <div className="remember"><span>{ui('remember')}</span><p>{t(takeaway)}</p></div>
        ) : (
          <p className="next" id="step-next">{nx ? fmt(ui('nextStop'), { t: t(nx.title) }) : ui('endLine')}</p>
        )}
      </div>
    </div>
  )
}
