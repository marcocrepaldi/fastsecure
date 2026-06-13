'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Camada de micro-interações sem dependências externas (~1KB):
 *  - scroll-reveal para qualquer elemento com [data-reveal]
 *  - count-up para qualquer elemento com [data-count="<numero>"]
 * Respeita prefers-reduced-motion. Re-escaneia o DOM a cada troca de rota
 * (navegação client-side do App Router), então funciona em todas as páginas.
 */
export default function ScrollFX() {
  const pathname = usePathname();

  // Estado "scrolled" da navbar (blur/sombra). Independe da rota.
  useEffect(() => {
    const nav = document.querySelector('.navbar-custom');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const countEls = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));

    if (reduce) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      countEls.forEach((el) => {
        el.textContent = el.dataset.prefix ?? '';
        el.textContent += Number(el.dataset.count).toLocaleString('pt-BR');
        el.textContent += el.dataset.suffix ?? '';
      });
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    const runCount = (el: HTMLElement) => {
      const target = Number(el.dataset.count) || 0;
      const prefix = el.dataset.prefix ?? '';
      const suffix = el.dataset.suffix ?? '';
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.round(target * eased);
        el.textContent = prefix + value.toLocaleString('pt-BR') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCount(entry.target as HTMLElement);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    countEls.forEach((el) => countObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
