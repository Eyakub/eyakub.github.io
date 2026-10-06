import Link from 'next/link'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import { LINES } from '../../../data/learn/network'
import type { Topic } from '../../../data/learn/types'
import { effectiveMode, isPlain } from '../player/flow'
import FlowPlayer from '../player/FlowPlayer'
import AnalogyTwins from '../sections/AnalogyTwins'
import CheatSheet from '../sections/CheatSheet'
import InterviewQA from '../sections/InterviewQA'
import Sources from '../sections/Sources'
import WordsFirst from '../sections/WordsFirst'

export default function TopicPage({ topic }: { topic: Topic }) {
  const { t, ui, mode: stored, learned, toggleLearned } = useLearnPrefs()
  const mode = effectiveMode(stored, topic)
  const lede = mode === 'story' && topic.story ? topic.story.cast : isPlain(mode) && topic.hook ? topic.hook : topic.summary
  const on = learned.includes(topic.slug)
  const line = LINES.find((l) => l.id === topic.line)
  return (
    <main id="topic-view">
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/learn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span>{ui('backToMap')}</span>
        </Link>
      </nav>
      <div className="topic-top">
      <header className="topic-head">
        <p className="line-tag">
          <i style={line ? { borderColor: `var(${line.color})` } : undefined} />
          <span>{line ? ui(line.name) : ''}</span>
        </p>
        <h1 className="display" id="topic-title">{t(topic.title)}</h1>
        <p className="lede">{t(lede)}</p>
      </header>
      <WordsFirst topic={topic} />
      </div>
      <FlowPlayer key={topic.slug} topic={topic} />
      <AnalogyTwins topic={topic} />
      <div className="read-pair">
        <InterviewQA topic={topic} />
        <CheatSheet topic={topic} />
      </div>
      <Sources topic={topic} />
      <section className="read done-row">
        <button type="button" className="btn done-btn" aria-pressed={on} onClick={() => toggleLearned(topic.slug)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          <span>{ui(on ? 'markedDone' : 'markDone')}</span>
        </button>
      </section>
    </main>
  )
}
