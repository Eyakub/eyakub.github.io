import { useRef, useState } from 'react'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { Topic } from '../../../data/learn/types'

function Code({ code }: { code: string }) {
  return (
    <>
      {code.split('\n').map((line, i) => {
        const h = line.indexOf('#')
        return (
          <span key={i}>
            {i > 0 ? '\n' : ''}
            {h < 0 ? line : <>{line.slice(0, h)}<span className="c">{line.slice(h)}</span></>}
          </span>
        )
      })}
    </>
  )
}

export default function CheatSheet({ topic }: { topic: Topic }) {
  const { t, ui } = useLearnPrefs()
  const [msg, setMsg] = useState<{ i: number; text: string } | null>(null)
  const pres = useRef<(HTMLPreElement | null)[]>([])
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const done = (i: number, text: string) => {
    setMsg({ i, text })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(null), 1600)
  }
  const select = (i: number) => {
    const pre = pres.current[i]
    const s = window.getSelection()
    if (pre && s) {
      const r = document.createRange()
      r.selectNodeContents(pre)
      s.removeAllRanges()
      s.addRange(r)
    }
    done(i, ui('selected'))
  }
  const copy = (i: number) => {
    try {
      navigator.clipboard.writeText(topic.cheats[i].code).then(() => done(i, ui('copied')), () => select(i))
    } catch {
      select(i)
    }
  }

  return (
    <section className="read" aria-labelledby="ch-h">
      <h2 id="ch-h"><i /><span>{ui('cheatH')}</span></h2>
      <p className="intro">{ui('cheatIntro')}</p>
      <div className="cheats">
        {topic.cheats.map((c, i) => (
          <div className="cheat" key={i}>
            <pre ref={(el) => { pres.current[i] = el }}><code><Code code={c.code} /></code></pre>
            <div className="row">
              <p>{t(c.d)}</p>
              <button type="button" className="copy" onClick={() => copy(i)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
                <span>{msg?.i === i ? msg.text : ui('copy')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
