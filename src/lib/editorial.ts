import type { CategoryId } from '@/lib/products';

export const catalogPage = {
  title: 'Catálogo de seguros, planos de saúde e consórcios',
  heading: 'Seguros, planos de saúde e consórcios',
  description: 'Encontre seguros para pessoas e empresas, planos de saúde, garantias, consórcios e previdência. Busque por produto ou navegue por categoria.',
  eyebrow: 'Catálogo',
  image: '/images/editorial/produtos.webp',
};

export const privacyPage = {
  title: 'Política de Privacidade e dados pessoais',
  heading: 'Política de Privacidade',
  description: 'Saiba quais dados a Fast Secure coleta para cotação e atendimento, como usa essas informações e como exercer seus direitos pela LGPD.',
  eyebrow: 'LGPD',
  image: '/images/editorial/privacidade.webp',
};

export const categoryGuides: Partial<Record<CategoryId, {
  title: string;
  description: string;
  image: string;
  products: string[];
}>> = {
  veiculos: {
    title: 'Guias de seguros para veículos',
    description: 'Compare seguro auto, de moto e de frota com guias sobre preço, perfil do condutor, franquia e coberturas.',
    image: '/images/editorial/categoria-veiculos.webp',
    products: ['seguro-auto', 'seguro-motos', 'seguro-frota'],
  },
  saude: {
    title: 'Guias de planos de saúde e benefícios',
    description: 'Entenda como comparar plano de saúde individual ou empresarial e o que conferir sobre rede, abrangência, carências e elegibilidade.',
    image: '/images/editorial/categoria-saude.webp',
    products: ['plano-de-saude', 'plano-de-saude-empresarial', 'plano-odontologico'],
  },
  vida: {
    title: 'Guias de seguro de vida e proteção de renda',
    description: 'Aprenda a calcular o capital segurado e a comparar coberturas por morte, incapacidade temporária e doenças graves.',
    image: '/images/editorial/categoria-vida.webp',
    products: ['seguro-de-vida', 'seguro-dit', 'seguro-doencas-graves'],
  },
};

export const articleHeroImages: Readonly<Partial<Record<string, string>>> = {
  'o-que-muda-o-preco-do-seguro-auto': '/images/products/seguro-auto-hero.webp',
  'plano-de-saude-empresarial-cnpj-mei': '/images/products/plano-de-saude-empresarial-hero.webp',
  'como-calcular-capital-seguro-de-vida': '/images/products/seguro-de-vida-hero.webp',
};
