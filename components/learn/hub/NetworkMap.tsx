import type { CSSProperties, KeyboardEvent } from 'react'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { UiKey } from '../../../data/learn/ui'
import { LINES, STATIONS, WALKWAYS } from '../../../data/learn/network'

interface Props {
  openSlugs: string[]
  learned: string[]
  onStation: (slug: string) => void
}

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
      <div className="map-card">
        <svg className="network-svg" viewBox="40 58 920 488" role="group" aria-labelledby="map-h">
          {WALKWAYS.map(([a, b]) => (
            <path
              key={`${a}-${b}`}
              className="walk"
              d={`M${STATIONS[a].x} ${STATIONS[a].y}L${STATIONS[b].x} ${STATIONS[b].y}`}
            />
          ))}
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
            const cls = ['st', open ? 'open' : 'soon', s.interchange ? 'x' : '', done ? 'done' : ''].filter(Boolean).join(' ')
            const status = open ? ui('open') : ui(('p' + s.phase) as UiKey)
            const ty = s.lab === 'up' ? s.y - 26 : s.y + 36
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
                <circle className="dot" cx={s.x} cy={s.y} r={s.interchange ? 13 : 10} style={{ stroke: color }} />
                {done && <path className="chk" d={`M${s.x - 5} ${s.y}l3.5 3.5 6.5-7`} />}
                <text x={s.x} y={ty} textAnchor="middle">
                  {t(s.name)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <ul className="line-key">
        {LINES.map((l) => (
          <li key={l.id}>
            <i style={{ '--c': `var(${l.color})` } as CSSProperties} />
            {ui(l.name)}
          </li>
        ))}
      </ul>
    </>
  )
}
