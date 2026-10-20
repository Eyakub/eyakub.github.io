import { formatRest } from '../../../lib/workout/format'

const R = 100
const C = 2 * Math.PI * R

interface Props {
  routineId: string
  left: number
  total: number
  up: boolean
}

// The bumper plate: an arc that drains around the rim as the rest runs down.
export function RestDial({ routineId, left, total, up }: Props) {
  const frac = total > 0 ? Math.min(1, left / total) : 0
  return (
    <div className={`rest-plate c-${routineId}${up ? ' is-up' : ''}`}>
      <svg viewBox="0 0 240 240" aria-hidden="true">
        <circle className="rp-rim" cx="120" cy="120" r="116" />
        <circle className="rp-track" cx="120" cy="120" r={R} />
        <circle
          className="rp-arc"
          cx="120"
          cy="120"
          r={R}
          transform="rotate(-90 120 120)"
          strokeDasharray={C}
          strokeDashoffset={(C * (1 - frac)).toFixed(1)}
        />
        <circle className="rp-insert" cx="120" cy="120" r="74" />
      </svg>
      <div className="rp-read">
        <span className="rp-time" role="timer">
          {up ? 'Go' : formatRest(Math.ceil(left))}
        </span>
        <span className="rp-of">of {formatRest(total)}</span>
      </div>
    </div>
  )
}
