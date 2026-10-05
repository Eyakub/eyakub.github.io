import { useMemo, type CSSProperties } from 'react'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import { ICON } from '../../../data/learn/icons'
import type { Kind, LayoutKey, Topic, Side, Step } from '../../../data/learn/types'
import { focusNodes, nodeLabels, nodeSubAt, stepKind, trips, visitedEdges, workNodes } from './flow'
import { bidirectionalCorridors, edgePoints, pathD } from './geometry'
import { usePackets } from './usePackets'

interface Props { topic: Topic; layout: LayoutKey; steps: Step[]; index: number; animate: boolean }

const KINDS: Kind[] = ['request', 'queue', 'result', 'error']
// SVG prop types omit `hidden`, but the attribute is valid and is toggled via setAttribute at runtime.
const HIDDEN = { hidden: true } as Record<string, unknown>
const NODE_R = 25

function labelPos(x: number, y: number, side: Side, r: number) {
  return {
    down: { nx: x, ny: y + r + 21, sy: y + r + 38, a: 'middle' },
    up: { nx: x, ny: y - r - 25, sy: y - r - 8, a: 'middle' },
    right: { nx: x + r + 11, ny: y - 3, sy: y + 15, a: 'start' },
    left: { nx: x - r - 11, ny: y - 3, sy: y + 15, a: 'end' },
  }[side] as { nx: number; ny: number; sy: number; a: 'start' | 'middle' | 'end' }
}

export default function FlowDiagram({ topic, layout, steps, index, animate }: Props) {
  const { t, mode, lang } = useLearnPrefs()
  const bidir = useMemo(() => bidirectionalCorridors(topic), [topic])
  const step = steps[index]
  const kind = stepKind(topic, step)
  const moves = step.moves ?? []
  const tripList = useMemo(() => trips(topic, steps[index].moves ?? []), [topic, steps, index])
  const focus = focusNodes(topic, step)
  const working = new Set(workNodes(step))
  const passed = visitedEdges(steps, index)
  const activeEdges = new Set(moves.map((m) => m.edge))
  const [w, h] = topic.view[layout]
  const r = topic.nodeR?.[layout] ?? NODE_R

  const { svgRef, nodeRefs, packetRefs, cometRefs } = usePackets({ topic, trips: tripList, animate, mode, lang, layout, bidir, r })

  const kindStyle = (k: Kind) => ({ '--pk': `var(--k-${k})`, '--pk-on': `var(--k-${k}-on)` } as CSSProperties)

  return (
    <svg ref={svgRef} className="flow-svg" id="flow" viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="step-title">
      <defs>
        {KINDS.map((k) => (
          <marker key={k} id={`ar-${k}`} viewBox="0 0 10 10" refX="6" refY="5" markerUnits="userSpaceOnUse" markerWidth="15" markerHeight="15" orient="auto">
            <path d="M0 0L10 5L0 10Z" style={{ fill: `var(--k-${k})` }} />
          </marker>
        ))}
      </defs>
      {topic.groups?.map((g) => {
        const [gx, gy, gw, gh] = g[layout]
        return (
          <g key={g.id} className="group">
            <rect x={gx} y={gy} width={gw} height={gh} rx="16" />
            {/* Narrow: the spine runs down the left of the group, so the label sits at its right end. */}
            <text x={layout === 'narrow' ? gx + gw - 12 : gx + 14} y={gy - 8} textAnchor={layout === 'narrow' ? 'end' : 'start'}>{t(mode === 'simple' && g.plain ? g.plain : g.label)}</text>
          </g>
        )
      })}
      {Object.entries(topic.corridors).map(([key, c]) => <path key={key} className="track" d={pathD(c[layout])} />)}
      {Object.entries(topic.edges).map(([id, e]) => (
        <path
          key={id}
          className={`edge k-${e.kind}${activeEdges.has(id) ? ' active' : passed.has(id) ? ' visited' : ''}`}
          d={pathD(edgePoints(topic, id, layout, bidir, r))}
        />
      ))}
      {tripList.map((tr, i) => (
        <circle key={`c${i}`} ref={(el) => { cometRefs.current[i] = el }} className="comet" r="6.5" {...HIDDEN} style={kindStyle(tr.kind)} />
      ))}
      {Object.entries(topic.nodes).map(([id, n]) => {
        const [x, y, side] = n[layout]
        const lp = labelPos(x, y, side, r)
        const cls = ['node', focus.includes(id) ? 'on' : '', working.has(id) ? 'working' : ''].filter(Boolean).join(' ')
        return (
          <g key={id} ref={(el) => { nodeRefs.current[id] = el }} className={cls} data-id={id} style={{ '--k': `var(--k-${kind})` } as CSSProperties}>
            <circle className="halo" cx={x} cy={y} r={r * 1.44} />
            <circle className="disc" cx={x} cy={y} r={r} />
            <g className="ico" transform={`translate(${x - 12 * (r / NODE_R)} ${y - 12 * (r / NODE_R)}) scale(${r / NODE_R})`}>
              <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: ICON[n.icon] }} />
            </g>
            <text className="nm" x={lp.nx} y={lp.ny} textAnchor={lp.a}>{t(nodeLabels(topic, id, mode).name)}</text>
            <text className="sb" x={lp.nx} y={lp.sy} textAnchor={lp.a}>{t(nodeSubAt(topic, steps, index, id, mode))}</text>
          </g>
        )
      })}
      {tripList.map((tr, i) => (
        <g key={`p${i}`} ref={(el) => { packetRefs.current[i] = el }} className="packet" {...HIDDEN} style={kindStyle(tr.kind)}>
          <rect y="-14" height="28" rx="14" />
          <text x="0" y="0" />
        </g>
      ))}
    </svg>
  )
}
