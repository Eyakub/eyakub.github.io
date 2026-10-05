import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { Topic } from '../../../data/learn/types'

export default function WordsFirst({ topic }: { topic: Topic }) {
  const { t, ui } = useLearnPrefs()
  if (!topic.words?.length) return null
  return (
    <details className="words read" open>
      <summary>{ui('wordsTitle')}</summary>
      <dl>
        {topic.words.map((w) => (
          <div key={w.term.en}>
            <dt>{t(w.term)}</dt>
            <dd>{t(w.d)}</dd>
          </div>
        ))}
      </dl>
    </details>
  )
}
