import { ogCard, ogSize, publicImageDataUrl } from '@/lib/og';
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
  const backgroundSrc = p?.hero.image ? await publicImageDataUrl(p.hero.image) : undefined;
  const title = backgroundSrc ? p?.metaTitle : p?.hero.title;
  return ogCard({
    eyebrow: p?.hero.eyebrow ?? 'Fast Secure',
    title: title ?? 'Seguro bom é seguro comparado.',
    footer: `Cotação sem custo · ${p?.quoteComparison?.label ?? `${SITE.stats.insurers}+ seguradoras`} · Fast Secure`,
    backgroundSrc,
    fullBleedBackground: Boolean(backgroundSrc),
  });
}
