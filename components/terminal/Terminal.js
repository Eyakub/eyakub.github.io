import { useEffect, useRef, useState } from 'react'
import projectsData from '../../data/projects.json'
import work from '../../data/workexperience.json'
import contrib from '../../data/contributions.json'
import { toWeeks } from '../../lib/contributions'
import { CHIPS, complete, resolve } from '../../lib/terminal'
import { RESUME_URL } from '../SectionHead'
import { css } from './styles'

const PROJECTS = projectsData.map((p) => p.fields)
const BY_SLUG = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]))
const SLUGS = PROJECTS.map((p) => p.slug)
const STATUS = { live: 'Live', 'in-development': 'In development', 'open-source': 'Open source', archived: 'Archived' }
const KIND = { work: 'work', founder: 'founder', 'open-source': 'open source' }
const STACK = [
  ['backend', 'Python · FastAPI · Django · DRF · PostgreSQL'],
  ['frontend', 'Next.js · React · Vue.js · Tailwind CSS'],
  ['infra', 'Docker · Kubernetes · AWS · CI/CD'],
  ['also', 'Rust · Swift · SQLite · LLMs · RAG'],
]
const HELP = [
  ['help', 'list commands'],
  ['whoami', 'who I am'],
  ['projects', "everything I've built"],
  ['exactsds', 'compliance at SDS Manager'],
  ['razlio', 'my own products'],
  ['rallo', 'red panda for your agents'],
  ['experience', "where I've worked"],
  ['stack', 'what I use'],
  ['receipts', 'a year of commits'],
  ['contact', 'say hi'],
  ['clear', 'clear the screen'],
]
const LEVELS = ['#1a1d23', 'rgba(60,207,145,0.3)', 'rgba(60,207,145,0.52)', 'rgba(60,207,145,0.76)', '#3CCF91']
const EMAIL = 'eyakubsorkar@gmail.com'
const HOOK = "I build the parts of a business that can't break: orders, payments, deliveries, compliance."
const LEDE =
  '6+ years across Python, FastAPI, Django, PostgreSQL and Next.js. Now at SDS Manager, building ExactSDS for safety data sheets.'
const weeks = toWeeks(contrib.from, contrib.days).slice(-26)
const total = contrib.total.toLocaleString('en-US')
const pct = Math.round((contrib.private / contrib.total) * 100)
const ext = { target: '_blank', rel: 'noopener noreferrer' }

function Card({ p }) {
  const live = p.liveUrl && p.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '').split('?')[0]
  return (
    <div className="card">
      <img src={p.imageUrl} alt="" loading="lazy" />
      <div>
        <h4>{p.title}</h4>
        <div className="m">
          <span className={`dot ${p.status}`} /> {STATUS[p.status]} · {p.meta}
        </div>
        <p>{p.summary}</p>
        {p.columns?.length > 0 && (
          <div className="cols">
            {p.columns.map(([h, t]) => (
              <div key={h}>
                <b>{h}</b>
                <p>{t}</p>
              </div>
            ))}
          </div>
        )}
        <div className="chips">{p.chips.map((c) => <span key={c}>{c}</span>)}</div>
        {live && (
          <p style={{ marginTop: 8 }}>
            <a className="open" href={p.liveUrl} {...ext}>open {live} ↗</a>
          </p>
        )}
      </div>
    </div>
  )
}

function Kv({ rows }) {
  return (
    <dl className="kv" style={{ margin: 0 }}>
      {rows.map(([k, v]) => (
        <div key={k} style={{ display: 'contents' }}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function Output({ r, run }) {
  switch (r.id) {
    case 'help':
      return <Kv rows={HELP} />
    case 'whoami':
      return (
        <>
          <p className="ln">Eyakub Sorkar, full-stack engineer in Dhaka.</p>
          <p className="ln mut">{HOOK}</p>
          <p className="ln dim">6+ years · Python, FastAPI, Django, PostgreSQL, Next.js · now at SDS Manager</p>
          <p className="ln dim">Try <span className="acc">projects</span>, or tap a command below.</p>
        </>
      )
    case 'projects':
      return (
        <>
          <div className="rows">
            {PROJECTS.map((p) => (
              <button key={p.slug} type="button" className="row" onClick={() => run(`open ${p.slug}`)}>
                <span className={`dot ${p.status}`} title={STATUS[p.status]} />
                <span className="t">{p.title}</span>
                <span className="k">{KIND[p.kind]}</span>
                <span className="s">{p.summary}</span>
              </button>
            ))}
          </div>
          <p className="ln dim">tap a row, or run open &lt;name&gt;</p>
        </>
      )
    case 'exactsds':
      return <Card p={BY_SLUG.sds_manager} />
    case 'rallo':
      return <Card p={BY_SLUG.rallo} />
    case 'razlio':
      return (
        <>
          <p className="ln mut">Razlio is the name I ship my own products under.</p>
          <Card p={BY_SLUG.razlio_ai} />
          <Card p={BY_SLUG.razlio_commerce} />
        </>
      )
    case 'project':
      return <Card p={BY_SLUG[r.slug]} />
    case 'experience':
      return (
        <Kv
          rows={work.map((w) => [
            `${w.startDate} – ${w.endDate}`.replace('Present', 'now'),
            <>
              <b style={{ color: '#fff' }}>{w.company}</b> · {w.title}
              <br />
              <span className="dim">{w.summary}</span>
            </>,
          ])}
        />
      )
    case 'stack':
      return <Kv rows={STACK} />
    case 'receipts':
      return (
        <>
          <p className="ln">{total} contributions in the last 12 months</p>
          <div className="heat" role="img" aria-label={`${total} contributions in the last 12 months`}>
            {weeks.flatMap((w) => w.days).map((d) => <i key={d.date} style={{ background: LEVELS[d.level] }} />)}
          </div>
          <p className="ln dim">{pct}% in private repos · last 26 weeks shown · github.com/Eyakub</p>
        </>
      )
    case 'contact':
      return (
        <Kv
          rows={[
            ['email', <a key="e" className="open" href={`mailto:${EMAIL}`}>{EMAIL}</a>],
            ['linkedin', <a key="l" className="open" href="https://linkedin.com/in/eyakub-sorkar" {...ext}>eyakub-sorkar ↗</a>],
            ['github', <a key="g" className="open" href="https://github.com/Eyakub" {...ext}>Eyakub ↗</a>],
            ['time', 'Dhaka, UTC+6'],
          ]}
        />
      )
    case 'sudo':
      return <p className="ln err">Permission denied. Nice try.</p>
    case 'open-missing':
      return (
        <>
          <p className="ln err">open: no project called &quot;{r.arg}&quot;</p>
          <p className="ln dim">run projects to see the list</p>
        </>
      )
    default:
      return (
        <>
          <p className="ln err">command not found: {r.cmd}</p>
          <p className="ln dim">run help to see what&apos;s here</p>
        </>
      )
  }
}

export default function Terminal() {
  const [blocks, setBlocks] = useState([{ id: 0, cmd: 'whoami', r: { id: 'whoami' } }])
  const [value, setValue] = useState('')
  const outRef = useRef(null)
  const next = useRef(1)
  const hist = useRef([])
  const hi = useRef(0)
  const mounted = useRef(false)

  useEffect(() => {
    // Skip the initial whoami so the page doesn't scroll on load.
    if (!mounted.current) { mounted.current = true; return }
    outRef.current.scrollTop = outRef.current.scrollHeight
  }, [blocks])

  const run = (raw) => {
    const line = raw.trim()
    const r = resolve(line, SLUGS)
    if (!r) return
    hist.current.push(line)
    hi.current = hist.current.length
    if (r.id === 'clear') return setBlocks([])
    setBlocks((b) => [...b, { id: next.current++, cmd: line, r }])
  }

  const onKeyDown = (e) => {
    if (e.key === 'Tab') {
      const c = complete(value)
      if (c) { e.preventDefault(); setValue(c) }
    } else if (e.key === 'ArrowUp' && hi.current > 0) {
      e.preventDefault(); setValue(hist.current[--hi.current])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      hi.current = Math.min(hist.current.length, hi.current + 1)
      setValue(hist.current[hi.current] || '')
    }
  }

  return (
    <div className="tm">
      <style>{css}</style>
      <div className="tm-body">
        <aside className="tm-rail">
          <h1>Eyakub Sorkar</h1>
          <p className="tm-hook">{HOOK}</p>
          <p className="tm-lede">{LEDE}</p>
          <ul className="tm-links">
            <li><span>résumé</span><a href={RESUME_URL} {...ext}>PDF ↗</a></li>
            <li><span>github</span><a href="https://github.com/Eyakub" {...ext}>Eyakub ↗</a></li>
            <li><span>linkedin</span><a href="https://linkedin.com/in/eyakub-sorkar" {...ext}>eyakub-sorkar ↗</a></li>
            <li><span>email</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          </ul>
        </aside>
        <div className="tm-term">
          <div className="tm-bar" aria-hidden="true"><i /><i /><i /><b>zsh — eyakub@dhaka</b></div>
          <div className="tm-out" ref={outRef} aria-live="polite">
            {blocks.map((b) => (
              <div className="blk" key={b.id}>
                <p className="ln cmd">{b.cmd}</p>
                <Output r={b.r} run={run} />
              </div>
            ))}
          </div>
          <div className="tm-chips" role="group" aria-label="Commands">
            {CHIPS.map((c) => <button key={c} type="button" onClick={() => run(c)}>{c}</button>)}
          </div>
          <form className="tm-in" autoComplete="off" onSubmit={(e) => { e.preventDefault(); run(value); setValue('') }}>
            <label htmlFor="tm-cmd">eyakub@dhaka ~ %</label>
            <input
              id="tm-cmd"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              placeholder="type a command, or tap one above"
              aria-describedby="tm-hint"
            />
            <kbd id="tm-hint" title="Tab completes, ↑ recalls">tab ↹</kbd>
          </form>
        </div>
      </div>
    </div>
  )
}
