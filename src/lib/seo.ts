import type { Metadata } from 'next';
import type { Faq, Product } from '@/lib/products';
import { SITE } from '@/lib/site';
import type { PostMeta } from '@/lib/blog';

/**
 * Metadata completa de uma página: canonical + Open Graph + Twitter.
 * O título da aba recebe " | Fast Secure" pelo template do layout.
 */
export function buildMetadata({
  title,
  description,
  path,
  article,
}: {
  title: string;
  description: string;
  path: string;
  /** Matéria do blog: Open Graph do tipo "article" com datas e seção. */
  article?: { publishedTime: string; modifiedTime?: string; section: string; tags?: string[] };
}): Metadata {
  const full = `${title} | ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(article
        ? {
            type: 'article' as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            section: article.section,
            tags: article.tags,
            authors: [SITE.name],
          }
        : { type: 'website' as const }),
      locale: SITE.locale,
      url: SITE.url + path,
      siteName: SITE.name,
      title: full,
      description,
    },
    twitter: { card: 'summary_large_image', title: full, description },
  };
}

const abs = (path: string) => SITE.url + path;

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  description: SITE.description,
  telephone: SITE.phoneE164,
  email: SITE.email,
  sameAs: [SITE.instagram.url],
  logo: abs('/brand/logo-fastsecure-light.png'),
  image: abs('/opengraph-image'),
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${SITE.address.street} - ${SITE.address.neighborhood}`,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  areaServed: 'BR',
};

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  inLanguage: 'pt-BR',
};

export function serviceLd(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: p.name,
    serviceType: p.hero.eyebrow,
    description: p.metaDescription,
    url: abs(`/${p.slug}`),
    areaServed: { '@type': 'Country', name: 'Brasil' },
    provider: { '@type': 'InsuranceAgency', name: SITE.legalName, url: SITE.url },
  };
}

export function breadcrumbLd(items: { name: string; path?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: abs(it.path) } : {}),
    })),
  };
}

export function faqLd(faq: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Horário fixo de publicação (09:00 em São Paulo) para as datas AAAA-MM-DD das matérias. */
export const postDateTime = (d: string) => `${d}T09:00:00-03:00`;

export function blogPostingLd(p: PostMeta, sectionName: string) {
  const url = abs(`/blog/${p.slug}`);
  const socialImage = abs(`/blog/${p.slug}/opengraph-image`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: postDateTime(p.date),
    dateModified: postDateTime(p.updated ?? p.date),
    inLanguage: 'pt-BR',
    articleSection: sectionName,
    keywords: p.tags.join(', ') || undefined,
    image: p.cover ? [abs(p.cover.src), socialImage] : socialImage,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.legalName,
      logo: { '@type': 'ImageObject', url: abs('/brand/logo-fastsecure-light.png') },
    },
  };
}
