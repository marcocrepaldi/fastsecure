import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Slides dos principais ramos, exibidos na home.
//
// Imagens: salve a versão definitiva em public/images/slides/<id>.(webp|jpg|png).
// Enquanto o arquivo não existir, o slide usa a imagem provisória (`fallback`).
// Os prompts para gerar as imagens estão em docs/slides-prompts.md.

export type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  image: string;
  alt: string;
};

type SlideConfig = Omit<Slide, 'image'> & {
  fallback: string;
  /** Descrição da imagem provisória, quando ela difere da definitiva. */
  fallbackAlt?: string;
};

const config: SlideConfig[] = [
  {
    id: 'auto',
    eyebrow: 'Seguro Auto',
    title: 'Pé na estrada com quem você ama',
    text: 'Roubo, colisão, terceiros e assistência 24h, comparando mais de 15 seguradoras.',
    href: '/seguro-auto',
    cta: 'Cotar seguro auto',
    fallback: '/images/seguro_auto.png',
    fallbackAlt: 'Carro em uma estrada no litoral ao pôr do sol',
    alt: 'Família sorrindo dentro do carro durante uma viagem',
  },
  {
    id: 'saude',
    eyebrow: 'Plano de Saúde',
    title: 'Cuidado de verdade para a família inteira',
    text: 'Compare redes, hospitais e preços pelo seu CEP e pela idade de cada pessoa.',
    href: '/plano-de-saude',
    cta: 'Comparar planos',
    fallback: '/images/saude_familia.png',
    alt: 'Família conversando com uma médica em um consultório',
  },
  {
    id: 'vida',
    eyebrow: 'Seguro de Vida',
    title: 'Os planos da família continuam, aconteça o que acontecer',
    text: 'Capital fora do inventário, coberturas em vida e preço que cabe no mês.',
    href: '/seguro-de-vida',
    cta: 'Simular seguro de vida',
    fallback: '/images/seguro_vida.png',
    alt: 'Casal caminhando de mãos dadas em um parque',
  },
  {
    id: 'residencial',
    eyebrow: 'Seguro Residencial',
    title: 'Sua casa protegida por menos do que uma pizza por mês',
    text: 'Incêndio, roubo, danos elétricos e assistência 24h para os perrengues do dia a dia.',
    href: '/seguro-residencial',
    cta: 'Proteger minha casa',
    fallback: '/images/seguro_residencial.png',
    alt: 'Família em frente à sua casa ao entardecer',
  },
  {
    id: 'empresas',
    eyebrow: 'Para empresas',
    title: 'Benefícios que retêm talentos e cabem no orçamento',
    text: 'Plano de saúde empresarial, vida em grupo e seguros da operação em uma gestão só.',
    href: '/plano-de-saude-empresarial',
    cta: 'Falar com especialista',
    fallback: '/images/investimentos.png',
    alt: 'Equipe conversando em uma sala de reunião',
  },
];

const EXTS = ['webp', 'jpg', 'jpeg', 'png'];

function finalImage(id: string): string | null {
  for (const ext of EXTS) {
    const rel = `/images/slides/${id}.${ext}`;
    if (existsSync(join(process.cwd(), 'public', rel))) return rel;
  }
  return null;
}

/** Resolve as imagens no build: usa a definitiva se existir, senão a provisória. */
export function getSlides(): Slide[] {
  return config.map(({ fallback, fallbackAlt, ...c }) => {
    const image = finalImage(c.id);
    return image ? { ...c, image } : { ...c, image: fallback, alt: fallbackAlt ?? c.alt };
  });
}
