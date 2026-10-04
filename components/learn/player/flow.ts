import type { Kind, L10n, Step, Topic } from '../../../data/learn/types'
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

export function focusNodes(topic: Topic, step: Step): string[] {
  if (step.work) return [step.work.node]
  const ids = step.moves!.flatMap((m) => [topic.edges[m.edge].from, topic.edges[m.edge].to])
  return [...new Set(ids)]
}

export function visitedEdges(steps: Step[], index: number): Set<string> {
  return new Set(steps.slice(0, index).flatMap((s) => (s.moves ?? []).map((m) => m.edge)))
}

export function nodeSubAt(topic: Topic, steps: Step[], index: number, nodeId: string): L10n {
  let sub = topic.nodes[nodeId].sub
  for (let i = 0; i <= index; i++) {
    const o = steps[i].state?.[nodeId]
    if (o) sub = o
  }
  return sub
}

export const dwellMs = (mode: Mode): number => (mode === 'technical' ? 6500 : 4300)
