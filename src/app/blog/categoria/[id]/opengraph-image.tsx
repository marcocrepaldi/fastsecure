import { blogCategories } from '@/lib/blog';
import { categoryGuides } from '@/lib/editorial';
import { ogCard, ogSize, publicImageDataUrl } from '@/lib/og';
import { categories } from '@/lib/products';

export const alt = 'Guias do Blog Fast Secure';
export const size = ogSize;
export const contentType = 'image/png';
export const revalidate = 3600;

export function generateStaticParams() {
  return blogCategories().map(({ id }) => ({ id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = categories.find((item) => item.id === id);
  const guide = category && categoryGuides[category.id];

  return ogCard({
    eyebrow: category?.name ?? 'Blog',
    title: guide?.title ?? 'Guias do Blog Fast Secure',
    footer: 'Fast Secure Corretora de Seguros',
    backgroundSrc: guide ? await publicImageDataUrl(guide.image) : undefined,
    fullBleedBackground: Boolean(guide),
  });
}
