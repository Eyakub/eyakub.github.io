'use client';

import { MartyrData } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { SectionHeading } from './ui/Ornament';

interface BiographyProps {
  data: MartyrData;
}

export default function Biography({ data }: BiographyProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const paragraphs = data.biography[language]
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  const pullQuoteEn =
    'His sense of justice and love for his fellow countrymen led him to join the July movement.';
  const pullQuoteBn = 'দেশের প্রতি তার অগাধ ভালোবাসা ও অন্যায়ের প্রতি ঘৃণা তাকে জুলাই গণআন্দোলনে যুক্ত হতে অনুপ্রাণিত করেছিল।';

  return (
    <section id="biography" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading eyebrow="A Life · জীবনী" en="Biography" bn="তাঁর কথা" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          {/* Editorial body */}
          <article className={`has-dropcap max-w-[68ch] ${isBn ? 'font-bn' : 'font-serif'}`}>
            <p
              className={`mb-10 border-l-2 border-bd-red/70 pl-6 text-xl leading-relaxed text-ink-soft md:text-2xl ${
                isBn ? 'font-bn' : 'font-serif italic'
              }`}
            >
              {data.shortBio[language]}
            </p>

            {paragraphs.map((para, i) => (
              <div key={i}>
                <p className="mb-6 text-[18px] leading-[1.85] text-ink-soft md:text-[19px]">
                  {para}
                </p>
                {i === 1 && (
                  <aside className="my-10 border-y border-ink/15 py-6 text-center">
                    <p
                      className={`pull-quote ${isBn ? 'bn font-bn-serif' : ''} text-2xl leading-snug text-ink md:text-3xl`}
                    >
                      “{isBn ? pullQuoteBn : pullQuoteEn}”
                    </p>
                  </aside>
                )}
              </div>
            ))}
          </article>

          {/* Quick facts rail */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-sm border border-ink/15 bg-parchment/80 p-6 shadow-sm">
              <p className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-bd-red">
                <span className="h-px w-6 bg-bd-red" />
                Quick Facts
              </p>
              <dl className="space-y-5">
                <Fact label="Born" labelBn="জন্ম" value={data.birthDate[language]} isBn={isBn} />
                <Fact label="Birthplace" labelBn="জন্মস্থান" value={data.birthPlace[language]} isBn={isBn} />
                <Fact label="Martyrdom" labelBn="শাহাদাত" value={data.deathDate[language]} emphasis isBn={isBn} />
                <Fact label="Gazette No." labelBn="গেজেট নং" value={data.gazette_no[language]} isBn={isBn} />
                <Fact label="MIS ID" labelBn="এমআইএস আইডি" value={data.mis_id[language]} isBn={isBn} />
              </dl>
            </div>

            <div className="mt-5 rounded-sm border border-bd-red/30 bg-bd-red/5 p-5">
              <p className="font-bn-serif text-lg text-bd-red">৪র্থ সন্তান</p>
              <p className={`mt-1 text-sm leading-relaxed text-ink-soft ${isBn ? 'font-bn' : 'font-serif italic'}`}>
                Fourth of five siblings — the heart of his family.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Fact({
  label,
  labelBn,
  value,
  emphasis,
  isBn,
}: {
  label: string;
  labelBn: string;
  value: string;
  emphasis?: boolean;
  isBn: boolean;
}) {
  return (
    <div className="border-b border-ink/10 pb-4 last:border-b-0 last:pb-0">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
        {label}
        <span className="font-bn ml-2 normal-case tracking-normal text-ink-muted/80">· {labelBn}</span>
      </dt>
      <dd
        className={`mt-1.5 text-lg font-semibold ${emphasis ? 'text-bd-red' : 'text-ink'} ${
          isBn ? 'font-bn' : ''
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
