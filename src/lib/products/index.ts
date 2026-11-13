// Catálogo de produtos da Fast Secure.
// Cada produto vira uma landing page em /<slug> (src/app/[slug]/page.tsx).
// Para criar um produto novo: adicione um item no arquivo da categoria. Nada mais.

import type { IconName } from '@/components/Icon';
import type { CategoryId, Product } from './types';
import { veiculos } from './veiculos';
import { saude } from './saude';
import { vida } from './vida';
import { casa } from './casa';
import { empresa } from './empresa';
import { rc } from './rc';
import { financeiro } from './financeiro';

export type { Product, CategoryId, Audience, Faq, Item } from './types';

export type Category = { id: CategoryId; name: string; tagline: string; icon: IconName };

export const categories: Category[] = [
  { id: 'veiculos', name: 'Veículos', tagline: 'Carro, moto, caminhão, frota e barco', icon: 'car' },
  { id: 'saude', name: 'Saúde e benefícios', tagline: 'Planos, odonto e saúde corporativa', icon: 'pulse' },
  { id: 'vida', name: 'Vida e renda', tagline: 'Família, renda, viagem e sucessão', icon: 'heart' },
  { id: 'casa', name: 'Casa e bens', tagline: 'Residência, aluguel, eletrônicos e pets', icon: 'house' },
  { id: 'empresa', name: 'Empresa', tagline: 'Patrimônio, operação, cyber e agro', icon: 'building2' },
  { id: 'rc', name: 'Responsabilidade e garantias', tagline: 'RC, D&O, licitações e processos', icon: 'scale' },
  { id: 'financeiro', name: 'Consórcio e futuro', tagline: 'Consórcios, previdência e capitalização', icon: 'coins' },
];

export const products: Product[] = [...veiculos, ...saude, ...vida, ...casa, ...empresa, ...rc, ...financeiro];

const bySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return bySlug.get(slug);
}

export function productsIn(category: CategoryId): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCategory(id: CategoryId): Category {
  return categories.find((c) => c.id === id)!;
}

export function relatedProducts(p: Product): Product[] {
  return p.related.map((s) => bySlug.get(s)).filter((x): x is Product => Boolean(x));
}

export const popularProducts = products.filter((p) => p.popular);
