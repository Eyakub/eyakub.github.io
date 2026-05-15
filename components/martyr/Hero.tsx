'use client';

import { MartyrData } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeroProps {
  data: MartyrData;
}

export default function Hero({ data }: HeroProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <header className="relative overflow-hidden pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-bd-green/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-bd-red/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-10 md:pb-20 md:pt-14 lg:px-8">
        {/* Archival eyebrow */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <span className="archival-stamp text-bd-red">In Memoriam · ১৪৩১ বঙ্গাব্দ</span>
          <span className="hidden h-4 w-px bg-ink/20 sm:inline-block" />
          <span className="font-bn text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">
            জুলাই গণঅভ্যুত্থান · July Uprising 2024
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[440px_1fr] lg:gap-20">
          {/* Portrait with archival frame */}
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Outer offset frame (bd green) */}
              <div className="absolute -left-4 -top-4 h-full w-full rounded-sm border border-bd-green/60" />
              <div className="absolute -right-4 -bottom-4 h-full w-full rounded-sm border border-bd-red/60" />

              {/* Portrait */}
              <figure className="relative overflow-hidden rounded-sm bg-parchment shadow-2xl ring-1 ring-ink/15">
                <img
                  src={data.portrait}
                  alt={data.name.en}
                  className="aspect-[4/5] w-full object-cover"
                />
                {/* Sepia/vignette wash */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/40" />

                {/* Corner stamp top-left */}
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-sm bg-ivory/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                  Gazette · {data.gazette_no.en}
                </span>

                {/* Bottom name plate */}
                <figcaption className="absolute inset-x-3 bottom-3 rounded-sm bg-ivory/95 px-3 py-2 backdrop-blur-sm">
                  <p className="font-bn-serif text-sm font-bold text-bd-red">শহীদ</p>
                  <p className="display text-[15px] leading-tight text-ink">
                    Md Eyasir Sarker
                  </p>
                </figcaption>
              </figure>

              {/* Date plaque */}
              <div className="mt-6 flex items-center justify-between rounded-sm border border-ink/15 bg-parchment/80 px-4 py-3">
                <div className="text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-muted">
                    Born
                  </p>
                  <p className="display mt-0.5 text-base text-ink">20 Nov 2006</p>
                </div>
                <span className="font-serif text-2xl text-bd-red">—</span>
                <div className="text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-muted">
                    Martyred
                  </p>
                  <p className="display mt-0.5 text-base text-bd-red">5 Aug 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Headline column */}
          <div className="order-1 text-center lg:order-2 lg:text-left">
            <p className="font-bn-serif mb-3 text-base font-bold text-bd-red md:text-lg">
              শহীদ
            </p>
            <h1
              className={`display text-balance text-[2.5rem] leading-[1.02] text-ink sm:text-6xl md:text-7xl lg:text-[5.25rem] ${
                isBn ? 'font-bn-serif' : ''
              }`}
            >
              {isBn ? data.name.bn : 'Md Eyasir Sarker'}
            </h1>
            <p
              className={`mt-2 text-xl text-ink-muted md:text-2xl ${
                isBn ? 'font-serif italic' : 'font-bn-serif'
              }`}
            >
              {isBn ? 'Md Eyasir Sarker' : data.name.bn}
            </p>

            <div className="my-7 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-px w-12 bg-bd-red" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bd-red">
                Age 17 · Student Martyr
              </span>
              <span className="h-px w-12 bg-bd-red" />
            </div>

            {/* Bangla pull quote */}
            <blockquote className="relative mx-auto max-w-xl lg:mx-0">
              <span className="display absolute -left-2 -top-6 text-7xl leading-none text-bd-green/30">
                “
              </span>
              <p className="pull-quote bn font-bn-serif text-xl text-ink md:text-2xl">
                বুকের ভেতর অনেক ঝড়, বুক পেতেছি গুলি কর।
              </p>
              <footer className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
                — The slogan of July
              </footer>
            </blockquote>

            <p
              className={`mx-auto mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg lg:mx-0 ${
                isBn ? 'font-bn' : 'font-serif'
              }`}
            >
              {data.shortBio[language]}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#biography"
                className="inline-flex items-center gap-2 rounded-sm bg-bd-green px-5 py-2.5 text-sm font-semibold text-ivory shadow-sm transition hover:bg-bd-green-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-bd-green/50"
              >
                Read his story
              </a>
              <a
                href="#martyrdom"
                className="inline-flex items-center gap-2 rounded-sm border border-ink/20 bg-ivory px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-bd-red/40 hover:text-bd-red"
              >
                The day he fell
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
