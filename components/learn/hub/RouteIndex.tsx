import type { CSSProperties } from 'react'
import Link from 'next/link'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { UiKey } from '../../../data/learn/ui'
import { FIRST_RIDE, LINES, ROUTE_SECTIONS, STATIONS } from '../../../data/learn/network'
import type { LineId } from '../../../data/learn/types'
import { fmt } from '../../../lib/learn/l10n'

interface Props {
  openSlugs: string[]
  learned: string[]
  onStation: (slug: string) => void
}

const lineOf = (id: LineId) => LINES.find((l) => l.id === id)!
const tint = (id: LineId) => ({ '--c': `var(${lineOf(id).color})` }) as CSSProperties

export default function RouteIndex({ openSlugs, learned, onStation }: Props) {
  const { t, ui } = useLearnPrefs()

  return (
    <div className="route-grid">
      {ROUTE_SECTIONS.map(({ lanes, rows }) => {
        // Each lane runs from its line's first row in this section to its last.
        const spans = lanes.map((ln) => {
          const at = rows.flatMap((id, i) => (lineOf(ln).stops.includes(id) ? [i] : []))
          return [at[0], at[at.length - 1]]
        })
        return (
          <section key={lanes.join('-')} className="route-sec">
            <h3>
              {lanes.map((ln) => (
                <span key={ln} style={tint(ln)}>
                  <i />
                  {ui(lineOf(ln).name)}
                </span>
              ))}
            </h3>
            <ol>
              {rows.map((id, r) => {
                const s = STATIONS[id]
                const open = openSlugs.includes(id)
                const done = learned.includes(id)
                const ride = FIRST_RIDE.indexOf(id)
                const onLanes = lanes.flatMap((ln, k) => (lineOf(ln).stops.includes(id) ? [k] : []))
                const other = LINES.find((l) => l.id !== s.line && l.stops.includes(id))
                const mk = ['mk', onLanes.length > 1 ? 'x' : `k${onLanes[0]}`, done ? 'done' : ride >= 0 ? 'ride' : ''].filter(Boolean).join(' ')
                const body = (
                  <>
                    <span className="sname">
                      <span className="nm">{t(s.name)}</span>
                      {s.level === 'beginner' && <span className="tag">{ui('levelBeginner')}</span>}
                      {done && <span className="tag ok">{ui('learned')}</span>}
                      {!open && <span className="tag">{ui(('p' + s.phase) as UiKey)}</span>}
                    </span>
                    {s.blurb && <span className="blurb">{t(s.blurb)}</span>}
                    {other && <span className="change">{fmt(ui('changeFor'), { line: ui(other.name) })}</span>}
                  </>
                )
                return (
                  <li key={id} className={open ? undefined : 'soon'} style={tint(s.line)}>
                    <span className="lanes" aria-hidden="true">
                      {lanes.map((ln, k) => {
                        const [a, b] = spans[k]
                        if (r < a || r > b || a === b) return null
                        return <span key={ln} className={`rail k${k} ${r === a ? 'start' : r === b ? 'end' : 'mid'}`} style={tint(ln)} />
                      })}
                      <span className={mk}>
                        {done ? (
                          <svg viewBox="0 0 20 20">
                            <path d="M5.5 10.5l3 3 6-6.5" />
                          </svg>
                        ) : ride >= 0 ? (
                          ride + 1
                        ) : null}
                      </span>
                    </span>
                    {open ? (
                      <Link href={'/learn/' + id} data-id={id}>
                        {body}
                      </Link>
                    ) : (
                      <button type="button" data-id={id} onClick={() => onStation(id)}>
                        {body}
                      </button>
                    )}
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
