'use client';

import { MartyrData } from '../../types';
import { Facebook, Twitter, Link2, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candle } from './ui/Ornament';

interface FooterProps {
  data: MartyrData;
}

export default function Footer({ data }: FooterProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `In memory of Shohid Md Eyasir Sarker (2006–2024) — July Uprising martyr.`;

  return (
    <footer className="relative border-t border-ink/10 bg-parchment py-16">
      <div className="flag-stripe absolute inset-x-0 top-0 h-1" />
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <div className="mb-6 flex justify-center">
          <Candle size={32} />
        </div>

        <p className="font-bn-serif text-2xl text-ink md:text-3xl">
          “শহীদেরা মরে না — তারা বেঁচে থাকে মানুষের হৃদয়ে।”
        </p>
        <p className={`mt-3 text-base text-ink-soft md:text-lg ${isBn ? 'font-bn' : 'font-serif italic'}`}>
          Martyrs do not die — they live in the hearts of those they fought for.
        </p>

        <div className="my-8 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-ink/20" />
          <span className="font-bn text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted">
            শেয়ার করুন · Share
          </span>
          <span className="h-px w-12 bg-ink/20" />
        </div>

        <div className="flex items-center justify-center gap-3">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-ivory text-ink-soft transition hover:border-[#1877F2]/40 hover:text-[#1877F2]"
          >
            <Facebook size={16} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-ivory text-ink-soft transition hover:border-ink/50 hover:text-ink"
          >
            <Twitter size={16} />
          </a>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy link"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-ivory text-ink-soft transition hover:border-bd-green/50 hover:text-bd-green"
          >
            {copied ? <Check size={16} className="text-bd-green" /> : <Link2 size={16} />}
          </button>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-6 text-xs uppercase tracking-[0.25em] text-ink-muted">
          July Uprising 2024 · Bangladesh · Gazette {data.gazette_no.en}
        </div>
      </div>
    </footer>
  );
}
