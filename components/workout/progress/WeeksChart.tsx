import { formatDay, formatDayMonth, parseIsoDate } from '../../../lib/workout/dates'
import type { WeekTotal } from '../../../lib/workout/progress'

const W = 340
const H = 150
const L = 24
const B = 22
const T = 10

// Stacked blocks, one per session, coloured by workout; a dashed line marks the weekly goal.
export function WeeksChart({ weeks, goal }: { weeks: WeekTotal[]; goal: number }) {
  const rows = Math.max(goal + 1, ...weeks.map((w) => w.count))
  const slot = (W - L) / weeks.length
  const bw = Math.min(24, slot * 0.6)
  const unit = (H - T - B) / rows
  const base = H - B
  const goalY = base - goal * unit
  const labelled = (n: number) => n === 0 || n === goal || (n % 2 === 0 && Math.abs(n - goal) > 1)
  const label = `Sessions per week for the last ${weeks.length} weeks, oldest first: ${weeks.map((w) => w.count).join(', ')}. Goal ${goal}.`

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
      {Array.from({ length: rows + 1 }, (_, n) =>
        labelled(n) ? (
          <text key={n} className="ax" x={L - 6} y={base - n * unit + 3.5} textAnchor="end">
            {n}
          </text>
        ) : null,
      )}
      <line className="goal" x1={L} x2={W} y1={goalY} y2={goalY} />
      <text className="ax goal-t" x={W} y={goalY - 5} textAnchor="end">
        Goal {goal}
      </text>
      {weeks.map((w, i) => {
        const x = L + slot * i + (slot - bw) / 2
        return (
          <g key={w.start}>
            {w.sessions.map((s, k) => (
              <rect key={s.id} className={`blk blk-${s.routineId}`} x={x} y={base - (k + 1) * unit + 1.2} width={bw} height={unit - 2.4} rx="3">
                <title>{`${formatDay(parseIsoDate(s.date))}: ${s.routineName}`}</title>
              </rect>
            ))}
            {i % 2 === 0 && (
              <text className="ax" x={x + bw / 2} y={H - 6} textAnchor="middle">
                {formatDayMonth(parseIsoDate(w.start))}
              </text>
            )}
          </g>
        )
      })}
      <line className="base" x1={L} x2={W} y1={base} y2={base} />
    </svg>
  )
}
