import type { L10n } from '../../lib/learn/l10n'

export type { L10n }
export type Kind = 'request' | 'queue' | 'result' | 'error'
export type Side = 'up' | 'down' | 'left' | 'right'
export type Pt = [number, number]
export type LayoutKey = 'wide' | 'narrow'
export type IconName = 'user' | 'server' | 'queue' | 'worker' | 'store' | 'retry' | 'shield' | 'route' | 'check' | 'code' | 'folder' | 'box' | 'archive' | 'cloud' | 'bookmark' | 'mail' | 'power' | 'cpu' | 'thread' | 'lock' | 'memory' | 'loop' | 'hourglass' | 'pipe' | 'task' | 'alert'
export type LineId = 'backend' | 'async' | 'devops' | 'git' | 'concurrency'

export interface FlowNode {
  icon: IconName
  name: L10n
  sub: L10n
  wide: [number, number, Side]
  narrow: [number, number, Side]
  plain?: { name: L10n; sub: L10n }
}
export interface Corridor { wide: Pt[]; narrow: Pt[] }
export interface Edge { from: string; to: string; kind: Kind }
export interface Move { edge: string; label: string; plain?: L10n }
export interface Step {
  id: string
  moves?: Move[]
  work?: { node: string | string[]; kind: Kind }
  state?: Record<string, L10n>
  plainState?: Record<string, L10n>
  title: L10n
  simple: L10n
  tech: L10n
}
export interface AltRoute { id: string; label: L10n; branchAfter: string; steps: Step[]; whatIf?: L10n }
export interface Group { id: string; label: L10n; wide: [number, number, number, number]; narrow: [number, number, number, number] }
export interface Twin { node: string | null; icon: IconName; name: L10n; is?: L10n; d: L10n }
export interface QA { q: L10n; short: L10n; deep: L10n; redFlag: L10n }
export interface Cheat { code: string; d: L10n }
export interface Topic {
  slug: string
  line: LineId
  title: L10n
  summary: L10n
  hook?: L10n
  takeaway?: L10n
  words?: { term: L10n; d: L10n }[]
  legend?: Partial<Record<Kind, L10n>>
  view: Record<LayoutKey, [number, number]>
  nodeR?: Partial<Record<LayoutKey, number>>
  nodes: Record<string, FlowNode>
  groups?: Group[]
  corridors: Record<string, Corridor>
  edges: Record<string, Edge>
  main: { label: L10n; steps: Step[] }
  alts: AltRoute[]
  analogy: { intro: L10n; twins: Twin[] }
  qa: QA[]
  cheats: Cheat[]
  sources: { label: string; url: string }[]
}
