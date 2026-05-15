export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-bd-green/40" />
      <svg width="22" height="22" viewBox="0 0 24 24" className="text-bd-red" fill="currentColor" aria-hidden>
        <path d="M12 2l2.4 6.6L21 9l-5.2 4.4L17.6 21 12 17.2 6.4 21l1.8-7.6L3 9l6.6-.4z" />
      </svg>
      <span className="h-px w-16 bg-bd-green/40" />
    </div>
  );
}

export function SectionHeading({
  en,
  bn,
  eyebrow,
  invert = false,
}: {
  en: string;
  bn: string;
  eyebrow?: string;
  invert?: boolean;
}) {
  return (
    <div className="mb-12 flex flex-col items-center gap-3 text-center md:mb-14">
      <Ornament />
      {eyebrow && (
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${
            invert ? 'text-bd-red' : 'text-bd-red'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`display text-3xl md:text-4xl lg:text-5xl ${
          invert ? 'text-ivory' : 'text-ink'
        }`}
      >
        {en}
      </h2>
      <p
        className={`font-bn-serif text-base md:text-lg ${
          invert ? 'text-ivory/70' : 'text-ink-muted'
        }`}
      >
        {bn}
      </p>
    </div>
  );
}

export function Candle({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 28 44"
      aria-hidden
      className="inline-block"
    >
      {/* flame */}
      <g className="candle-flame">
        <path
          d="M14 2 C 10 8, 9 12, 11 16 C 12 18, 13 18.5, 14 18.5 C 15 18.5, 16 18, 17 16 C 19 12, 18 8, 14 2 Z"
          fill="#FFB547"
        />
        <path
          d="M14 6 C 12 10, 12 13, 14 16 C 16 13, 16 10, 14 6 Z"
          fill="#FFE08A"
        />
      </g>
      {/* wick */}
      <rect x="13.4" y="18" width="1.2" height="3" fill="#1A1612" />
      {/* candle body */}
      <rect x="8" y="21" width="12" height="20" rx="1.5" fill="#EDE6D3" stroke="#1A1612" strokeWidth="0.6" />
      <rect x="8" y="21" width="12" height="3" fill="#D9CFB5" />
      {/* base */}
      <rect x="6" y="40" width="16" height="3" rx="1" fill="#7A0A1B" />
    </svg>
  );
}
