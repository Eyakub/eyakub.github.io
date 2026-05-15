'use client';

import { useLanguage } from '../../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage();
  const next = language === 'bn' ? 'English' : 'বাংলা';

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={`Switch to ${next}`}
      className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ivory/95 px-4 py-2 text-sm font-medium text-ink shadow-md backdrop-blur transition hover:border-bd-green/40 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-bd-green"
    >
      <Languages size={16} className="text-bd-green" />
      <span className={language === 'bn' ? 'font-serif' : 'font-bn'}>{next}</span>
    </button>
  );
}
