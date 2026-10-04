import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { Topic } from '../../../data/learn/types'
import { Rich } from '../shell/Rich'

export default function InterviewQA({ topic }: { topic: Topic }) {
  const { t, ui } = useLearnPrefs()
  return (
    <section className="read" aria-labelledby="qa-h">
      <h2 id="qa-h"><i /><span>{ui('qaH')}</span></h2>
      <p className="intro">{ui('qaIntro')}</p>
      <div className="qa">
        {topic.qa.map((x, i) => (
          <details key={i} open={i === 0 ? true : undefined}>
            <summary>
              <span><Rich text={t(x.q)} /></span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
            </summary>
            <div className="ans">
              <div className="short"><span className="lbl">{ui('shortA')}</span><p><Rich text={t(x.short)} /></p></div>
              <div className="deep"><span className="lbl">{ui('deepA')}</span><p><Rich text={t(x.deep)} /></p></div>
              <div className="flag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M15 9l-6 6M9 9l6 6" /></svg>
                <div><span className="lbl">{ui('redFlag')}</span><p><Rich text={t(x.redFlag)} /></p></div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
