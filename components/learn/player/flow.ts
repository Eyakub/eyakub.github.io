import type { Kind, L10n, Move, Step, Topic } from '../../../data/learn/types'
import type { Lang } from '../../../lib/learn/l10n'
import type { Mode } from '../../../lib/learn/prefs'

export type RouteMap = Record<string, Step[]>

export function buildRoutes(topic: Topic): RouteMap {
  const routes: RouteMap = { main: topic.main.steps }
  for (const alt of topic.alts) {
    const cut = topic.main.steps.findIndex((s) => s.id === alt.branchAfter)
    routes[alt.id] = [...topic.main.steps.slice(0, cut + 1), ...alt.steps]
  }
  return routes
}

export function firstAltIndex(topic: Topic, routeId: string): number {
  const alt = topic.alts.find((a) => a.id === routeId)
  return alt ? topic.main.steps.findIndex((s) => s.id === alt.branchAfter) + 1 : 0
}

export const stepKind = (topic: Topic, step: Step): Kind =>
  step.work ? step.work.kind : topic.edges[step.moves![0].edge].kind

export const workNodes = (step: Step): string[] => (step.work ? ([] as string[]).concat(step.work.node) : [])

export function focusNodes(topic: Topic, step: Step): string[] {
  if (step.work) return workNodes(step)
  const ids = step.moves!.flatMap((m) => [topic.edges[m.edge].from, topic.edges[m.edge].to])
  return [...new Set(ids)]
}

export function visitedEdges(steps: Step[], index: number): Set<string> {
  return new Set(steps.slice(0, index).flatMap((s) => (s.moves ?? []).map((m) => m.edge)))
}

export function nodeLabels(topic: Topic, id: string, mode: Mode): { name: L10n; sub: L10n } {
  const n = topic.nodes[id]
  return mode === 'simple' && n.plain ? n.plain : { name: n.name, sub: n.sub }
}

export function nodeSubAt(topic: Topic, steps: Step[], index: number, nodeId: string, mode: Mode = 'technical'): L10n {
  let sub = nodeLabels(topic, nodeId, mode).sub
  for (let i = 0; i <= index; i++) {
    const o = (mode === 'simple' ? steps[i].plainState?.[nodeId] : undefined) ?? steps[i].state?.[nodeId]
    if (o) sub = o
  }
  return sub
}

export const packetText = (m: Move, mode: Mode, lang: Lang): string => (mode === 'simple' && m.plain ? m.plain[lang] : m.label)

export const dwellMs = (mode: Mode): number => (mode === 'technical' ? 6500 : 4300)
