// Dados institucionais da Fast Secure — fonte única para layout, SEO e links.
//
// ⚠️ Revise antes do go-live: telefone, e-mail, endereço e números de prova
// social (stats) vieram da versão anterior do site e precisam ser confirmados.

export const SITE = {
  name: 'Fast Secure',
  legalName: 'Fast Secure Corretora de Seguros',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fastsecure.com.br').replace(/\/$/, ''),
  description:
    'Corretora de seguros multi-produto: cotação rápida de seguro auto, plano de saúde, seguro de vida, seguros empresariais, garantias e consórcios, comparando as principais seguradoras.',
  locale: 'pt_BR',
  phone: '(11) 98526-6582',
  /** Mesmo número em formato internacional, para links tel: e dados estruturados. */
  phoneE164: '+5511985266582',
  email: 'contato@fastsecure.com.br',
  address: {
    street: 'Av. Paulista, 1000',
    city: 'São Paulo',
    region: 'SP',
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
  return (process.env.WHATSAPP_NUMBER || '5511985266582').replace(/\D/g, '');
}

/** Link wa.me com mensagem opcional. Use em Server Components. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${whatsappNumber()}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
