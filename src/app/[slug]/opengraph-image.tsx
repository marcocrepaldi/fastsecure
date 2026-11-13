import { ogCard, ogSize } from '@/lib/og';
import { getProduct, products } from '@/lib/products';
import { SITE } from '@/lib/site';

export const alt = 'Cotação online na Fast Secure';
export const size = ogSize;
export const contentType = 'image/png';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  return ogCard({
    eyebrow: p?.hero.eyebrow ?? 'Fast Secure',
    title: p?.hero.title ?? 'Seguro bom é seguro comparado.',
    footer: `Cotação sem custo · ${SITE.stats.insurers}+ seguradoras · Fast Secure`,
  });
}
