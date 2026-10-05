import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import { STATIONS } from '../../../data/learn/network'
import type { UiKey } from '../../../data/learn/ui'
import { fmt } from '../../../lib/learn/l10n'
import { useToast } from '../shell/Toast'
import LineStrips from './LineStrips'
import NetworkMap from './NetworkMap'

const START_HERE = ['concurrency-vs-parallelism', 'processes-vs-threads', 'git-basics', 'celery-redis']

export default function Hub({ openSlugs }: { openSlugs: string[] }) {
  const { ui, t, learned } = useLearnPrefs()
  const router = useRouter()
  const toast = useToast()

  const onStation = (slug: string) => {
    if (openSlugs.includes(slug)) {
      router.push('/learn/' + slug)
      return
    }
    const s = STATIONS[slug]
    toast(fmt(ui('toastLater'), { name: t(s.name), phase: ui(('p' + s.phase) as UiKey) }))
  }

  return (
    <main id="map-view">
      <section className="hero">
        <h1 className="display">{ui('hubTitle')}</h1>
        <p className="lede">{ui('hubLede')}</p>
        <Link className="btn primary" href="/learn/concurrency-vs-parallelism">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          </svg>
          <span>{ui('hubCta')}</span>
        </Link>
      </section>

      <section className="start-here" aria-labelledby="start-h">
        <h2 id="start-h">{ui('startHere')}</h2>
        <ol>
          {START_HERE.map((id, i) => (
            <li key={id}>
              <Link href={'/learn/' + id}>
                <span className="num">{i + 1}</span>
                <span>
                  <span className="sname">{t(STATIONS[id].name)}</span>
                  <span className="blurb">{t(STATIONS[id].blurb!)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="map-sec" aria-labelledby="map-h">
        <h2 id="map-h" className="sr-only">
          {ui('mapHeading')}
        </h2>
        <NetworkMap openSlugs={openSlugs} learned={learned} onStation={onStation} />
      </section>

      <section className="strips" aria-labelledby="strips-h">
        <h2 id="strips-h">{ui('allLines')}</h2>
        <LineStrips openSlugs={openSlugs} learned={learned} onStation={onStation} />
      </section>
    </main>
  )
}
