import type { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Anek_Latin, Anek_Bangla, JetBrains_Mono } from 'next/font/google'
import { LearnPrefsProvider, useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import type { Lang } from '../../../lib/learn/l10n'
import SegmentedControl from './SegmentedControl'
import { ToastProvider } from './Toast'

const anekLatin = Anek_Latin({ subsets: ['latin'], axes: ['wdth'], variable: '--font-anek-latin', display: 'swap' })
const anekBangla = Anek_Bangla({ subsets: ['bengali', 'latin'], axes: ['wdth'], variable: '--font-anek-bangla', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

function Chrome({ children }: { children: ReactNode }) {
  const { lang, setLang, ui } = useLearnPrefs()
  return (
    <div className="shell">
      <header className="bar">
        <Link className="brand" href="/learn">
          <svg viewBox="0 0 34 18" aria-hidden="true">
            <path d="M4 9h26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="7" cy="9" r="5" fill="var(--surface)" stroke="currentColor" strokeWidth="2.6" />
            <circle cx="27" cy="9" r="5" fill="var(--surface)" stroke="currentColor" strokeWidth="2.6" />
          </svg>
          <span>Stop by Stop</span>
        </Link>
        <SegmentedControl
          className="lang"
          ariaLabel="Language"
          value={lang}
          onChange={(v) => setLang(v as Lang)}
          options={[
            { value: 'en', label: 'EN' },
            { value: 'bn', label: 'বাংলা', lang: 'bn' },
          ]}
        />
      </header>
      {children}
      <footer className="foot">
        <span>{ui('footer')}</span> <Link href="/">{ui('backToPortfolio')}</Link>
      </footer>
    </div>
  )
}

interface Props { title: string; description: string; children: ReactNode }

export default function LearnLayout({ title, description, children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className={`learn-root ${anekLatin.variable} ${anekBangla.variable} ${mono.variable}`}>
        <LearnPrefsProvider>
          <ToastProvider>
            <Chrome>{children}</Chrome>
          </ToastProvider>
        </LearnPrefsProvider>
      </div>
    </>
  )
}
