import { useMemo, type CSSProperties } from 'react'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import { ICON } from '../../../data/learn/icons'
import type { Kind, LayoutKey, Step, Topic } from '../../../data/learn/types'
import { focusNodes, nodeLabels, nodeSubAt, stepKind, visitedEdges, workNodes } from './flow'
import { pathD } from './geometry'
import { DOT_R, NAME_LH, NAME_PX, SUB_LH, SUB_PX, laneGeo, lanePath, lanePlacement, wrap } from './lanes'
import { usePackets } from './usePackets'

interface Props { topic: Topic; layout: LayoutKey; steps: Step[]; index: number; animate: boolean }

const KINDS: Kind[] = ['request', 'queue', 'result', 'error']
const HIDDEN = { hidden: true } as Record<string, unknown>

export default function LaneDiagram({ topic, layout, steps, index, animate }: Props) {
  const { t, mode, lang } = useLearnPrefs()
  const geo = useMemo(() => laneGeo(topic, layout), [topic, layout])
  const paths = useMemo(() => Object.fromEntries(Object.keys(topic.edges).map((id) => [id, lanePath(topic, geo, id)])), [topic, geo])
  const step = steps[index]
  const kind = stepKind(topic, step)
  const moves = step.moves ?? []
  const focus = new Set(focusNodes(topic, step))
  const working = new Set(workNodes(step))
  const passed = visitedEdges(steps, index)
  const activeEdges = new Set(moves.map((m) => m.edge))

  const { edgeRefs, nodeRefs, packetRefs, cometRefs } = usePackets({
    topic, steps, index, animate, mode, lang, layoutKey: layout,
    placement: (edge) => lanePlacement(topic, geo, edge, layout),
  })

  const kindStyle = (k: Kind) => ({ '--pk': `var(--k-${k})`, '--pk-on': `var(--k-${k}-on)` } as CSSProperties)
  const kStyle = { '--k': `var(--k-${kind})` } as CSSProperties
  const lines = (text: string, maxW: number, px: number, bold: boolean, x: number, lh: number) =>
    wrap(text, maxW, px, bold).map((l, i) => <tspan key={i} x={x} dy={i ? lh : 0}>{l}</tspan>)

  return (
    <svg className={`flow-svg lane-svg lane-${layout}`} id="flow" viewBox={`0 0 ${geo.w} ${geo.h}`} role="img" aria-labelledby="step-title">
      <defs>
        {KINDS.map((k) => (
          <marker key={k} id={`ar-${k}`} viewBox="0 0 10 10" refX="6" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto">
            <path d="M0 0L10 5L0 10Z" style={{ fill: `var(--k-${k})` }} />
          </marker>
        ))}
      </defs>
      {Object.entries(geo.slots).map(([id, s]) => s.band && (
        <rect key={id} className={`band${focus.has(id) ? ' on' : ''}`} x={s.band[0]} y={s.band[1]} width={s.band[2]} height={s.band[3]} rx="14" style={kStyle} />
      ))}
      {geo.spans.map((s, i) => (
        <g key={i} className="span">
          <path d={pathD(s.line)} />
          <text x={s.at[0]} y={s.at[1]} textAnchor={s.anchor}>{t(mode === 'simple' && s.plain ? s.plain : s.label)}</text>
        </g>
      ))}
      {geo.tracks.map((tr, i) => <path key={i} className={`track lane-${tr.lane}`} d={pathD(tr.d)} />)}
      {geo.chevrons.map((c, i) => (
        <path key={i} className={`chev lane-${c.lane}`} d="M-3.5 -5L2.5 0L-3.5 5" transform={`translate(${c.at[0]} ${c.at[1]}) rotate(${c.deg})`} />
      ))}
      {Object.entries(topic.edges).map(([id, e]) => (
        <path
          key={id}
          ref={(el) => { edgeRefs.current[id] = el }}
          className={`edge k-${e.kind}${activeEdges.has(id) ? ' active' : passed.has(id) ? ' visited' : ''}`}
          d={pathD(paths[id])}
        />
      ))}
      {moves.map((m, i) => (
        <circle key={`c${i}`} ref={(el) => { cometRefs.current[i] = el }} className="comet" r="6" {...HIDDEN} style={kindStyle(topic.edges[m.edge].kind)} />
      ))}
      {Object.entries(geo.slots).map(([id, s]) => {
        const n = topic.nodes[id]
        const lb = nodeLabels(topic, id, mode)
        const name = wrap(t(lb.name), s.maxW, NAME_PX[layout], true)
        const [tx, ty] = s.text
        const subY = ty + (layout === 'wide' ? name.length * NAME_LH + 1 : NAME_LH - 1)
        const sc = s.discR / 25
        const cls = ['node', focus.has(id) ? 'on' : '', working.has(id) ? 'working' : ''].filter(Boolean).join(' ')
        return (
          <g key={id} ref={(el) => { nodeRefs.current[id] = el }} className={cls} data-id={id} style={kStyle}>
            {[s.inDot, s.outDot, s.dot].map((d, i) => d && <circle key={i} className="dot" cx={d[0]} cy={d[1]} r={DOT_R} />)}
            <circle className="halo" cx={s.disc[0]} cy={s.disc[1]} r={s.discR * 1.5} />
            <circle className="disc" cx={s.disc[0]} cy={s.disc[1]} r={s.discR} />
            <g className="ico" transform={`translate(${s.disc[0] - 12 * sc} ${s.disc[1] - 12 * sc}) scale(${sc})`}>
              <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: ICON[n.icon] }} />
            </g>
            <text className="nm" x={tx} y={layout === 'narrow' && name.length > 1 ? ty - NAME_LH / 2 : ty} textAnchor={s.anchor}>
              {name.map((l, i) => <tspan key={i} x={tx} dy={i ? NAME_LH : 0}>{l}</tspan>)}
            </text>
            <text className="sb" x={tx} y={subY} textAnchor={s.anchor}>
              {lines(t(nodeSubAt(topic, steps, index, id, mode)), s.maxW, SUB_PX[layout], false, tx, SUB_LH)}
            </text>
          </g>
        )
      })}
      {moves.map((m, i) => (
        <g key={`p${i}`} ref={(el) => { packetRefs.current[i] = el }} className="packet" {...HIDDEN} style={kindStyle(topic.edges[m.edge].kind)}>
          {layout === 'wide' ? <rect y="-14" height="28" rx="14" /> : <rect y="-12" height="24" rx="12" />}
          <text x="0" y="0" />
        </g>
      ))}
    </svg>
  )
}
