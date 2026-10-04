import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { Topic } from '../../../data/learn/types'

export default function Sources({ topic }: { topic: Topic }) {
  const { ui } = useLearnPrefs()
  return (
    <section className="read" aria-labelledby="src-h">
      <h2 id="src-h"><i /><span>{ui('sourcesH')}</span></h2>
      <ul className="sources">
        {topic.sources.map((s) => (
          <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>
        ))}
      </ul>
    </section>
  )
}
