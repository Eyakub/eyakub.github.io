'use client';

import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const sections = [
  { id: 'biography', en: 'Biography', bn: 'জীবনী' },
  { id: 'timeline', en: 'Timeline', bn: 'ধারা' },
  { id: 'martyrdom', en: 'Martyrdom', bn: 'শাহাদাত' },
  { id: 'gallery', en: 'Gallery', bn: 'গ্যালারি' },
  { id: 'references', en: 'References', bn: 'তথ্যসূত্র' },
];

export default function TopNav() {
  const { language, toggleLanguage } = useLanguage();
  const isBn = language === 'bn';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 transition ${
        scrolled
          ? 'border-b border-ink/10 bg-ivory/90 backdrop-blur'
          : 'bg-transparent'
      }`}
    >
      <div className="flag-stripe h-[3px] w-full" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 lg:px-8">
        <a
          href="#top"
          className={`display whitespace-nowrap text-base font-semibold tracking-tight text-ink ${
            scrolled ? 'opacity-100' : 'opacity-0 lg:opacity-100'
          } transition`}
        >
          <span className="text-bd-red">শহীদ</span>{' '}
          <span className="hidden sm:inline">Eyasir Sarker</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`rounded-sm px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-ink-soft transition hover:text-bd-red ${
                isBn ? 'font-bn' : ''
              }`}
            >
              {isBn ? s.bn : s.en}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={`Switch to ${isBn ? 'English' : 'বাংলা'}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-ivory px-3 py-1.5 text-xs font-medium text-ink shadow-sm transition hover:border-bd-green/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-bd-green"
        >
          <Languages size={14} className="text-bd-green" />
          <span className={isBn ? 'font-serif' : 'font-bn'}>
            {isBn ? 'English' : 'বাংলা'}
          </span>
        </button>
      </div>
    </div>
  );
}
