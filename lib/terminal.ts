export const COMMANDS = [
  'help', 'whoami', 'projects', 'exactsds', 'razlio', 'rallo', 'experience', 'stack', 'receipts', 'contact', 'clear',
] as const
export const CHIPS = ['projects', 'exactsds', 'razlio', 'rallo', 'experience', 'stack', 'receipts', 'contact', 'help']

// Names Tab can complete; `open` and `ls` are handled in resolve().
const NAMES: string[] = [...COMMANDS, 'open', 'ls']

export const ALIAS: Record<string, string> = {
  goama: 'go_games',
  'go-games': 'go_games',
  stride: 'hub_one_stride',
  aadi: 'aadi_bd',
  exactsds: 'sds_manager',
  'razlio-ai': 'razlio_ai',
  'razlio-commerce': 'razlio_commerce',
}

export type Resolved =
  | { id: (typeof COMMANDS)[number] | 'sudo' }
  | { id: 'project'; slug: string }
  | { id: 'open-missing'; arg: string }
  | { id: 'unknown'; cmd: string }

// Returns null for blank input. `slugs` are the valid project slugs.
export function resolve(raw: string, slugs: string[]): Resolved | null {
  const [cmd, ...args] = raw.trim().split(/\s+/)
  if (!cmd) return null
  const c = cmd.toLowerCase()
  if (c === 'ls') return { id: 'projects' }
  if (c === 'open') {
    const slug = ALIAS[args[0]] ?? args[0]
    return slugs.includes(slug) ? { id: 'project', slug } : { id: 'open-missing', arg: args[0] ?? '' }
  }
  if (c === 'sudo') return { id: 'sudo' }
  if ((COMMANDS as readonly string[]).includes(c)) return { id: c as (typeof COMMANDS)[number] }
  if (ALIAS[c] && slugs.includes(ALIAS[c])) return { id: 'project', slug: ALIAS[c] }
  return { id: 'unknown', cmd }
}

// Tab: a lone match completes with a trailing space, several complete to the first.
export function complete(input: string): string | null {
  const t = input.trim().toLowerCase()
  if (!t) return null
  const m = NAMES.filter((n) => n.startsWith(t))
  if (!m.length) return null
  return m.length === 1 ? `${m[0]} ` : m[0]
}
