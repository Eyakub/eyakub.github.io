import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import { ICON } from '../../../data/learn/icons'
import type { Topic } from '../../../data/learn/types'
import { fmt } from '../../../lib/learn/l10n'

export default function AnalogyTwins({ topic }: { topic: Topic }) {
  const { t, ui } = useLearnPrefs()
  return (
    <section className="read" aria-labelledby="an-h">
      <h2 id="an-h"><i /><span>{ui('analogyH')}</span></h2>
      <p className="intro">{t(topic.analogy.intro)}</p>
      <ul className="twins">
        {topic.analogy.twins.map((tw, i) => {
          const is = tw.is ? t(tw.is) : fmt(ui('isThe'), { x: tw.node ? t(topic.nodes[tw.node].name) : '' })
          return (
            <li key={i} className={tw.node === null ? 'retry' : undefined}>
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICON[tw.icon] }} />
              </span>
              <div>
                <strong>{t(tw.name)}</strong>
                <span className="is">{is}</span>
                <p>{t(tw.d)}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
