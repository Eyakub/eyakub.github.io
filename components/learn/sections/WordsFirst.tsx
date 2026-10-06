import { useState } from 'react'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { Topic } from '../../../data/learn/types'

/** One row of word chips above the player; tapping a chip opens its meaning underneath. */
export default function WordsFirst({ topic }: { topic: Topic }) {
  const { t, ui } = useLearnPrefs()
  const [open, setOpen] = useState<number | null>(null)
  if (!topic.words.length) return null
  const word = open === null ? undefined : topic.words[open]
  return (
    <section className="words" aria-label={ui('wordsTitle')}>
      <div className="chips">
        <span className="chips-l">{ui('wordsTitle')}</span>
        {topic.words.map((w, i) => (
          <button key={w.term.en} type="button" className="chip" aria-expanded={open === i} aria-controls="word-def" onClick={() => setOpen(open === i ? null : i)}>
            {t(w.term)}
          </button>
        ))}
      </div>
      <p className="word-def" id="word-def" aria-live="polite">{word && <><b>{t(word.term)}</b>{t(word.d)}</>}</p>
    </section>
  )
}
