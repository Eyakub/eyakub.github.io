'use client';

import { MartyrData, Reference } from '../../types';
import { ExternalLink } from 'lucide-react';
import { FaFacebook, FaYoutube, FaNewspaper } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import { SectionHeading } from './ui/Ornament';

interface ReferencesProps {
  data: MartyrData;
}

const typeMeta: Record<
  Reference['type'],
  { Icon: any; label: string; accent: string; chipBg: string }
> = {
  facebook: {
    Icon: FaFacebook,
    label: 'Facebook',
    accent: 'text-[#1877F2]',
    chipBg: 'bg-[#1877F2]/10 text-[#1877F2] ring-[#1877F2]/30',
  },
  youtube: {
    Icon: FaYoutube,
    label: 'YouTube',
    accent: 'text-bd-red',
    chipBg: 'bg-bd-red/10 text-bd-red ring-bd-red/30',
  },
  news: {
    Icon: FaNewspaper,
    label: 'News',
    accent: 'text-bd-green',
    chipBg: 'bg-bd-green/10 text-bd-green ring-bd-green/30',
  },
};

export default function References({ data }: ReferencesProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <section id="references" className="relative bg-parchment/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="As Reported · গণমাধ্যমে"
          en="Media Coverage & References"
          bn="তথ্যসূত্র"
        />

        <div className="mb-8 text-center text-sm text-ink-muted">
          <span className="display text-2xl font-bold text-ink">{data.references.length}</span>
          <span className={`ml-2 ${isBn ? 'font-bn' : 'font-serif'}`}>
            primary sources collected
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.references.map((ref, i) => {
            const meta = typeMeta[ref.type] ?? typeMeta.news;
            const Icon = meta.Icon;
            return (
              <a
                key={i}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-ivory shadow-sm transition hover:-translate-y-1 hover:border-bd-green/40 hover:shadow-xl"
              >
                {ref.thumbnail && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-parchment">
                    <img
                      src={ref.thumbnail}
                      alt={ref.title[language]}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
                    <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory/95 shadow ring-1 ring-ink/10">
                      <Icon className={meta.accent} size={16} />
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${meta.chipBg}`}
                    >
                      {meta.label}
                    </span>
                    <span className={`text-xs text-ink-muted ${isBn ? 'font-bn' : ''}`}>
                      {ref.date[language]}
                    </span>
                  </div>
                  <h3
                    className={`mb-2 line-clamp-3 text-[17px] font-semibold leading-snug text-ink md:text-lg ${
                      isBn ? 'font-bn' : 'font-serif'
                    }`}
                  >
                    {ref.title[language]}
                  </h3>
                  {ref.description && (
                    <p
                      className={`mb-4 line-clamp-3 text-sm leading-relaxed text-ink-soft ${
                        isBn ? 'font-bn' : 'font-serif'
                      }`}
                    >
                      {ref.description[language]}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-3 text-xs">
                    <span className={`font-medium uppercase tracking-wider text-ink-soft ${isBn ? 'font-bn' : ''}`}>
                      {ref.source[language]}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-bd-green transition group-hover:gap-1.5">
                      Read <ExternalLink size={12} />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
