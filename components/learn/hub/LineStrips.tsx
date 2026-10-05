import type { CSSProperties } from 'react'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { UiKey } from '../../../data/learn/ui'
import { LINES, STATIONS } from '../../../data/learn/network'
import { fmt } from '../../../lib/learn/l10n'

interface Props {
  openSlugs: string[]
  learned: string[]
  onStation: (slug: string) => void
}

export default function LineStrips({ openSlugs, learned, onStation }: Props) {
  const { t, ui } = useLearnPrefs()

  return (
    <div className="strip-grid">
      {LINES.map((l) => (
        <section key={l.id} className="strip" style={{ '--c': `var(${l.color})` } as CSSProperties}>
          <h3>
            <i />
            {ui(l.name)}
          </h3>
          <ol>
            {l.stops.map((id) => {
              const s = STATIONS[id]
              const open = openSlugs.includes(id)
              const done = learned.includes(id)
              const other = LINES.find((o) => o.id !== l.id && o.stops.includes(id))
              const chip = done ? (
                <span className="chip learned">{ui('learned')}</span>
              ) : open ? (
                <span className="chip open">{s.level === 'beginner' ? ui('levelBeginner') : s.level === 'intermediate' ? ui('levelIntermediate') : ui('open')}</span>
              ) : (
                <span className="chip later">{ui(('p' + s.phase) as UiKey)}</span>
              )
              return (
                <li key={id} className={`${open ? 'open' : 'soon'} ${s.interchange ? 'x' : ''}`.trim()}>
                  <button type="button" data-id={id} onClick={() => onStation(id)}>
                    <span className="sdot" />
                    <span>
                      <span className="sname">{t(s.name)}</span>
                      {open && s.blurb && <span className="blurb">{t(s.blurb)}</span>}
                      {other && <span className="change">{fmt(ui('changeFor'), { line: ui(other.name) })}</span>}
                    </span>
                    {chip}
                  </button>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </div>
  )
}
