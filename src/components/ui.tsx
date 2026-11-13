import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import type { Faq, Product } from '@/lib/products';
import type { QuoteProduct } from './QuoteForm';
import Icon from './Icon';

export function toQuoteProduct(p: Product): QuoteProduct {
  return { slug: p.slug, name: p.name, audience: p.audience, question: p.question };
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`} data-reveal>
      <p className={`eyebrow ${dark ? 'text-volt-500' : 'text-brand-600'}`}>{eyebrow}</p>
      <h2 className={`display mt-3 text-3xl sm:text-4xl lg:text-5xl ${dark ? 'text-white' : 'text-ink-900'}`}>{title}</h2>
      {text && <p className={`mt-4 text-lg ${dark ? 'text-white/65' : 'text-ink-500'}`}>{text}</p>}
    </div>
  );
}

export function ProductCard({ p, i = 0 }: { p: Pick<Product, 'slug' | 'name' | 'short' | 'icon'>; i?: number }) {
  return (
    <Link
      href={`/${p.slug}`}
      data-reveal
      style={{ ['--d' as string]: i % 4 }}
      className="group relative flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lift"
    >
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
          <Icon name={p.icon} className="size-6" />
        </span>
        <ArrowUpRight
          className="size-5 text-ink-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500"
          aria-hidden="true"
        />
      </div>
      <h3 className="mt-5 text-lg font-bold text-ink-900">{p.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{p.short}</p>
    </Link>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-ink-100 rounded-3xl border border-ink-100 bg-white">
      {items.map((f, i) => (
        <details key={f.q} className="faq-item group px-6" open={i === 0}>
          <summary className="flex items-center justify-between gap-6 py-5 text-left font-semibold text-ink-900">
            {f.q}
            <span className="faq-icon grid size-8 shrink-0 place-items-center rounded-full bg-ink-50 text-ink-500 transition group-hover:bg-brand-50 group-hover:text-brand-600">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="-mt-1 pb-6 leading-relaxed text-ink-500">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
