import { ogCard, ogSize, publicImageDataUrl } from '@/lib/og';
import { getPost, publishedPosts } from '@/lib/blog';
import { getCategory } from '@/lib/products';

export const alt = 'Matéria do blog da Fast Secure';
export const size = ogSize;
export const contentType = 'image/png';
export const revalidate = 3600;

export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  return ogCard({
    eyebrow: p ? `Blog · ${getCategory(p.category).name}` : 'Blog Fast Secure',
    title: p?.title ?? 'Seguro explicado sem letra miúda.',
    footer: 'fastsecure.com.br/blog',
    backgroundSrc: p?.cover ? await publicImageDataUrl(p.cover.src) : undefined,
  });
}
