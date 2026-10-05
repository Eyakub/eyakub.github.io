import { useLayoutEffect, useMemo, useRef, type CSSProperties } from 'react'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import { ICON } from '../../../data/learn/icons'
import type { Kind, LayoutKey, Side, Step, Topic } from '../../../data/learn/types'
import { focusNodes, nodeLabels, nodeSubAt, packetText, stepKind, visitedEdges, workNodes } from './flow'
import { bidirectionalCorridors, edgePoints, pathD } from './geometry'

interface Props { topic: Topic; layout: LayoutKey; steps: Step[]; index: number; animate: boolean }

const KINDS: Kind[] = ['request', 'queue', 'result', 'error']
// SVG prop types omit `hidden`, but the attribute is valid and is toggled via setAttribute at runtime.
const HIDDEN = { hidden: true } as Record<string, unknown>
const REST = 0.5
const NODE_R = 25
const D1 = 750
const D2 = 520
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

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
  const focus = focusNodes(topic, step)
  const working = new Set(workNodes(step))
  const passed = visitedEdges(steps, index)
  const activeEdges = new Set(moves.map((m) => m.edge))
  const [w, h] = topic.view[layout]
  const r = topic.nodeR?.[layout] ?? NODE_R

  const edgeRefs = useRef<Record<string, SVGPathElement | null>>({})
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({})
  const packetRefs = useRef<(SVGGElement | null)[]>([])
  const cometRefs = useRef<(SVGCircleElement | null)[]>([])

  useLayoutEffect(() => {
    const cur = steps[index].moves ?? []
    const packets = cur.map((_, i) => packetRefs.current[i])
    const comets = cur.map((_, i) => cometRefs.current[i])
    const geo = cur.map((m) => {
      const path = edgeRefs.current[m.edge]
      return path ? { path, len: path.getTotalLength(), to: topic.edges[m.edge].to } : null
    })
    const place = (el: SVGElement, i: number, t: number) => {
      const g = geo[i]!
      const p = g.path.getPointAtLength(g.len * t)
      el.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`)
    }
    packets.forEach((pk, i) => {
      if (!pk || !geo[i]) return
      const text = pk.querySelector('text')!
      const rect = pk.querySelector('rect')!
      text.textContent = packetText(cur[i], mode, lang)
      pk.removeAttribute('hidden')
      const tw = text.getComputedTextLength() + 26
      rect.setAttribute('width', String(tw))
      rect.setAttribute('x', String(-tw / 2))
    })

    let raf = 0
    let arriveTimer: ReturnType<typeof setTimeout> | undefined
    let arrived: SVGGElement[] = []
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!animate || reduce) {
      packets.forEach((pk, i) => {
        if (!pk || !geo[i]) return
        place(pk, i, REST)
        pk.style.opacity = '1'
      })
    } else {
      const t0 = performance.now()
      const tick = (now: number) => {
        const el = now - t0
        if (el < D1) {
          const t = ease(el / D1)
          packets.forEach((pk, i) => {
            if (!pk || !geo[i]) return
            place(pk, i, 0.04 + (REST - 0.04) * t)
            pk.style.opacity = String(Math.min(1, el / 200))
          })
        } else {
          const t = Math.min((el - D1) / D2, 1)
          packets.forEach((pk, i) => {
            const c = comets[i]
            if (!pk || !c || !geo[i]) return
            place(pk, i, REST)
            pk.style.opacity = '1'
            const g = geo[i]!
            const p = g.path.getPointAtLength(g.len * (REST + (1 - REST) * ease(t)))
            c.removeAttribute('hidden')
            c.setAttribute('cx', String(p.x))
            c.setAttribute('cy', String(p.y))
          })
          if (t >= 1) {
            comets.forEach((c) => c?.setAttribute('hidden', ''))
            const dests = [...new Set(geo.flatMap((g) => (g ? [g.to] : [])))]
            arrived = dests.flatMap((d) => { const g = nodeRefs.current[d]; return g ? [g] : [] })
            arrived.forEach((g) => { g.classList.remove('arrive'); void g.getBoundingClientRect(); g.classList.add('arrive') })
            if (arrived.length) arriveTimer = setTimeout(() => arrived.forEach((g) => g.classList.remove('arrive')), 600)
            return
          }
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(arriveTimer)
      arrived.forEach((g) => g.classList.remove('arrive'))
      comets.forEach((c) => c?.setAttribute('hidden', ''))
    }
  }, [index, steps, layout, mode, lang]) // eslint-disable-line react-hooks/exhaustive-deps

  const kindStyle = (k: Kind) => ({ '--pk': `var(--k-${k})`, '--pk-on': `var(--k-${k}-on)` } as CSSProperties)

  return (
    <svg className="flow-svg" id="flow" viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby="step-title">
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
            <text x={layout === 'narrow' ? gx + gw - 12 : gx + 14} y={gy - 8} textAnchor={layout === 'narrow' ? 'end' : 'start'}>{t(g.label)}</text>
          </g>
        )
      })}
      {Object.entries(topic.corridors).map(([key, c]) => <path key={key} className="track" d={pathD(c[layout])} />)}
      {Object.entries(topic.edges).map(([id, e]) => (
        <path
          key={id}
          ref={(el) => { edgeRefs.current[id] = el }}
          className={`edge k-${e.kind}${activeEdges.has(id) ? ' active' : passed.has(id) ? ' visited' : ''}`}
          d={pathD(edgePoints(topic, id, layout, bidir, r))}
        />
      ))}
      {moves.map((m, i) => (
        <circle key={`c${i}`} ref={(el) => { cometRefs.current[i] = el }} className="comet" r="6.5" {...HIDDEN} style={kindStyle(topic.edges[m.edge].kind)} />
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
      {moves.map((m, i) => (
        <g key={`p${i}`} ref={(el) => { packetRefs.current[i] = el }} className="packet" {...HIDDEN} style={kindStyle(topic.edges[m.edge].kind)}>
          <rect y="-14" height="28" rx="14" />
          <text x="0" y="0" />
        </g>
      ))}
    </svg>
  )
}
