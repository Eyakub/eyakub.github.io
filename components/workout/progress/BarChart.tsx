import { formatDayMonth, parseIsoDate } from '../../../lib/workout/dates'
import { barScale, type ExercisePoint } from '../../../lib/workout/progress'

const W = 340
const H = 140
const L = 24
const B = 22
const T = 14
const GHOST = [0.35, 0.5, 0.45, 0.65, 0.55, 0.75]

// Total reps (or seconds) per session. With no sessions it draws dashed placeholder bars.
export function BarChart({ points, label }: { points: ExercisePoint[]; label: string }) {
  const empty = points.length === 0
  const { top, ticks } = barScale(empty ? 40 : Math.max(...points.map((p) => p.total)))
  const count = Math.max(points.length, GHOST.length)
  const slot = (W - L) / count
  const bw = Math.min(24, slot * 0.55)
  const ih = H - T - B
  const Y = (v: number) => T + ((top - v) * ih) / top
  const last = points.length - 1

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={empty ? `${label}, no sessions yet` : `${label}: ${points.map((p) => p.total).join(', ')}`}>
      {ticks.map((t) => (
        <g key={t}>
          <line className="grid" x1={L} x2={W} y1={Y(t)} y2={Y(t)} />
          {!empty && (
            <text className="ax" x={L - 6} y={Y(t) + 3.5} textAnchor="end">
              {t}
            </text>
          )}
        </g>
      ))}
      {empty &&
        GHOST.map((f, i) => (
          <rect key={i} className="bar-empty" x={L + slot * i + (slot - bw) / 2} y={Y(0) - ih * f} width={bw} height={ih * f} rx="3" />
        ))}
      {points.map((p, i) => {
        const x = L + slot * i + (slot - bw) / 2
        return (
          <g key={`${p.date}-${i}`}>
            <rect className={i === last ? 'bar last' : 'bar'} x={x} y={Y(p.total)} width={bw} height={Y(0) - Y(p.total)} rx="3">
              <title>{`${formatDayMonth(parseIsoDate(p.date))}: ${p.values.join(', ')}`}</title>
            </rect>
            {i === last && (
              <text className="end-t" x={x + bw / 2} y={Y(p.total) - 5} textAnchor="middle">
                {p.total}
              </text>
            )}
            {(last - i) % 2 === 0 && (
              <text className="ax" x={x + bw / 2} y={H - 6} textAnchor="middle">
                {formatDayMonth(parseIsoDate(p.date))}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
