'use client';

import { MartyrData } from '../../types';
import { MapPin, Calendar, FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SectionHeading } from './ui/Ornament';

interface DeathDetailsProps {
  data: MartyrData;
}

export default function DeathDetails({ data }: DeathDetailsProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <section
      id="martyrdom"
      className="relative overflow-hidden bg-ink py-20 text-ivory md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 25%, rgba(200,16,46,0.4), transparent 40%), radial-gradient(circle at 85% 75%, rgba(0,106,78,0.3), transparent 50%)',
        }}
      />
      <div className="flag-stripe absolute inset-x-0 top-0 h-1" />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading
          invert
          eyebrow="The Day He Fell · ৫ আগস্ট ২০২৪"
          en="Martyrdom"
          bn="শাহাদাত"
        />

        {/* Pull quote */}
        <blockquote className="mx-auto max-w-3xl border-y border-ivory/15 py-8 text-center">
          <p className="pull-quote bn font-bn-serif text-2xl leading-snug text-ivory md:text-3xl">
            “বাবার কাঁধে ছেলের লাশ, শোকে বাকরুদ্ধ মা।”
          </p>
          <footer className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory/50">
            Channel 24
          </footer>
        </blockquote>

        {/* Stamp row */}
        <div className="my-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          <Stamp icon={Calendar} label="Date" labelBn="তারিখ" value={data.deathDate[language]} isBn={isBn} />
          <Stamp icon={MapPin} label="Location" labelBn="স্থান" value={data.deathDetails.location[language]} isBn={isBn} />
          <Stamp icon={FileText} label="Gazette" labelBn="গেজেট" value={`No. ${data.gazette_no[language]}`} isBn={isBn} />
        </div>

        {/* Cause + Description */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-bd-red">
              Cause · কারণ
            </p>
            <p className={`text-lg leading-[1.85] text-ivory/90 ${isBn ? 'font-bn' : 'font-serif'}`}>
              {data.deathDetails.cause[language]}
            </p>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-bd-red">
              Account · বিবরণ
            </p>
            <p className={`text-lg leading-[1.85] text-ivory/90 ${isBn ? 'font-bn' : 'font-serif'}`}>
              {data.deathDetails.description[language]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stamp({
  icon: Icon,
  label,
  labelBn,
  value,
  isBn,
}: {
  icon: typeof MapPin;
  label: string;
  labelBn: string;
  value: string;
  isBn: boolean;
}) {
  return (
    <div className="rounded-sm border border-ivory/15 bg-ivory/[0.04] px-4 py-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2 text-bd-red">
        <Icon size={14} />
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
          {label} · <span className="font-bn">{labelBn}</span>
        </p>
      </div>
      <p className={`text-base font-medium text-ivory md:text-lg ${isBn ? 'font-bn' : 'font-serif'}`}>
        {value}
      </p>
    </div>
  );
}
