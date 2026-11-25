import { getCategory } from '@/lib/products';
import { publishedPosts } from '@/lib/blog';
import { postDateTime } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const revalidate = 3600;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const posts = publishedPosts().slice(0, 50);
  const items = posts
    .map((p) => {
      const url = `${SITE.url}/blog/${p.slug}`;
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(
        postDateTime(p.date),
      ).toUTCString()}</pubDate><category>${esc(getCategory(p.category).name)}</category><description>${esc(p.description)}</description></item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Blog ${esc(
    SITE.name,
  )}</title><link>${SITE.url}/blog</link><description>Guias de seguros, planos de saúde e consórcios.</description><language>pt-BR</language><atom:link href="${
    SITE.url
  }/blog/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
