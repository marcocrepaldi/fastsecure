import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { formatDate, type PostMeta } from '@/lib/blog';
import { getCategory } from '@/lib/products';

export function PostMetaLine({ p, dark = false }: { p: PostMeta; dark?: boolean }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${dark ? 'text-white/60' : 'text-ink-400'}`}>
      <time dateTime={p.date}>{formatDate(p.date)}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3.5" aria-hidden="true" /> {p.readingMinutes} min de leitura
      </span>
    </p>
  );
}

export function PostCard({ p, i = 0, featured = false }: { p: PostMeta; i?: number; featured?: boolean }) {
  const cat = getCategory(p.category);
  return (
    <Link
      href={`/blog/${p.slug}`}
      data-reveal
      style={{ ['--d' as string]: i % 3 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lift ${
        featured ? 'lg:flex-row' : ''
      }`}
    >
      <div
        className={`mesh grain relative flex shrink-0 items-end overflow-hidden p-6 text-white ${
          featured ? 'min-h-56 lg:min-h-full lg:w-1/2 lg:p-10' : 'min-h-40'
        }`}
        aria-hidden="true"
      >
        <div className="grid-lines absolute inset-0" />
        <span className="chip relative bg-white/10 text-white ring-1 ring-white/15">{cat.name}</span>
      </div>
      <div className={`flex flex-1 flex-col p-6 ${featured ? 'lg:p-10' : ''}`}>
        <PostMetaLine p={p} />
        <h3 className={`display mt-3 text-ink-900 ${featured ? 'text-3xl lg:text-4xl' : 'text-xl'}`}>{p.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-500">{p.description}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-bold text-brand-600">
          Ler matéria
          <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function CategoryNav({ items, active }: { items: { id: string; name: string; count: number }[]; active?: string }) {
  const base = 'chip ring-1 transition';
  return (
    <nav aria-label="Categorias do blog" className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        aria-current={!active ? 'page' : undefined}
        className={`${base} ${!active ? 'bg-ink-900 text-white ring-ink-900' : 'bg-white text-ink-600 ring-ink-200 hover:ring-ink-400'}`}
      >
        Todas
      </Link>
      {items.map((c) => (
        <Link
          key={c.id}
          href={`/blog/categoria/${c.id}`}
          aria-current={active === c.id ? 'page' : undefined}
          className={`${base} ${
            active === c.id ? 'bg-ink-900 text-white ring-ink-900' : 'bg-white text-ink-600 ring-ink-200 hover:ring-ink-400'
          }`}
        >
          {c.name} <span className="opacity-60">{c.count}</span>
        </Link>
      ))}
    </nav>
  );
}

export function BlogHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="mesh grain relative overflow-hidden pt-32 pb-16 text-white lg:pt-40 lg:pb-20">
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow text-volt-500">{eyebrow}</p>
        <h1 className="display mt-3 max-w-3xl text-5xl sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-white/65">{text}</p>
      </div>
    </section>
  );
}
