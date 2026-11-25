// Blog da Fast Secure.
//
// Cada matéria é um arquivo Markdown em content/blog/<slug>.md com um cabeçalho (frontmatter):
//
//   ---
//   title: Título da matéria (até ~65 caracteres)
//   description: Resumo para o Google e para o card (até ~155 caracteres)
//   date: 2026-11-26            ← data de publicação (fuso de São Paulo)
//   updated: 2026-12-02         ← opcional: data da última revisão
//   category: veiculos          ← uma das categorias do catálogo (src/lib/products/index.ts)
//   products: [seguro-auto, seguro-motos]   ← produtos citados; o 1º vira o formulário de cotação
//   tags: [preço, bônus]        ← opcional
//   ---
//
// Matérias com data futura ficam agendadas: entram no ar sozinhas no dia, sem novo deploy
// (as páginas do blog são revalidadas a cada hora).
// Uma seção "## Perguntas frequentes" com perguntas em "### " vira FAQ estruturado para o Google
// (a resposta de cada pergunta é o primeiro parágrafo ou lista logo abaixo dela).

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { categories, getProduct, type CategoryId, type Faq, type Product } from '@/lib/products';

const DIR = join(process.cwd(), 'content/blog');
const TZ = 'America/Sao_Paulo';
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type Heading = { id: string; text: string; level: 2 | 3 };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: CategoryId;
  products: string[];
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { html: string; headings: Heading[]; faq: Faq[] };

/** Data de hoje (AAAA-MM-DD) no fuso de São Paulo. */
export function todayInSaoPaulo(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}

// ---------------------------------------------------------------- frontmatter

function parseValue(raw: string): string | string[] {
  const v = raw.trim();
  if (v.startsWith('[') && v.endsWith(']')) {
    return v
      .slice(1, -1)
      .split(',')
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  return v.replace(/^['"]|['"]$/g, '');
}

function splitFrontmatter(source: string, file: string): { data: Record<string, string | string[]>; body: string } {
  const m = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`[blog] ${file}: cabeçalho (---) ausente`);
  const data: Record<string, string | string[]> = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const i = line.indexOf(':');
    if (i < 0) throw new Error(`[blog] ${file}: linha inválida no cabeçalho: "${line}"`);
    data[line.slice(0, i).trim()] = parseValue(line.slice(i + 1));
  }
  return { data, body: m[2] };
}

// ---------------------------------------------------------------- markdown

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Negrito, itálico e links. Links externos abrem em nova aba. */
function inline(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, url: string) => {
    const external = /^https?:\/\//.test(url);
    if (!external && !url.startsWith('/') && !url.startsWith('#')) return label;
    return external
      ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`
      : `<a href="${url}">${label}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return out;
}

const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*+/g, '').trim();

type Rendered = { html: string; headings: Heading[]; faq: Faq[]; words: number };

/** Markdown enxuto: ## e ### títulos, parágrafos, listas, citações, tabelas simples e ---. */
export function renderMarkdown(md: string): Rendered {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  const headings: Heading[] = [];
  const faq: Faq[] = [];
  const used = new Set<string>();
  let inFaq = false;
  let currentQ: Faq | null = null;
  let words = 0;

  const uniqueId = (text: string) => {
    const base = slugify(text) || 'secao';
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    return id;
  };
  const pushFaq = () => {
    if (currentQ && currentQ.a) faq.push(currentQ);
    currentQ = null;
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (!t) {
      i++;
      continue;
    }

    const h = t.match(/^(#{2,3})\s+(.+)$/);
    if (h) {
      const level = h[1].length as 2 | 3;
      const text = plain(h[2]);
      const id = uniqueId(text);
      headings.push({ id, text, level });
      html.push(`<h${level} id="${id}">${inline(h[2])}</h${level}>`);
      words += text.split(/\s+/).length;
      if (level === 2) {
        pushFaq();
        inFaq = /perguntas frequentes|d[úu]vidas frequentes/i.test(text);
      } else if (inFaq) {
        pushFaq();
        currentQ = { q: text, a: '' };
      }
      i++;
      continue;
    }

    if (/^---+$/.test(t)) {
      html.push('<hr />');
      i++;
      continue;
    }

    if (/^[-*]\s+/.test(t) || /^\d+[.)]\s+/.test(t)) {
      const ordered = /^\d/.test(t);
      const items: string[] = [];
      while (i < lines.length && (ordered ? /^\d+[.)]\s+/ : /^[-*]\s+/).test(lines[i].trim())) {
        items.push(lines[i].trim().replace(ordered ? /^\d+[.)]\s+/ : /^[-*]\s+/, ''));
        i++;
      }
      const tag = ordered ? 'ol' : 'ul';
      html.push(`<${tag}>${items.map((it) => `<li>${inline(it)}</li>`).join('')}</${tag}>`);
      words += items.join(' ').split(/\s+/).length;
      if (currentQ) {
        currentQ.a = items.map(plain).join(' ');
        pushFaq();
      }
      continue;
    }

    if (t.startsWith('>')) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quote.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      html.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`);
      words += quote.join(' ').split(/\s+/).length;
      continue;
    }

    if (t.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      html.push(
        `<div class="table-wrap"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead>` +
          `<tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`,
      );
      words += rows.flat().join(' ').split(/\s+/).length;
      continue;
    }

    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3}\s|[-*]\s|\d+[.)]\s|>|\||---+$)/.test(lines[i].trim())) {
      para.push(lines[i].trim());
      i++;
    }
    const text = para.join(' ');
    html.push(`<p>${inline(text)}</p>`);
    words += text.split(/\s+/).length;
    if (currentQ) {
      currentQ.a = plain(text);
      pushFaq();
    }
  }
  pushFaq();

  return { html: html.join('\n'), headings, faq, words };
}

// ---------------------------------------------------------------- leitura

const categoryIds = new Set<string>(categories.map((c) => c.id));

function loadPost(file: string): Post {
  const slug = file.replace(/\.md$/, '');
  if (!SLUG_RE.test(slug)) throw new Error(`[blog] ${file}: nome do arquivo deve ser minúsculo, sem acento, com hífens`);
  const { data, body } = splitFrontmatter(readFileSync(join(DIR, file), 'utf8'), file);
  const str = (k: string, required = true) => {
    const v = data[k];
    if (typeof v === 'string' && v) return v;
    if (required) throw new Error(`[blog] ${file}: campo "${k}" obrigatório`);
    return undefined;
  };
  const list = (k: string) => {
    const v = data[k];
    return Array.isArray(v) ? v : typeof v === 'string' && v ? [v] : [];
  };

  const date = str('date')!;
  const updated = str('updated', false);
  for (const d of [date, updated]) {
    if (d && !DATE_RE.test(d)) throw new Error(`[blog] ${file}: data "${d}" deve estar no formato AAAA-MM-DD`);
  }
  const category = str('category')!;
  if (!categoryIds.has(category)) throw new Error(`[blog] ${file}: categoria "${category}" não existe no catálogo`);
  const products = list('products');
  for (const p of products) {
    if (!getProduct(p)) throw new Error(`[blog] ${file}: produto "${p}" não existe no catálogo`);
  }

  const rendered = renderMarkdown(body);
  return {
    slug,
    title: str('title')!,
    description: str('description')!,
    date,
    updated: updated && updated > date ? updated : undefined,
    category: category as CategoryId,
    products,
    tags: list('tags'),
    readingMinutes: Math.max(1, Math.round(rendered.words / 200)),
    html: rendered.html,
    headings: rendered.headings,
    faq: rendered.faq,
  };
}

function loadAll(): Post[] {
  let files: string[] = [];
  try {
    files = readdirSync(DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  } catch {
    return [];
  }
  return files.map(loadPost).sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title) : b.date.localeCompare(a.date)));
}

/** Matérias já publicadas (data ≤ hoje em São Paulo), da mais recente para a mais antiga. */
export function publishedPosts(today = todayInSaoPaulo()): Post[] {
  return loadAll().filter((p) => p.date <= today);
}

export function getPost(slug: string): Post | undefined {
  return publishedPosts().find((p) => p.slug === slug);
}

export function postsInCategory(id: CategoryId): Post[] {
  return publishedPosts().filter((p) => p.category === id);
}

export function postProducts(p: PostMeta): Product[] {
  return p.products.map((s) => getProduct(s)).filter((x): x is Product => Boolean(x));
}

/** Leia também: mesma categoria ou produto em comum, depois as mais recentes. */
export function relatedPosts(post: PostMeta, limit = 3): Post[] {
  const others = publishedPosts().filter((p) => p.slug !== post.slug);
  const score = (p: Post) =>
    (p.category === post.category ? 2 : 0) + p.products.filter((s) => post.products.includes(s)).length;
  return others
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map((x) => x.p);
}

/** Categorias que já têm matéria publicada. */
export function blogCategories() {
  const posts = publishedPosts();
  return categories
    .map((c) => ({ ...c, count: posts.filter((p) => p.category === c.id).length }))
    .filter((c) => c.count > 0);
}
