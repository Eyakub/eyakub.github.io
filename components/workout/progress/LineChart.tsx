import { formatDayMonth, parseIsoDate } from '../../../lib/workout/dates'
import { lineScale } from '../../../lib/workout/progress'
import type { IsoDate } from '../../../lib/workout/types'

interface Props {
  points: { date: IsoDate; value: number }[]
  goal: number | null
  label: string
  unit: string
  format: (n: number) => string
}

const W = 340
const H = 150
const L = 30
const R = 52
const T = 12
const B = 22
const DAY = 86_400_000
const time = (d: IsoDate) => parseIsoDate(d).getTime()

// Time on the x axis, so a gap between entries shows as a gap. With no entries it draws a dashed guide instead of data.
export function LineChart({ points, goal, label, unit, format }: Props) {
  const values = [...points.map((p) => p.value), ...(goal === null ? [] : [goal])]
  const { min, max, ticks } = values.length ? lineScale(values) : { min: 0, max: 1, ticks: [] }
  const ih = H - T - B
  const right = W - R
  const Y = (v: number) => T + ((max - v) * ih) / (max - min)

  const first = points[0]
  const last = points[points.length - 1]
  const span = first && last ? time(last.date) - time(first.date) : 0
  const X = (d: IsoDate) => (span > 0 ? L + ((time(d) - time(first.date)) / span) * (right - L) : right)

  const lastY = last ? Y(last.value) : 0
  const goalY = goal === null ? 0 : Y(goal)
  // keep "Goal 76" clear of the latest value when they sit close together
  const goalLabelY = last && Math.abs(goalY - lastY) < 14 ? (goalY >= lastY ? lastY + 18 : lastY - 10) : goalY + 3.5
  const mid = span >= 6 * DAY ? new Date(time(first.date) + span / 2) : null

  return (
    <svg
      className="chart"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={last ? `${label} from ${format(first.value)} to ${format(last.value)} ${unit}` : `${label}, no entries yet`}
    >
      {points.length === 0 && ticks.length === 0 &&
        [0.2, 0.5, 0.8].map((f) => <line key={f} className="grid" x1={L} x2={right} y1={T + ih * f} y2={T + ih * f} />)}
      {ticks.map((t) => (
        <g key={t}>
          <line className="grid" x1={L} x2={right} y1={Y(t)} y2={Y(t)} />
          <text className="ax" x={L - 6} y={Y(t) + 3.5} textAnchor="end">
            {t}
          </text>
        </g>
      ))}
      {goal !== null && (
        <g>
          <line className="goal" x1={L} x2={right} y1={goalY} y2={goalY} />
          <text className="ax goal-t" x={right + 6} y={goalLabelY}>
            Goal {goal}
          </text>
        </g>
      )}
      {points.length === 0 && (
        <path className="ghost" d={`M${L + 4} ${T + ih * 0.3}L${L + 60} ${T + ih * 0.4}L${L + 120} ${T + ih * 0.36}L${L + 180} ${T + ih * 0.55}L${right - 4} ${T + ih * 0.62}`} />
      )}
      {first && (
        <text className="ax" x={span > 0 ? L : right} y={H - 5} textAnchor={span > 0 ? 'start' : 'end'}>
          {formatDayMonth(parseIsoDate(first.date))}
        </text>
      )}
      {mid && (
        <text className="ax" x={(L + right) / 2} y={H - 5} textAnchor="middle">
          {formatDayMonth(mid)}
        </text>
      )}
      {span > 0 && (
        <text className="ax" x={right} y={H - 5} textAnchor="end">
          {formatDayMonth(parseIsoDate(last.date))}
        </text>
      )}
      {span > 0 && <path className="line" d={points.map((p, i) => `${i ? 'L' : 'M'}${X(p.date).toFixed(1)} ${Y(p.value).toFixed(1)}`).join(' ')} />}
      {last && (
        <g>
          <circle className="end" cx={right} cy={lastY} r="4" />
          <text className="end-t" x={right + 6} y={lastY + 4}>
            {format(last.value)}
          </text>
        </g>
      )}
    </svg>
  )
}
