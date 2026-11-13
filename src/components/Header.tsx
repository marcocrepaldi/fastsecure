'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Logo from './Logo';

export type NavCategory = { id: string; name: string; items: { slug: string; name: string }[] };

/** Páginas sem formulário próprio: o CTA leva para o formulário da home. */
const NO_FORM = ['/produtos', '/privacidade'];

export default function Header({ nav }: { nav: NavCategory[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fecha menus ao trocar de página (ajuste de estado durante o render, sem efeito).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMega(false);
    setDrawer(false);
  }

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMega(false);
        setDrawer(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawer]);

  const cta = NO_FORM.includes(pathname) ? '/#cotacao' : '#cotacao';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mega ? 'bg-ink-900/85 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-xl' : 'bg-transparent'
      }`}
      onMouseLeave={() => setMega(false)}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Fast Secure — página inicial" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          <button
            type="button"
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition hover:text-white"
            aria-expanded={mega}
            aria-controls="mega-menu"
            onMouseEnter={() => setMega(true)}
            onClick={() => setMega((v) => !v)}
          >
            Seguros e consórcios
            <ChevronDown className={`size-4 transition ${mega ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          {[
            ['Para empresas', '/#empresas'],
            ['Como funciona', '/#como-funciona'],
            ['Dúvidas', '/#duvidas'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onMouseEnter={() => setMega(false)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={cta} className="btn btn-volt hidden px-5 py-3 sm:inline-flex">
            Cotar agora <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-white ring-1 ring-white/15 lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={drawer}
            onClick={() => setDrawer(true)}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mega menu (desktop) */}
      <div
        id="mega-menu"
        className={`absolute inset-x-0 top-full hidden origin-top border-t border-white/5 bg-ink-900/95 backdrop-blur-xl transition duration-200 lg:block ${
          mega ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-8 gap-y-8 px-8 py-10">
          {nav.map((cat) => (
            <div key={cat.id}>
              <p className="eyebrow text-volt-500">{cat.name}</p>
              <ul className="mt-3 space-y-1.5">
                {cat.items.map((it) => (
                  <li key={it.slug}>
                    <Link href={`/${it.slug}`} className="text-sm text-white/70 transition hover:text-white">
                      {it.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href="/produtos"
            className="group flex flex-col justify-between rounded-2xl bg-brand-500 p-6 text-white transition hover:bg-brand-600"
          >
            <span className="display text-2xl">Ver todos os produtos</span>
            <span className="mt-6 flex items-center gap-2 text-sm font-semibold">
              Catálogo completo <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>

      {/* Drawer (mobile) */}
      <div
        className={`fixed inset-0 z-50 bg-ink-950/60 backdrop-blur-sm transition lg:hidden ${drawer ? 'visible opacity-100' : 'invisible opacity-0'}`}
        onClick={() => setDrawer(false)}
        aria-hidden={!drawer}
      >
        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ink-900 text-white shadow-2xl transition-transform duration-300 ${
            drawer ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-18 items-center justify-between px-5">
            <Logo />
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full ring-1 ring-white/15"
              aria-label="Fechar menu"
              onClick={() => setDrawer(false)}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 pb-6">
            {nav.map((cat) => (
              <div key={cat.id} className="border-b border-white/10">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-left font-semibold"
                  aria-expanded={openCat === cat.id}
                  onClick={() => setOpenCat((c) => (c === cat.id ? null : cat.id))}
                >
                  {cat.name}
                  <ChevronDown className={`size-4 transition ${openCat === cat.id ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {openCat === cat.id && (
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pb-4">
                    {cat.items.map((it) => (
                      <li key={it.slug}>
                        <Link href={`/${it.slug}`} className="text-sm text-white/70">
                          {it.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="mt-4 space-y-1">
              {[
                ['Todos os produtos', '/produtos'],
                ['Para empresas', '/#empresas'],
                ['Como funciona', '/#como-funciona'],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="block py-2 font-semibold text-white/80">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="p-5">
            <a href={cta} onClick={() => setDrawer(false)} className="btn btn-volt w-full py-4">
              Cotar agora <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
