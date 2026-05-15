'use client';

import { MartyrData } from '../../types';
import { Expand } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Dialog, DialogContent, DialogTrigger } from './ui/Dialog';
import { SectionHeading } from './ui/Ornament';

interface GalleryProps {
  data: MartyrData;
}

// Span recipe to create magazine-style varied masonry
// 6-col grid; pattern repeats for any gallery length
const spanPattern = [
  'col-span-4 row-span-3',
  'col-span-2 row-span-2',
  'col-span-2 row-span-2',
  'col-span-3 row-span-2',
  'col-span-3 row-span-2',
  'col-span-2 row-span-2',
  'col-span-4 row-span-3',
];

export default function Gallery({ data }: GalleryProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading eyebrow="Photographs · আলোকচিত্র" en="Gallery" bn="স্মৃতিচিত্র" />

        <div className="gallery-grid">
          {data.gallery.map((image, index) => {
            const span = spanPattern[index % spanPattern.length];
            return (
              <Dialog
                key={index}
                open={open === index}
                onOpenChange={(v) => setOpen(v ? index : null)}
              >
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className={`group relative block overflow-hidden rounded-sm bg-parchment shadow-sm ring-1 ring-ink/10 transition hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-bd-green ${span}`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt[language] || image.caption[language] || 'Memorial image'}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                      {image.caption[language] && (
                        <p
                          className={`text-sm font-medium text-ivory drop-shadow md:text-base ${
                            isBn ? 'font-bn' : 'font-serif italic'
                          }`}
                        >
                          {image.caption[language]}
                        </p>
                      )}
                    </div>
                    <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ivory/95 text-ink opacity-0 shadow transition group-hover:opacity-100">
                      <Expand size={14} />
                    </span>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <div className="overflow-hidden rounded-sm bg-ink shadow-2xl ring-1 ring-ivory/10">
                    <img
                      src={image.url}
                      alt={image.alt[language] || ''}
                      className="max-h-[80vh] w-full object-contain"
                    />
                    {image.caption[language] && (
                      <p
                        className={`px-6 py-4 text-center text-ivory/90 ${
                          isBn ? 'font-bn' : 'font-serif italic'
                        }`}
                      >
                        {image.caption[language]}
                      </p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </section>
  );
}
