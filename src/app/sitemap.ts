import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/produtos`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...products.map((p) => ({
      url: `${SITE.url}/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: p.popular ? 0.9 : 0.8,
    })),
    { url: `${SITE.url}/privacidade`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
