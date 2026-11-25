import type { MetadataRoute } from 'next';
import { blogCategories, publishedPosts } from '@/lib/blog';
import { products } from '@/lib/products';
import { postDateTime } from '@/lib/seo';
import { SITE } from '@/lib/site';

// Inclui matérias agendadas assim que entram no ar.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = publishedPosts();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/produtos`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...products.map((p) => ({
      url: `${SITE.url}/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: p.popular ? 0.9 : 0.8,
    })),
    {
      url: `${SITE.url}/blog`,
      lastModified: posts[0] ? new Date(postDateTime(posts[0].updated ?? posts[0].date)) : now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    ...blogCategories().map((c) => ({
      url: `${SITE.url}/blog/categoria/${c.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    ...posts.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(postDateTime(p.updated ?? p.date)),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${SITE.url}/privacidade`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
