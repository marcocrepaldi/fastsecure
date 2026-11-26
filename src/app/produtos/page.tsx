import CatalogBrowser from '@/components/CatalogBrowser';
import HeroBackdrop from '@/components/HeroBackdrop';
import { catalogPage } from '@/lib/editorial';
import { categories, products } from '@/lib/products';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: catalogPage.title,
  description: catalogPage.description,
  path: '/produtos',
});

export default function ProdutosPage() {
  const items = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    short: p.short,
    icon: p.icon,
    category: p.category,
    keywords: `${p.metaTitle} ${p.hero.eyebrow} ${p.forWho.join(' ')}`,
  }));

  return (
    <main>
      <section className="relative overflow-hidden bg-ink-950 pt-40 pb-16 text-white lg:pt-44 lg:pb-20">
        <HeroBackdrop src={catalogPage.image} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-volt-500">{catalogPage.eyebrow}</p>
          <h1 className="display mt-3 max-w-3xl text-5xl text-balance sm:text-6xl">
            {catalogPage.heading}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Busque pelo que você quer proteger ou navegue pelas categorias. Abra a página do produto para comparar opções e falar com a Fast Secure.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <CatalogBrowser
          items={items}
          categories={categories.map(({ id, name, tagline }) => ({ id, name, tagline }))}
        />
      </div>
    </main>
  );
}
