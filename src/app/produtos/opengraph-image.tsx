import { catalogPage } from '@/lib/editorial';
import { ogCard, ogSize, publicImageDataUrl } from '@/lib/og';

export const alt = 'Catálogo de produtos da Fast Secure';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return ogCard({
    eyebrow: catalogPage.eyebrow,
    title: catalogPage.heading,
    footer: 'Compare opções e peça a sua cotação online',
    backgroundSrc: await publicImageDataUrl(catalogPage.image),
    fullBleedBackground: true,
  });
}
