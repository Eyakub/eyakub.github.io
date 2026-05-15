'use client';

import { MartyrData } from '../../types';
import { Baby, BookOpen, GraduationCap, Megaphone, Flame } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SectionHeading } from './ui/Ornament';

interface TimelineProps {
  data: MartyrData;
}

const eventIcons = [Baby, BookOpen, GraduationCap, Megaphone, Flame];

export default function Timeline({ data }: TimelineProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <section id="timeline" className="relative bg-parchment/60 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading eyebrow="A Life in Brief" en="Timeline" bn="জীবনের ধারা" />

        <ol className="relative space-y-12 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-bd-green/70 before:via-ink/20 before:to-bd-red/80 md:before:left-1/2 md:before:-translate-x-1/2">
          {data.timeline.map((event, i) => {
            const Icon = eventIcons[i] ?? BookOpen;
            const isLast = i === data.timeline.length - 1;
            const alignRight = i % 2 === 1;
            return (
              <li key={i} className="relative pl-14 md:pl-0">
                <span
                  className={`absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-parchment md:left-1/2 md:-translate-x-1/2 ${
                    isLast ? 'bg-bd-red' : 'bg-bd-green'
                  }`}
                  aria-hidden
                >
                  <Icon size={12} className="text-ivory" strokeWidth={2.5} />
                </span>

                <div
                  className={`md:w-[calc(50%-2.5rem)] ${
                    alignRight ? 'md:ml-auto md:pl-10 md:text-left' : 'md:pr-10 md:text-right'
                  }`}
                >
                  <div
                    className={`inline-block rounded-sm border border-ink/10 bg-ivory px-5 py-4 shadow-sm ${
                      alignRight ? 'text-left' : 'md:text-right'
                    }`}
                  >
                    <p
                      className={`display text-2xl font-bold leading-none md:text-3xl ${
                        isLast ? 'text-bd-red' : 'text-bd-green'
                      } ${isBn ? 'font-bn-serif' : ''}`}
                    >
                      {event.date[language]}
                    </p>
                    <h3
                      className={`mt-2 text-lg font-semibold text-ink md:text-xl ${
                        isBn ? 'font-bn-serif' : 'font-serif'
                      }`}
                    >
                      {event.title[language]}
                    </h3>
                    <p
                      className={`mt-2 text-[15px] leading-relaxed text-ink-soft ${
                        isBn ? 'font-bn' : 'font-serif'
                      }`}
                    >
                      {event.description[language]}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
