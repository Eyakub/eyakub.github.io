import { useEffect, useRef, useState } from 'react'
import NextLink from 'next/link'
import { Anek_Latin } from 'next/font/google'
import contrib from '../../data/contributions.json'
import fit from '../../data/fit.json'
import homepage from '../../data/homepage.json'
import projectsData from '../../data/projects.json'
import work from '../../data/workexperience.json'
import { AXIS_END, AXIS_START, bar, rangeLabel, shortCompany } from '../../lib/bento'
import { toWeeks } from '../../lib/contributions'
import { STEPS } from '../HowIBuild'
import { RESUME_URL } from '../SectionHead'
import { css } from './styles'

const anek = Anek_Latin({ subsets: ['latin'], axes: ['wdth'], display: 'swap' })

const STORE = 'bx-theme'
const PHONE_WEEKS = 26
const BY_SLUG = Object.fromEntries(projectsData.map((p) => [p.fields.slug, p.fields]))
const weeks = toWeeks(contrib.from, contrib.days)
const total = contrib.total.toLocaleString('en-US')
const privatePct = Math.round((contrib.private / contrib.total) * 100)
const long = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
const isOld = (i) => i < weeks.length - PHONE_WEEKS

// Hero right: one word per product you built, tinted and linked.
const WORDS = [
  { word: 'Orders', tint: 'orange', project: 'Razlio AI', slug: 'razlio_ai', href: 'https://app.razlio.com/' },
  { word: 'Payments', tint: 'green', project: 'Razlio Commerce', slug: 'razlio_commerce', href: 'https://razlio.com/commerce/' },
  { word: 'Deliveries', tint: 'teal', project: 'Aadi BD', slug: 'aadi_bd', href: '/projects' }, // archived, so no live site
  { word: 'Compliance', tint: 'purple', project: 'ExactSDS', slug: 'sds_manager', href: 'https://exactsds.sdsmanager.com/' },
]
const ROLE_COLORS = ['accent', 'purple', 'orange', 'teal', 'ink3']
const AXIS_YEARS = Array.from({ length: AXIS_END - AXIS_START + 1 }, (_, i) => AXIS_START + i)
const NAV = [
  ['Work', '/projects'],
  ['How I build', '#build'],
  ['Experience', '#experience'],
  ['Learn', '/learn'],
  ['Résumé', RESUME_URL],
]

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

function Heatmap() {
  return (
    <div role="img" aria-label={`${total} GitHub contributions from ${long(contrib.from)} to ${long(contrib.to)}`}>
      <div className="bx-months" aria-hidden="true">
        {weeks.map((w, i) => (
          <span key={w.days[0].date} className={isOld(i) ? 'old' : undefined}>{w.month}</span>
        ))}
      </div>
      <div className="bx-heat" aria-hidden="true">
        {weeks.flatMap((w, i) =>
          w.days.map((d) => (
            <i
              key={d.date}
              className={[isOld(i) && 'old', d.level && `l${d.level}`].filter(Boolean).join(' ') || undefined}
              title={`${long(d.date)}: ${d.n} contribution${d.n === 1 ? '' : 's'}`}
            />
          ))
        )}
      </div>
    </div>
  )
}

function Words() {
  const box = useRef(null)
  const float = useRef(null)
  const show = (slug) => {
    float.current.src = BY_SLUG[slug].imageUrl
    float.current.classList.add('on')
  }
  const move = (e) => {
    const r = box.current.getBoundingClientRect()
    float.current.style.left = `${e.clientX - r.left}px`
    float.current.style.top = `${e.clientY - r.top}px`
  }
  return (
    <article className="bx-t bx-words" aria-label="What I build" ref={box} onMouseMove={move}>
      <ul>
        {WORDS.map(({ word, tint, project, slug, href }) => {
          const ext = href.startsWith('http')
          const Tag = ext ? 'a' : NextLink
          return (
            <li key={word} style={{ '--k': `var(--bx-${tint})` }}>
              <Tag
                href={href}
                {...(ext ? { target: '_blank', rel: 'noopener' } : {})}
                onMouseEnter={() => show(slug)}
                onMouseLeave={() => float.current.classList.remove('on')}
              >
                <span className="w">{word}</span>
                <span className="p">{project}</span>
                <img className="inl" src={BY_SLUG[slug].imageUrl} alt={`${project} cover`} loading="lazy" />
              </Tag>
            </li>
          )
        })}
      </ul>
      <img className="bx-float" alt="" aria-hidden="true" ref={float} />
    </article>
  )
}

const METER = { strong: ['100%', 'var(--bx-green)'], partial: ['55%', 'var(--bx-orange)'], gap: ['12%', 'var(--bx-red)'] }

function Fit() {
  const [i, setI] = useState(0)
  const list = fit.PRESETS[i].keys.map((k) => fit.EV[k])
  return (
    <article className="bx-t bx-fit">
      <p className="bx-label">Check the fit</p>
      <div className="bx-presets" role="group" aria-label="Kind of work">
        {fit.PRESETS.map((p, j) => (
          <button key={p.name} type="button" aria-pressed={i === j} onClick={() => setI(j)}>{p.name}</button>
        ))}
      </div>
      <p className="bx-score" aria-live="polite">{list.filter((e) => e.level === 'strong').length} of {list.length} with direct evidence</p>
      <ul className="bx-fitrows">
        {list.map(({ req, level, evidence }) => (
          <li key={req}>
            <b>{req}</b>
            <span className="bx-meter">
              <span>{level}</span>
              <i style={{ '--w': METER[level][0], '--mc': METER[level][1] }} />
            </span>
            <small>{evidence}</small>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Bento() {
  // No stored choice -> no data-theme, so CSS follows prefers-color-scheme with no flash.
  const [theme, setTheme] = useState(null)
  const [sysDark, setSysDark] = useState(false)
  useEffect(() => {
    try {
      const t = localStorage.getItem(STORE)
      if (t === 'light' || t === 'dark') setTheme(t)
    } catch {}
    const mq = matchMedia('(prefers-color-scheme: dark)')
    setSysDark(mq.matches)
    const on = (e) => setSysDark(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  const dark = theme ? theme === 'dark' : sysDark
  const toggle = () => {
    const next = dark ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(STORE, next)
    } catch {}
  }

  const sds = BY_SLUG.sds_manager
  return (
    <div className="bx-wrap">
      <style>{css}</style>
      <div className={`mBX ${anek.className}`} data-theme={theme ?? undefined}>
        <div className="bx-nav">
          <NextLink className="bx-brand" href="/">Eyakub Sorkar</NextLink>
          <nav aria-label="Primary">
            {NAV.map(([label, href]) =>
              href.startsWith('http') ? (
                <a key={label} href={href} target="_blank" rel="noopener">{label}</a>
              ) : href.startsWith('#') ? (
                <a key={label} href={href}>{label}</a>
              ) : (
                <NextLink key={label} href={href}>{label}</NextLink>
              )
            )}
          </nav>
          <button type="button" className="bx-theme" aria-label="Dark theme" aria-pressed={dark} onClick={toggle}>
            <svg className="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            <svg className="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
            </svg>
          </button>
        </div>

        <main className="bx-grid">
          <article className="bx-t bx-hero">
            <div>
              <p className="bx-label">Full-stack engineer · Dhaka</p>
              <h1>Eyakub Sorkar</h1>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              <p className="bx-line">I build the parts of a business that can’t break.</p>
              <p className="bx-lede">
                6+ years across Python, FastAPI, Django, PostgreSQL and Next.js. Now at{' '}
                <a href="https://sdsmanager.com/" target="_blank" rel="noopener">SDS Manager</a>, building ExactSDS for safety data sheets and Stride, an agent-assisted task board that’s still in development.
              </p>
              <div className="bx-row">
                <NextLink className="bx-btn" href="/projects">Case studies</NextLink>
                <a className="bx-btn bx-btn--ghost" href={RESUME_URL} target="_blank" rel="noopener">Résumé</a>
              </div>
            </div>
          </article>
          <Words />

          <article className="bx-t bx-receipts">
            <p className="bx-label">Receipts · GitHub</p>
            <div className="bx-big">
              <b>{total}</b>
              <span>contributions in the last 12 months, <em>{privatePct}% in private repos</em>, so most of it doesn’t show on my public profile.</span>
            </div>
            <Heatmap />
            <div className="bx-foot">
              <span>{long(contrib.from)} – {long(contrib.to)}</span>
              <span className="bx-legend" aria-hidden="true">Less <i /><i className="l1" /><i className="l2" /><i className="l3" /><i className="l4" /> More</span>
            </div>
          </article>
          <article className="bx-t bx-rallo">
            <p className="bx-label">Side project · open source</p>
            <div className="bx-panda">
              <img src="/rallo-pet.png" alt="Rallo the red panda raising a paw" width="64" height="64" />
              <div>
                <h3>Rallo</h3>
                <span className="bx-stars">★ {homepage.ralloStars}</span>
              </div>
            </div>
            <p>A red panda on your Mac that keeps notes in view and waves when Claude Code, Codex or Gemini CLI is waiting on you.</p>
            <ul className="bx-tags"><li>Rust</li><li>Swift</li><li>SQLite</li><li>CLI-first</li><li>MIT</li></ul>
            <a className="bx-link" href="https://github.com/Eyakub/Rallo" target="_blank" rel="noopener">github.com/Eyakub/Rallo <Arrow /></a>
          </article>

          <article className="bx-t bx-build" id="build" style={{ scrollMarginTop: 16 }}>
            <p className="bx-label">How I build</p>
            <h3>Agents take the scoped work. Tests and the browser decide what ships.</h3>
            <ol className="bx-steps">
              {STEPS.map(([, title, text], i) => (
                <li key={title}>
                  <span className="bx-n">0{i + 1}</span>
                  <div><b>{title}</b><span>{text}</span></div>
                </li>
              ))}
            </ol>
          </article>
          <Fit />

          <article className="bx-t bx-case">
            <p className="bx-label">Case study · ExactSDS · SDS Manager</p>
            <h3>Safety data sheets built to hold up to regulators</h3>
            <div className="bx-cols">
              {sds.columns.map(([h, t]) => (
                <div key={h}><h4>{h}</h4><p>{t}</p></div>
              ))}
            </div>
            <ul className="bx-tags"><li>FastAPI</li><li>PostgreSQL</li><li>LLMs</li><li>RAG</li></ul>
            <a className="bx-link" href="https://exactsds.sdsmanager.com/" target="_blank" rel="noopener">exactsds.sdsmanager.com <Arrow /></a>
          </article>

          <article className="bx-t bx-exp" id="experience" style={{ scrollMarginTop: 16 }}>
            <p className="bx-label">Experience · to scale</p>
            <ul className="bx-gantt">
              {work.map((r, i) => {
                const b = bar(r.startDate, r.endDate, contrib.to)
                return (
                  <li key={r.company}>
                    <div className="bx-role"><b>{shortCompany(r.company)}</b><span>{r.title} · {rangeLabel(r.startDate, r.endDate)}</span></div>
                    <div className="bx-track">
                      <i className={b.open ? 'open' : undefined} style={{ left: `${b.left.toFixed(2)}%`, width: `${b.width.toFixed(2)}%`, '--k': `var(--bx-${ROLE_COLORS[i % ROLE_COLORS.length]})` }} />
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="bx-axisrow" aria-hidden="true">
              <span />
              <div className="bx-axis">
                {AXIS_YEARS.map((y) => (
                  <span key={y} style={{ left: `${(((y - AXIS_START) / (AXIS_YEARS.length)) * 100).toFixed(2)}%` }}>{y}</span>
                ))}
              </div>
            </div>
          </article>

          <article className="bx-t bx-contact">
            <div>
              <h2>Building something that can’t break? Let’s talk.</h2>
              <p>Email is fastest. I’m in Dhaka (UTC+6).</p>
            </div>
            <div className="bx-row">
              <a className="bx-mail" href="mailto:eyakubsorkar@gmail.com">eyakubsorkar@gmail.com</a>
              <a className="bx-btn bx-btn--ghost" href="https://linkedin.com/in/eyakub-sorkar" target="_blank" rel="noopener">LinkedIn</a>
              <a className="bx-btn bx-btn--ghost" href="https://github.com/Eyakub" target="_blank" rel="noopener">GitHub</a>
            </div>
          </article>
        </main>
      </div>
    </div>
  )
}
