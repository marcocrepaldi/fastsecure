import type { Metadata } from 'next';

/**
 * Configuração central de SEO da Fast Secure.
 * Defina o domínio real em NEXT_PUBLIC_SITE_URL (ex.: https://www.fastsecure.com.br).
 */
export const SITE = {
  name: 'Fast Secure',
  legalName: 'Fast Secure Corretora de Seguros',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fastsecure.com.br').replace(/\/$/, ''),
  description:
    'Corretora de seguros e benefícios multi-produto. Consultoria independente em seguros corporativos, planos de saúde, seguro de vida, patrimônio e investimentos — habilitada SUSEP e ANS.',
  locale: 'pt_BR',
  // Imagem de compartilhamento gerada dinamicamente em app/opengraph-image.tsx
  ogImage: '/opengraph-image',
  phone: '0800 123 4567',
  email: 'contato@fastsecure.com.br',
  address: {
    street: 'Av. Paulista, 1000',
    city: 'São Paulo',
    region: 'SP',
    country: 'BR',
  },
  twitter: '@fastsecure',
} as const;

interface PageSeo {
  title: string;
  description: string;
  /** Caminho absoluto da rota, ex.: '/seguro-auto'. */
  path: string;
  image?: string;
}

/**
 * Monta o objeto Metadata completo de uma página: canonical + Open Graph + Twitter.
 */
export function buildMetadata({ title, description, path, image }: PageSeo): Metadata {
  const url = SITE.url + path;
  // O título da aba usa o template "%s | Fast Secure" do layout; removemos o
  // sufixo aqui para não duplicar. O Open Graph mantém o título completo.
  const bare = title.replace(/\s*\|\s*Fast Secure\s*$/i, '').trim();
  const full = `${bare} | ${SITE.name}`;
  const img = image || SITE.ogImage;
  return {
    title: bare,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: full,
      description,
      images: [{ url: img, width: 1200, height: 630, alt: full }],
    },
    twitter: {
      card: 'summary_large_image',
      title: full,
      description,
      images: [img],
    },
  };
}
