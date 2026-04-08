'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  title: string;
  category: string;
  image: string;
}

interface Gallery3DCarouselProps {
  items: GalleryItem[];
}

function getOffset(index: number, current: number, total: number): number {
  let diff = index - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function getStyle(offset: number): React.CSSProperties {
  const abs = Math.abs(offset);

  if (abs > 2) {
    return {
      transform: 'translateX(-50%) translateZ(-300px) scale(0.5)',
      opacity: 0,
      filter: 'blur(10px)',
      zIndex: 0,
      pointerEvents: 'none',
    };
  }

  const configs: Record<number, React.CSSProperties> = {
    0: {
      transform: 'translateX(-50%) translateZ(0px) rotateY(0deg) scale(1)',
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 10,
    },
    1: {
      transform: `translateX(calc(-50% + ${offset > 0 ? '42%' : '-42%'})) translateZ(-120px) rotateY(${offset > 0 ? '-25' : '25'}deg) scale(0.82)`,
      opacity: 0.6,
      filter: 'blur(2.5px)',
      zIndex: 5,
      cursor: 'pointer',
    },
    2: {
      transform: `translateX(calc(-50% + ${offset > 0 ? '78%' : '-78%'})) translateZ(-220px) rotateY(${offset > 0 ? '-38' : '38'}deg) scale(0.65)`,
      opacity: 0.25,
      filter: 'blur(5px)',
      zIndex: 2,
      pointerEvents: 'none' as const,
    },
  };

  return configs[abs] ?? {};
}

export default function Gallery3DCarousel({ items }: Gallery3DCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % items.length);
  }, [items.length]);

  return (
    <div className="relative w-full select-none">
      {/* Carousel */}
      <div
        className="relative mx-auto w-full max-w-5xl"
        style={{ perspective: '1200px' }}
      >
        <div className="relative h-[340px] sm:h-[400px] md:h-[480px]">
          {items.map((item, i) => {
            const offset = getOffset(i, current, items.length);
            const isCenter = offset === 0;
            const style = getStyle(offset);

            return (
              <div
                key={i}
                className="absolute top-0 left-1/2 w-[65%] sm:w-[55%] md:w-[44%] h-full"
                style={{
                  ...style,
                  transition: 'all 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => {
                  if (offset === -1) prev();
                  if (offset === 1) next();
                }}
              >
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden ${
                    isCenter
                      ? 'shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.08]'
                      : 'shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 70vw, 45vw"
                    priority={Math.abs(offset) <= 1}
                  />

                  {/* Info overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end"
                    style={{
                      opacity: isCenter ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                    }}
                  >
                    <div className="p-5 md:p-6 w-full">
                      <span className="text-xs text-brand-red-light font-heading font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="text-white font-heading font-bold text-lg md:text-xl mt-0.5">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.14] hover:border-white/20 backdrop-blur-sm transition-all duration-300"
          aria-label="Vorheriges Bild"
        >
          <ChevronLeft size={20} className="text-white/60 group-hover:text-white transition-colors" />
        </button>
        <button
          onClick={next}
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.14] hover:border-white/20 backdrop-blur-sm transition-all duration-300"
          aria-label="Nächstes Bild"
        >
          <ChevronRight size={20} className="text-white/60 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-1.5 bg-brand-red'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Bild ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
