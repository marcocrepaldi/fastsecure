import { SITE } from '@/lib/seo';

interface ProductSchemaProps {
  name: string;
  description?: string;
}

/**
 * JSON-LD schema.org/Service para uma página de seguro/produto.
 * Ajuda o Google a entender cada página como um serviço ofertado pela corretora.
 */
export default function ProductSchema({ name, description }: ProductSchemaProps) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    ...(description ? { description } : {}),
    serviceType: 'Seguros e benefícios',
    areaServed: { '@type': 'Country', name: 'Brasil' },
    provider: {
      '@type': 'InsuranceAgency',
      name: SITE.legalName,
      url: SITE.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
