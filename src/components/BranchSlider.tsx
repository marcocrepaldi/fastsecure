'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { Slide } from '@/lib/slides';

const INTERVAL = 6500;

const REDUCED = '(prefers-reduced-motion: reduce)';
function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

/**
 * Carrossel dos principais ramos.
 * - troca automática a cada 6,5 s, com botão de pausa (WCAG 2.2.2);
 * - pausa ao passar o mouse, ao focar com o teclado e com a aba oculta;
 * - sem autoplay para quem prefere movimento reduzido;
 * - arrastar com o dedo no celular, setas e indicadores.
 */
export default function BranchSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  // null = segue a preferência do sistema; true/false = escolha da pessoa no botão.
  const [choice, setChoice] = useState<boolean | null>(null);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const playing = choice ?? !reduced;
  const [hover, setHover] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  const running = playing && !hover;
  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, INTERVAL);
    return () => window.clearInterval(t);
  }, [running, count]);

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Principais seguros"
      className="relative px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pb-24"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={() => setHover(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1);
        if (e.key === 'ArrowLeft') go(index - 1);
      }}
    >
      <div
        className="relative mx-auto h-[34rem] max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink-900 sm:h-[36rem] lg:h-[38rem]"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${count}: ${s.eyebrow}`}
              aria-hidden={!active}
              inert={!active}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${active ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1280px) 1280px, 100vw"
                className={`object-cover object-[70%_center] transition-transform duration-[7000ms] ease-out ${active ? 'scale-105' : 'scale-100'}`}
              />
              {/* Gradiente para legibilidade do texto (lado esquerdo e base no celular) */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/55 to-ink-950/10 sm:bg-gradient-to-r sm:from-ink-950/90 sm:via-ink-950/50 sm:to-transparent" />

              <div className="relative flex h-full max-w-2xl flex-col justify-end p-7 pb-24 text-white sm:justify-center sm:p-14 sm:pb-14 lg:p-20">
                <span
                  className={`chip w-fit bg-volt-500 text-ink-900 transition duration-700 ${active ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
                  {s.eyebrow}
                </span>
                <h2
                  className={`display mt-5 text-4xl text-balance transition delay-100 duration-700 sm:text-5xl lg:text-6xl ${active ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                >
                  {s.title}
                </h2>
                <p
                  className={`mt-4 max-w-md text-lg text-white/80 transition delay-200 duration-700 ${active ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                >
                  {s.text}
                </p>
                <Link
                  href={s.href}
                  className={`btn btn-volt mt-8 w-fit transition delay-300 duration-700 ${active ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                >
                  {s.cta} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          );
        })}

        {/* Controles */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-start gap-4 p-6 sm:justify-between sm:p-8 lg:px-20">
          <div className="flex items-center gap-2" role="tablist" aria-label="Escolher slide">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.eyebrow}
                onClick={() => go(i)}
                className="group relative h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-500"
                style={{ width: i === index ? 56 : 20 }}
              >
                {i === index && (
                  <span
                    key={`${index}-${running}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-volt-500"
                    style={{
                      width: running ? undefined : '100%',
                      animation: running ? `slide-progress ${INTERVAL}ms linear forwards` : undefined,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setChoice(!playing)}
              aria-label={playing ? 'Pausar slides' : 'Retomar slides'}
              className="grid size-10 place-items-center rounded-full text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/10"
            >
              {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Slide anterior"
              className="hidden size-11 place-items-center rounded-full text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/10 sm:grid"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Próximo slide"
              className="hidden size-11 place-items-center rounded-full bg-white text-ink-900 transition hover:bg-volt-500 sm:grid"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
