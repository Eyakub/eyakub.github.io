'use client';

import { Candle } from './ui/Ornament';
import { useLanguage } from '../../contexts/LanguageContext';

export default function RememberStrip() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  return (
    <section
      aria-label="Remembrance"
      className="relative border-y border-ink/10 bg-parchment/70 py-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 text-center sm:flex-row sm:justify-center sm:gap-6 lg:px-8">
        <Candle size={24} />
        <p className="font-bn-serif text-lg text-ink md:text-xl">
          আমরা ভুলবো না
        </p>
        <span className="hidden h-4 w-px bg-ink/20 sm:inline-block" />
        <p className={`text-base text-ink-soft md:text-lg ${isBn ? 'font-bn' : 'font-serif italic'}`}>
          We will not forget.
        </p>
      </div>
    </section>
  );
}
