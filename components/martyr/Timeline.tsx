'use client';

import { MartyrData } from '../../types';
import { Baby, BookOpen, GraduationCap, Megaphone, Flame, Sunrise, Crosshair, Flag, MessageSquare, Building2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SectionHeading } from './ui/Ornament';

interface TimelineProps {
  data: MartyrData;
}

type EventVisual = {
  icon: typeof BookOpen;
  ageEn: string;
  ageBn: string;
  era: { en: string; bn: string };
  contextEn?: string;
  contextBn?: string;
};

const eventVisuals: EventVisual[] = [
  {
    icon: Baby,
    ageEn: 'Newborn',
    ageBn: 'নবজাতক',
    era: { en: 'Childhood', bn: 'শৈশব' },
  },
  {
    icon: BookOpen,
    ageEn: 'Ages 12 – 16',
    ageBn: '১২ – ১৬ বছর',
    era: { en: 'School Years', bn: 'বিদ্যালয়জীবন' },
  },
  {
    icon: GraduationCap,
    ageEn: 'Age 17',
    ageBn: '১৭ বছর',
    era: { en: 'College', bn: 'কলেজজীবন' },
  },
  {
    icon: Megaphone,
    ageEn: 'Age 17',
    ageBn: '১৭ বছর',
    era: { en: 'The Movement', bn: 'গণআন্দোলন' },
    contextEn:
      'The Quota Reform protests had begun a month earlier; on July 16, Abu Sayeed was shot dead in Rangpur, igniting a national uprising.',
    contextBn:
      'এক মাস আগেই শুরু হয়েছিল কোটা সংস্কার আন্দোলন; ১৬ জুলাই রংপুরে আবু সাঈদের শাহাদাত গোটা দেশকে জাগিয়ে তোলে।',
  },
];

export default function Timeline({ data }: TimelineProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const standardEvents = data.timeline.slice(0, -1);
  const climax = data.timeline[data.timeline.length - 1];

  return (
    <section id="timeline" className="relative bg-parchment/60 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading eyebrow="A Life in Brief · ১৭ বছরের জীবন" en="Timeline" bn="জীবনের ধারা" />

        <EraRibbon timeline={data.timeline} language={language} isBn={isBn} />

        <ol className="relative mx-auto mt-12 max-w-3xl space-y-10 border-l-2 border-dashed border-ink/15 pl-2 md:ml-8">
          {standardEvents.map((event, i) => {
            const v = eventVisuals[i] ?? eventVisuals[0];
            const Icon = v.icon;
            return (
              <li key={i} className="relative pl-8 md:pl-12">
                <span
                  className="absolute -left-[1px] top-1 z-10 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-bd-green text-ivory shadow ring-4 ring-parchment"
                  aria-hidden
                >
                  <Icon size={14} strokeWidth={2.5} />
                </span>

                <p
                  className={`text-[10px] font-semibold uppercase tracking-[0.3em] text-bd-green ${
                    isBn ? 'font-bn' : ''
                  }`}
                >
                  {isBn ? v.era.bn : v.era.en} · {isBn ? v.ageBn : v.ageEn}
                </p>
                <h3
                  className={`display mt-2 text-3xl text-ink md:text-4xl ${
                    isBn ? 'font-bn-serif' : ''
                  }`}
                >
                  {event.title[language]}
                </h3>
                <p
                  className={`mt-1.5 text-sm font-medium text-ink-muted ${
                    isBn ? 'font-bn' : 'font-serif italic'
                  }`}
                >
                  {event.date[language]}
                </p>
                <p
                  className={`mt-3 max-w-prose text-[16px] leading-[1.75] text-ink-soft md:text-[17px] ${
                    isBn ? 'font-bn' : 'font-serif'
                  }`}
                >
                  {event.description[language]}
                </p>

                {(v.contextEn || v.contextBn) && (
                  <div className="mt-4 inline-block max-w-prose border-l-2 border-bd-red/60 bg-bd-red/[0.04] px-4 py-2.5 text-sm">
                    <span className="mr-2 text-[10px] font-semibold uppercase tracking-wider text-bd-red">
                      Historical context
                    </span>
                    <span className={`text-ink-soft ${isBn ? 'font-bn' : 'font-serif italic'}`}>
                      {isBn ? v.contextBn : v.contextEn}
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {climax && <ClimaxCard event={climax} data={data} language={language} isBn={isBn} />}

        <Coda isBn={isBn} />
      </div>
    </section>
  );
}

function EraRibbon({
  timeline,
  language,
  isBn,
}: {
  timeline: MartyrData['timeline'];
  language: 'en' | 'bn';
  isBn: boolean;
}) {
  return (
    <div className="relative mx-auto max-w-3xl px-4">
      <div className="absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-bd-green/50 via-ink/15 to-bd-red/70" />
      <ol className="relative grid grid-cols-5 gap-2 text-center">
        {timeline.map((e, i) => {
          const isLast = i === timeline.length - 1;
          return (
            <li key={i} className="flex flex-col items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ring-4 ring-parchment/60 ${
                  isLast ? 'bg-bd-red' : 'bg-bd-green'
                }`}
                aria-hidden
              />
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.15em] md:text-xs ${
                  isLast ? 'text-bd-red' : 'text-ink-soft'
                } ${isBn ? 'font-bn' : ''}`}
              >
                {e.date[language]}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

type DayMoment = {
  time: string;
  icon: typeof Sunrise;
  en: string;
  bn: string;
  emphasis?: 'red' | 'flag';
};

const dayOfEvents: DayMoment[] = [
  {
    time: 'Morning',
    icon: Sunrise,
    en: 'Despite his family\'s warnings, Eyasir leaves home to join the Long March to Gonobhaban.',
    bn: 'পরিবারের নিষেধ সত্ত্বেও ইয়াসির বেরিয়ে পড়েন গণভবন অভিমুখী লং মার্চে যোগ দিতে।',
  },
  {
    time: '1 – 2 PM',
    icon: Flag,
    en: 'Sheikh Hasina resigns and flees the country, ending fifteen years of rule.',
    bn: 'শেখ হাসিনা পদত্যাগ করে দেশ ছাড়েন — পনেরো বছরের শাসনের সমাপ্তি।',
    emphasis: 'flag',
  },
  {
    time: '1:56 – 3:30 PM',
    icon: Crosshair,
    en: 'Even after her fall, Jatrabari police open fire on unarmed protesters. Eyasir is hit by three bullets.',
    bn: 'তাঁর পতনের পরেও যাত্রাবাড়ী থানার পুলিশ নিরস্ত্র আন্দোলনকারীদের ওপর গুলি চালায়। ইয়াসিরের শরীরে তিনটি গুলি বিদ্ধ হয়।',
    emphasis: 'red',
  },
  {
    time: '~11:00 PM',
    icon: MessageSquare,
    en: 'His family learns of his death — through a single Facebook post.',
    bn: 'একটি মাত্র ফেসবুক পোস্টের মাধ্যমে পরিবার তাঁর মৃত্যুর খবর জানতে পারে।',
  },
  {
    time: 'Later that night',
    icon: Building2,
    en: 'His body is recovered from Dhaka Medical College.',
    bn: 'ঢাকা মেডিকেল কলেজে তাঁর নিথর দেহ পাওয়া যায়।',
  },
];

function ClimaxCard({
  event,
  data,
  language,
  isBn,
}: {
  event: MartyrData['timeline'][number];
  data: MartyrData;
  language: 'en' | 'bn';
  isBn: boolean;
}) {
  return (
    <article
      aria-labelledby="climax-title"
      className="relative mt-16 overflow-hidden rounded-sm bg-ink text-ivory shadow-2xl ring-1 ring-ink/40"
    >
      <div className="flag-stripe absolute inset-x-0 top-0 h-1" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 85% 25%, rgba(200,16,46,0.35), transparent 50%), radial-gradient(circle at 10% 85%, rgba(0,106,78,0.2), transparent 55%)',
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
        {/* Left — editorial */}
        <div className="p-7 md:p-10 lg:p-14">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-bd-red">
            <Flame size={14} />
            <span>The End · শাহাদাত</span>
          </p>

          {/* Date stamp — newspaper masthead style */}
          <div className="my-7 flex items-center gap-5 border-y border-ivory/15 py-5">
            <span className="display text-[5.5rem] font-bold leading-none text-ivory md:text-8xl">
              5
            </span>
            <div className="flex flex-col">
              <span className="font-bn-serif text-3xl leading-tight text-bd-red md:text-4xl">
                আগস্ট
              </span>
              <span className="display text-xl leading-tight text-ivory/80 md:text-2xl">
                August 2024
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory/50">
                Monday · সোমবার
              </span>
            </div>
          </div>

          <h3
            id="climax-title"
            className={`display text-3xl text-ivory md:text-4xl ${
              isBn ? 'font-bn-serif' : ''
            }`}
          >
            {event.title[language]}
          </h3>
          <p
            className={`mt-4 max-w-prose text-[17px] leading-[1.85] text-ivory/85 md:text-lg ${
              isBn ? 'font-bn' : 'font-serif'
            }`}
          >
            {event.description[language]}
          </p>

          {/* Day-of-events micro timeline */}
          <ol className="mt-8 space-y-4 border-t border-ivory/15 pt-6">
            <li className="text-[10px] font-semibold uppercase tracking-[0.3em] text-bd-red">
              That Day · সেদিন
            </li>
            {dayOfEvents.map((m, i) => {
              const Icon = m.icon;
              const tone =
                m.emphasis === 'red'
                  ? 'border-bd-red text-bd-red'
                  : m.emphasis === 'flag'
                    ? 'border-bd-green text-bd-green'
                    : 'border-ivory/30 text-ivory/60';
              return (
                <li key={i} className="grid grid-cols-[auto_5.5rem_1fr] items-start gap-3 md:gap-4">
                  <span
                    className={`mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full border ${tone}`}
                    aria-hidden
                  >
                    <Icon size={13} strokeWidth={2.2} />
                  </span>
                  <time className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ivory/60">
                    {m.time}
                  </time>
                  <p
                    className={`text-[15px] leading-snug md:text-base ${
                      m.emphasis === 'red'
                        ? 'text-ivory'
                        : 'text-ivory/85'
                    } ${isBn ? 'font-bn' : 'font-serif'}`}
                  >
                    {isBn ? m.bn : m.en}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right — portrait + closing Bangla line */}
        <figure className="relative min-h-[340px] lg:min-h-full">
          <img
            src={data.portrait}
            alt={data.name.en}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Triple gradient: top fade, left fade (desktop), bottom fade for caption */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/30 to-transparent lg:from-ink lg:via-ink/10"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink"
          />

          {/* Top corner stamp */}
          <div className="absolute right-5 top-5 rounded-sm border border-ivory/30 bg-ink/60 px-3 py-1.5 text-right backdrop-blur-sm">
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-ivory/60">
              Gazette
            </p>
            <p className="display text-lg leading-none text-ivory">
              No. {data.gazette_no.en}
            </p>
          </div>

          <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="font-bn-serif text-2xl leading-tight text-ivory md:text-3xl">
              “সেদিন তিনি আর ফেরেননি।”
            </p>
            <p className="mt-2 font-serif text-base italic text-ivory/75 md:text-lg">
              He did not come home that day.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-bd-red">
              <span className="h-px w-6 bg-bd-red" />
              Three bullets · তিনটি গুলি
            </div>
          </figcaption>
        </figure>
      </div>
    </article>
  );
}

function Coda({ isBn }: { isBn: boolean }) {
  return (
    <div className="mt-14 text-center">
      <p className={`text-lg text-ink-soft md:text-xl ${isBn ? 'font-bn' : 'font-serif italic'}`}>
        {isBn ? 'আজ বেঁচে থাকলে তাঁর বয়স হতো ' : 'Today, he would be '}
        <span className="display not-italic text-3xl font-bold text-bd-red md:text-4xl">
          {isBn ? '১৯' : '19'}
        </span>
        {isBn ? ' বছর।' : ' years old.'}
      </p>
    </div>
  );
}
