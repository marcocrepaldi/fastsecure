import type { Metadata } from 'next';
import type { Faq, Product } from '@/lib/products';
import { SITE } from '@/lib/site';

/**
 * Metadata completa de uma página: canonical + Open Graph + Twitter.
 * O título da aba recebe " | Fast Secure" pelo template do layout.
 */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const full = `${title} | ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
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
  logo: abs('/brand/logo-fastsecure-light.png'),
  image: abs('/opengraph-image'),
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
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
