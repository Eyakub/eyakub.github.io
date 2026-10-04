import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { UiKey } from '../../../data/learn/ui'
import type { Kind } from '../../../data/learn/types'

const KINDS: [Kind, UiKey, string][] = [
  ['request', 'kRequest', ''],
  ['queue', 'kQueue', '7 4'],
  ['result', 'kResult', '1 5'],
  ['error', 'kError', '2 4'],
]

export default function KindLegend() {
  const { ui } = useLearnPrefs()
  return (
    <ul className="kind-key" id="kind-key">
      {KINDS.map(([k, label, dash]) => (
        <li key={k}>
          <svg viewBox="0 0 30 10" aria-hidden="true">
            <path d="M2 5H28" stroke={`var(--k-${k})`} strokeWidth={k === 'result' ? 4.5 : 3.5} strokeLinecap="round" strokeDasharray={dash || undefined} />
          </svg>
          {ui(label)}
        </li>
      ))}
    </ul>
  )
}
