import type { MetadataRoute } from 'next';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { SITE } from '../lib/seo';

/** Descobre todas as rotas com page.tsx dentro de src/app. */
function getRoutes(dir: string, base = ''): string[] {
  const routes: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('_') || entry.startsWith('.') || entry === 'api') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      // Ignora segmentos dinâmicos/agrupadores
      if (entry.startsWith('[') || entry.startsWith('(')) continue;
      routes.push(...getRoutes(full, `${base}/${entry}`));
    } else if (entry === 'page.tsx') {
      routes.push(base || '/');
    }
  }
  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = join(process.cwd(), 'src', 'app');
  const routes = getRoutes(appDir);
  const now = new Date();

  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
