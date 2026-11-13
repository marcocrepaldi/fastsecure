import CatalogBrowser from '@/components/CatalogBrowser';
import { categories, products } from '@/lib/products';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Todos os seguros, planos e consórcios',
  description: `Catálogo completo com ${products.length} produtos: seguros para pessoas e empresas, planos de saúde, garantias, consórcios e previdência. Cote online.`,
  path: '/produtos',
});

export default function ProdutosPage() {
  const items = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    short: p.short,
    icon: p.icon,
    category: p.category,
    keywords: `${p.hero.eyebrow} ${p.forWho.join(' ')}`,
  }));

  return (
    <main>
      <section className="mesh grain relative overflow-hidden pt-32 pb-16 text-white lg:pt-40 lg:pb-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-volt-500">Catálogo</p>
          <h1 className="display mt-3 max-w-3xl text-5xl text-balance sm:text-6xl">
            {products.length} formas de proteger o que importa
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/70">
            Busque pelo que você quer proteger ou navegue pelas categorias. Cada produto tem cotação online.
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
