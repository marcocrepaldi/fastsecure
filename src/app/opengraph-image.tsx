import { ogCard, ogSize } from '@/lib/og';
import { products } from '@/lib/products';
import { SITE } from '@/lib/site';

export const alt = 'Fast Secure — Corretora de Seguros';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return ogCard({
    eyebrow: 'Corretora de seguros',
    title: 'Seguro bom é seguro comparado.',
    footer: `${products.length} produtos · ${SITE.stats.insurers}+ seguradoras · cotação pelo WhatsApp`,
  });
}
