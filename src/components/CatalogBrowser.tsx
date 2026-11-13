'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { IconName } from './Icon';
import { ProductCard } from './ui';

type CatalogItem = { slug: string; name: string; short: string; icon: IconName; category: string; keywords: string };
type CatalogCategory = { id: string; name: string; tagline: string };

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export default function CatalogBrowser({ items, categories }: { items: CatalogItem[]; categories: CatalogCategory[] }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<string>('todos');

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return items.filter(
      (i) => (cat === 'todos' || i.category === cat) && (!q || normalize(`${i.name} ${i.short} ${i.keywords}`).includes(q)),
    );
  }, [items, query, cat]);

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
          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0" role="tablist" aria-label="Categorias">
            {[{ id: 'todos', name: 'Todos' }, ...categories].map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={cat === c.id}
                onClick={() => setCat(c.id)}
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

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg font-semibold">Nenhum produto encontrado para “{query}”.</p>
          <button type="button" className="btn btn-ghost mt-6" onClick={() => setQuery('')}>
            <X className="size-4" aria-hidden="true" /> Limpar busca
          </button>
        </div>
      ) : (
        categories
          .filter((c) => filtered.some((i) => i.category === c.id))
          .map((c) => (
            <section key={c.id} id={c.id} className="scroll-mt-48 pt-14">
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
