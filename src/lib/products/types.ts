import type { IconName } from '@/components/Icon';

export type CategoryId = 'veiculos' | 'saude' | 'vida' | 'casa' | 'empresa' | 'rc' | 'financeiro';

/** Público principal: define os campos do formulário e o texto de "como funciona". */
export type Audience = 'pf' | 'pj' | 'ambos';

export type Faq = { q: string; a: string };
export type Item = { title: string; text: string };

export type Product = {
  /** Rota plana na raiz do site, ex.: "seguro-auto" → /seguro-auto */
  slug: string;
  category: CategoryId;
  audience: Audience;
  /** Nome curto exibido em menus e cards. */
  name: string;
  /** Uma linha para cards do catálogo. */
  short: string;
  icon: IconName;
  popular?: boolean;
  metaTitle: string;
  metaDescription: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  /** O que acontece sem a proteção (3 itens). */
  pains: Item[];
  /** Principais coberturas (6 itens). */
  coverages: Item[];
  /** Para quem é (4 itens). */
  forWho: string[];
  /** Pergunta de qualificação do formulário (vira um campo de escolha). */
  question: { label: string; options: string[] };
  faq: Faq[];
  /** Slugs de produtos relacionados (3). */
  related: string[];
};
