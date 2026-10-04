import Link from 'next/link'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'

export default function Hub(_props: { openSlugs: string[] }) {
  const { ui } = useLearnPrefs()
  return (
    <main id="map-view">
      <section className="hero">
        <h1 className="display">{ui('hubTitle')}</h1>
        <p className="lede">{ui('hubLede')}</p>
        <Link className="btn primary" href="/learn/celery-redis">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          </svg>
          <span>{ui('hubCta')}</span>
        </Link>
      </section>
    </main>
  )
}
