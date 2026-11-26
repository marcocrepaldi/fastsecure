'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { Search, X } from 'lucide-react';
import type { IconName } from './Icon';
import { ProductCard } from './ui';

type CatalogItem = { slug: string; name: string; short: string; icon: IconName; category: string; keywords: string };
type CatalogCategory = { id: string; name: string; tagline: string };

const normalize = (value: string) =>
  value.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, ' ').trim();

function subscribeCategory(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  window.addEventListener('popstate', onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener('popstate', onChange);
  };
}

export default function CatalogBrowser({ items, categories }: { items: CatalogItem[]; categories: CatalogCategory[] }) {
  const [query, setQuery] = useState('');
  const hash = useSyncExternalStore(subscribeCategory, () => window.location.hash.slice(1), () => '');
  const cat = categories.some((category) => category.id === hash) ? hash : 'todos';

  const searchIndex = useMemo(() => items.map((item) => ({
    item,
    text: normalize(`${item.name} ${item.slug} ${item.short} ${item.keywords}`),
  })), [items]);
  const terms = normalize(query).split(' ').filter(Boolean);
  const filtered = searchIndex
    .filter(({ item, text }) => (cat === 'todos' || item.category === cat) && terms.every((term) => text.includes(term)))
    .map(({ item }) => item);

  function selectCategory(id: string) {
    const hash = id === 'todos' ? '' : `#${id}`;
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', `${window.location.pathname}${window.location.search}${hash}`);
      window.dispatchEvent(new Event('hashchange'));
    }
  }

  function resetFilters() {
    setQuery('');
    selectCategory('todos');
  }

  return (
    <>
      <div className="sticky top-18 z-20 -mx-4 border-b border-ink-100 bg-white/90 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative block lg:w-80">
            <span className="sr-only">Buscar produto</span>
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-300" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar: carro, saúde, empresa…"
              className="field pl-12"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0" role="group" aria-label="Filtrar por categoria">
            {[{ id: 'todos', name: 'Todos' }, ...categories].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={cat === c.id}
                onClick={() => selectCategory(c.id)}
                className={`chip shrink-0 transition ${
                  cat === c.id ? 'bg-ink-900 text-white' : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm text-ink-600" role="status">
        {filtered.length === 1 ? '1 produto encontrado' : `${filtered.length} produtos encontrados`}
      </p>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg font-semibold">Experimente outro termo ou consulte todas as categorias.</p>
          <button type="button" className="btn btn-ghost mt-6" onClick={resetFilters}>
            <X className="size-4" aria-hidden="true" /> Limpar filtros
          </button>
        </div>
      ) : (
        categories
          .filter((c) => filtered.some((i) => i.category === c.id))
          .map((c) => (
            <section key={c.id} id={c.id} className="scroll-mt-56 pt-14">
              <h2 className="display text-3xl">{c.name}</h2>
              <p className="mt-1 text-ink-500">{c.tagline}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {filtered
                  .filter((i) => i.category === c.id)
                  .map((p, i) => (
                    <ProductCard key={p.slug} p={p} i={i} />
                  ))}
              </div>
            </section>
          ))
      )}
    </>
  );
}
