import type { CSSProperties, KeyboardEvent } from 'react'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { UiKey } from '../../../data/learn/ui'
import { FIRST_RIDE, LINES, STATIONS, WALKWAYS, type Station } from '../../../data/learn/network'

interface Props {
  openSlugs: string[]
  learned: string[]
  onStation: (slug: string) => void
}

const labelY = (s: Station) => (s.lab === 'up' ? s.y - 26 : s.y + 38)

export default function NetworkMap({ openSlugs, learned, onStation }: Props) {
  const { t, ui } = useLearnPrefs()

  const onKey = (e: KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onStation(id)
    }
  }

  return (
    <>
      <svg className="network-svg" viewBox="40 58 1100 620" role="group" aria-labelledby="map-h">
        {/* Walkways run behind station names; the mask cuts them out under every label, word gaps included. */}
        <mask id="walk-knock" maskUnits="userSpaceOnUse" x="40" y="58" width="1100" height="620">
          <rect x="40" y="58" width="1100" height="620" fill="#fff" />
          {Object.entries(STATIONS).map(([id, s]) => (
            <text key={id} x={s.x} y={labelY(s)} textAnchor="middle">
              {t(s.name)}
            </text>
          ))}
        </mask>
        <g mask="url(#walk-knock)">
          {WALKWAYS.map(({ from, to, via = [] }) => (
            <path
              key={`${from}-${to}`}
              className="walk"
              d={'M' + [[STATIONS[from].x, STATIONS[from].y], ...via, [STATIONS[to].x, STATIONS[to].y]].map((p) => p.join(' ')).join('L')}
            />
          ))}
        </g>
        {LINES.map((l) => (
          <polyline
            key={l.id}
            className="ln"
            points={l.pts.map((p) => p.join(',')).join(' ')}
            style={{ stroke: `var(${l.color})` }}
          />
        ))}
        {Object.entries(STATIONS).map(([id, s]) => {
          const color = `var(${LINES.find((l) => l.id === s.line)!.color})`
          const open = openSlugs.includes(id)
          const done = learned.includes(id)
          const ride = done ? -1 : FIRST_RIDE.indexOf(id)
          const cls = ['st', open ? 'open' : 'soon', s.interchange ? 'x' : '', done ? 'done' : '', ride >= 0 ? 'first' : ''].filter(Boolean).join(' ')
          const status = open ? ui('open') : ui(('p' + s.phase) as UiKey)
          return (
            <g
              key={id}
              className={cls}
              data-id={id}
              role="link"
              tabIndex={0}
              aria-label={`${t(s.name)}, ${status}`}
              style={{ '--st': color } as CSSProperties}
              onClick={() => onStation(id)}
              onKeyDown={(e) => onKey(e, id)}
            >
              <circle className="hit" cx={s.x} cy={s.y} r={24} />
              <circle className="dot" cx={s.x} cy={s.y} r={ride >= 0 ? 15 : s.interchange ? 13 : 10} style={{ stroke: color }} />
              {ride >= 0 && (
                <text className="rn" x={s.x} y={s.y}>
                  {ride + 1}
                </text>
              )}
              {done && <path className="chk" d={`M${s.x - 5} ${s.y}l3.5 3.5 6.5-7`} />}
              <text x={s.x} y={labelY(s)} textAnchor="middle">
                {t(s.name)}
              </text>
            </g>
          )
        })}
      </svg>
      <ul className="map-key">
        {LINES.map((l) => (
          <li key={l.id}>
            <svg viewBox="0 0 28 16" aria-hidden="true">
              <path className="k-ln" d="M3 8h22" style={{ stroke: `var(${l.color})` }} />
            </svg>
            {ui(l.name)}
          </li>
        ))}
        <li>
          <svg viewBox="0 0 28 16" aria-hidden="true">
            <circle className="k-x" cx="14" cy="8" r="6" />
          </svg>
          {ui('keyChange')}
        </li>
        <li>
          <svg viewBox="0 0 28 16" aria-hidden="true">
            <circle className="k-first" cx="14" cy="8" r="8" />
            <text className="k-rn" x="14" y="8">1</text>
          </svg>
          {ui('keyFirst')}
        </li>
        <li>
          <svg viewBox="0 0 28 16" aria-hidden="true">
            <path className="k-walk" d="M3 8h22" />
          </svg>
          {ui('keyWalk')}
        </li>
      </ul>
    </>
  )
}
