import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ui';
import { popularProducts } from '@/lib/products';

export default function NotFound() {
  return (
    <main>
      <section className="mesh grain relative overflow-hidden pt-36 pb-20 text-center text-white">
        <div className="relative mx-auto max-w-2xl px-4">
          <p className="display text-8xl text-volt-500">404</p>
          <h1 className="display mt-4 text-4xl">Esta página não existe</h1>
          <p className="mt-4 text-white/70">Mas o seguro que você procura provavelmente sim.</p>
          <Link href="/produtos" className="btn btn-volt mt-8">
            Ver todos os produtos <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {popularProducts.slice(0, 8).map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </section>
    </main>
  );
}
