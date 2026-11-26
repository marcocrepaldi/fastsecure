// Dados institucionais da Fast Secure — fonte única para layout, SEO e links.
//
// ⚠️ Revise antes do go-live: telefone, e-mail e números de prova
// social (stats) vieram da versão anterior do site e precisam ser confirmados.

const instagramHandle = 'fastsecureoficial';

export const SITE = {
  name: 'Fast Secure',
  legalName: 'Fast Secure Corretora de Seguros',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsecure.com.br').replace(/\/$/, ''),
  description:
    'Corretora de seguros multi-produto: cotação rápida de seguro auto, plano de saúde, seguro de vida, seguros empresariais, garantias e consórcios, comparando as principais seguradoras.',
  locale: 'pt_BR',
  phone: '(11) 92784-5928',
  /** Mesmo número em formato internacional, para links tel: e dados estruturados. */
  phoneE164: '+5511927845928',
  email: 'contato@fastsecure.com.br',
  instagram: { handle: instagramHandle, url: `https://www.instagram.com/${instagramHandle}/` },
  address: {
    street: 'R. Pais Leme, 215',
    neighborhood: 'Pinheiros',
    city: 'São Paulo',
    region: 'SP',
    postalCode: '05424-010',
    country: 'BR',
  },
  hours: 'Segunda a sexta, das 9h às 18h',
  stats: {
    insurers: 15,
    lives: 10000,
    renewal: 98,
  },
} as const;

/** Número de WhatsApp que recebe os leads (só dígitos, com DDI). Somente no servidor. */
export function whatsappNumber(): string {
  return (process.env.WHATSAPP_NUMBER || '5511927845928').replace(/\D/g, '');
}

/** Link wa.me com mensagem opcional. Use em Server Components. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${whatsappNumber()}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
