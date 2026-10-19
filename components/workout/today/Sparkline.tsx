const W = 150
const H = 30

export function Sparkline({ points }: { points: number[] }) {
  const min = Math.min(...points)
  const max = Math.max(...points)
  const x = (i: number) => 2 + (i * (W - 8)) / (points.length - 1)
  const y = (v: number) => 3 + ((max - v) * (H - 6)) / (max - min || 1)
  const d = points.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  return (
    <svg className="spark" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={d} fill="none" stroke="var(--brass)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
